(function($)
{
	var admin = function()
	{
		return this.init();
	};

	admin.prototype = {

		//properties

		/*
		 * Main admin container
		 *
		 * @type jQuery object
		 */
		$container: null,


		/*
		 * KO viewModel
		 */
		viewModel: {


			/* The settings name
			 * string
			 */
			settingsName: ko.observable(''),

			/* The settings title
			 * string
			 */
			settingsTitle: ko.observable(''),

			/* The model edit fields
			 * array
			 */
			editFields: ko.observableArray(),

			/* If this is set to true, the form becomes uneditable
			 * bool
			 */
			freezeForm: ko.observable(false),

			/* If this is set to true, the action buttons on the form cannot be accessed
			 * bool
			 */
			freezeActions: ko.observable(false),

			/* If custom actions are supplied, they are stored here
			 * array
			 */
			actions: [],

			/* The languages array holds text for the current language
			 * object
			 */
			languages: {},

			/* The status message and the type ('', 'success', 'error')
			 * strings
			 */
			statusMessage: ko.observable(''),
			statusMessageType: ko.observable(''),

			/**
			 * Saves the item with the current settings
			 */
			save: function()
			{
				var self = this,
					saveData = ko.mapping.toJS(self);

				saveData.csrf_token = csrf;

				self.statusMessage(self.languages['saving']).statusMessageType('');
				self.freezeForm(true);

				$.ajax({
					url: save_url,
					data: saveData,
					dataType: 'json',
					type: 'POST',
					complete: function()
					{
						self.freezeForm(false);
					},
					success: function(response)
					{
						if (response.success)
						{
							self.statusMessage(self.languages['saved']).statusMessageType('success');

							//update the model
							self.updateData(response.data);
						}
						else
						{
							var error = typeof response.errors == 'string' ? response.errors : response.errors.join(' ');
							self.statusMessage(error).statusMessageType('error');
						}
					}
				});
			},

			/**
			 * Performs a custom action
			 *
			 * @param string	action
			 * @param object	messages
			 */
			customAction: function(action, messages)
			{
				var self = this;

				self.statusMessage(messages.active).statusMessageType('');
				self.freezeForm(true);

				$.ajax({
					url: custom_action_url,
					data: {csrf_token: csrf, action_name: action},
					dataType: 'json',
					type: 'POST',
					complete: function()
					{
						self.freezeForm(false);
					},
					success: function(response)
					{
						if (response.success)
						{
							self.statusMessage(messages.success).statusMessageType('success');
							self.updateData(response.data);
						}
						else
							self.statusMessage(response.error).statusMessageType('error');
					}
				});
			},

			/**
			 * Updates the view model data
			 *
			 * @param array		data
			 */
			updateData: function(data)
			{
				var self = this;

				//iterate over the data and find the associated observable
				$.each(data, function(i, el)
				{
					self[i](el);
				});
			}

		},



		//methods

		/**
		 * Init method
		 */
		init: function()
		{
			//set up the basic pieces of data
			this.$container = $('#admin_content');

			var viewModel = ko.mapping.fromJS(adminData.data);

			$.extend(this.viewModel, viewModel);

			this.viewModel.settingsName(adminData.name);
			this.viewModel.settingsTitle(adminData.title);
			this.viewModel.actions = adminData.actions;
			this.viewModel.languages = adminData.languages;

			//now that we have most of our data, we can set up the computed values
			this.initComputed();

			//prepare the edit fields
			this.viewModel.editFields = this.prepareEditFields();

			//set up the KO bindings
			ko.applyBindings(this.viewModel, $('#main_content')[0]);

			//set up the subscriptions
			this.initSubscriptions();

			//set up the events
			this.initEvents();

			return this;
		},

		/**
		 * Prepare the edit fields
		 *
		 * @return object with loadingOptions observables
		 */
		prepareEditFields: function()
		{
			var self = this,
				fields = [];

			$.each(adminData.edit_fields, function(ind, field)
			{
				//if this is an image field, set the upload params
				if (field.type === 'image' || field.type === 'file')
				{
					field.uploading = ko.observable(false);
					field.upload_percentage = ko.observable(0);
				}

				//add the id field
				field.field_id = 'edit_field_' + ind;

				fields.push(field);
			});

			return fields;
		},

		/**
		 * Inits the KO subscriptions
		 */
		initSubscriptions: function()
		{
			var self = this;

		},

		/**
		 * Inits the page events
		 */
		initEvents: function()
		{
			var self = this;

		},

		/**
		 * Initializes the computed observables
		 */
		initComputed: function()
		{

		}

	};


	//set up the admin instance
	$(function() {
		if ($('#settings_page').length)
			window.admin = new admin();
	});
})(jQuery);