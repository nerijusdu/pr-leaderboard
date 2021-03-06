<template>
  <form class="settings-container" @submit="save">
    <div class="settings-sub-container">
      <div class="settings-column">
        <h3 class="column-title">Azure DevOps settings</h3>
        <div class="form-field">
          <label class="label-input" for="organization">Organization</label>
          <input
            v-model="model.organization"
            id="organization"
            class="input"
            type="text"
            required
          />
          <span class="focus-input"/>
        </div>
        <div class="form-field">
          <label class="label-input" for="project">Project</label>
          <input
            v-model="model.project"
            id="project"
            class="input"
            type="text"
            required
          />
          <span class="focus-input"/>
        </div>
        <div class="form-field">
          <label class="label-input" for="project">Repository name</label>
          <input
            v-model="model.repository"
            id="repository"
            class="input"
            type="text"
            required
          />
          <span class="focus-input"/>
        </div>
        <button
          type="button"
          :class="['authorize-link', { disabled: !hasAzureSettings }]"
          @click="authorize"
          v-if="!isAccessGranted"
        >
          Authorize app
        </button>
      </div>
      <div class="settings-column">
        <h3 class="column-title">App settings</h3>
        <div class="form-field">
          <label class="label-input" for="startDate">Start date</label>
          <input
            v-model="model.startDate"
            id="startDate"
            class="input"
            type="date"
            required
          />
          <span class="focus-input"/>
        </div>
        <div class="form-field">
          <label class="label-input" for="endDate">End date</label>
          <input
            v-model="model.endDate"
            id="endDate"
            class="input"
            type="date"
            required
          />
          <span class="focus-input"/>
        </div>
      </div>
    </div>
    <button class="save-button">Save</button>
  </form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import AuthService from '../services/authService';

export default {
  data: () => ({
    model: {
      organization: '',
      project: '',
      repository: '',
      startDate: '',
      endDate: ''
    }
  }),
  computed: {
    ...mapState(['settings', 'isAccessGranted']),
    ...mapGetters(['hasAzureSettings'])
  },
  methods: {
    ...mapActions(['saveSettings', 'showError']),
    save(e) {
      e.preventDefault();

      if (this.model.organization
        && this.model.project
        && this.model.repository
        && this.model.startDate
        && this.model.endDate
      ) {
        this.saveSettings({
          ...this.model,
          startDate: this.model.startDate,
          endDate: this.model.endDate
        });

        return false;
      }

      this.showError('Please enter valid values into required fields.');
      return false;
    },
    authorize() {
      if (!this.hasAzureSettings) {
        this.showError('Save settings before authorizing.');
        return;
      }

      window.location.href = AuthService.authUrl;
    },
    updateModel(value) {
      if (!value) return;
      this.model.organization = value.organization;
      this.model.project = value.project;
      this.model.repository = value.repository;
      this.model.startDate = value.startDate;
      this.model.endDate = value.endDate;
    }
  },
  mounted() {
    this.updateModel(this.settings);
  },
  watch: {
    settings(value) {
      this.updateModel(value);
    }
  }
};
</script>

<style scoped>
.settings-sub-container {
  display: flex;
}

.settings-column {
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.save-button {
  margin-top: 20px;
  display:inline-block;
  padding: 5px 20px;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  transition: all 0.2s;
  background-color: #3b97ea;
  cursor: pointer;
  color: white;
}

.save-button:hover {
  background-color: #171c26;
}

.authorize-link {
  display:inline-block;
  padding: 5px 20px;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  transition: all 0.2s;
  border: 1px solid #171c26;
  color: #171c26;
}

.authorize-link:not(.disabled) {
  background-color: #3b97ea;
  color: white;
}

.authorize-link:hover:not(.disabled) {
  background-color: #171c26;
  color: white;
  cursor: pointer;
}

/*---------------------------------------------*/
.form-field {
  width: 100%;
  position: relative;
  border-bottom: 2px solid #d9d9d9;
  padding-bottom: 13px;
  margin-bottom: 27px;
  text-align: left;
  max-width: 300px;
}

.label-input {
  font-family: Poppins-Regular;
  font-size: 13px;
  color: #666666;
  line-height: 1.5;
  padding-left: 5px;
}

.input {
  display: block;
  width: 100%;
  background: transparent;
  font-family: Poppins-Medium;
  font-size: 18px;
  color: #333333;
  line-height: 1.2;
  padding: 0 5px;
}

.focus-input {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  background: #7f7f7f;
}

/*---------------------------------------------*/
textarea.input {
  min-height: 110px;
  padding-top: 9px;
  padding-bottom: 13px;
}


.input:focus + .focus-input::before {
  width: 100%;
}

.has-val.input + .focus-input::before {
  width: 100%;
}

/*---------------------------------------------*/
input {
  outline: none;
  border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }
textarea:focus:-ms-input-placeholder { color:transparent; }

input::-webkit-input-placeholder { color: #adadad;}
input:-moz-placeholder { color: #adadad;}
input::-moz-placeholder { color: #adadad;}
input:-ms-input-placeholder { color: #adadad;}

textarea::-webkit-input-placeholder { color: #adadad;}
textarea:-moz-placeholder { color: #adadad;}
textarea::-moz-placeholder { color: #adadad;}
textarea:-ms-input-placeholder { color: #adadad;}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}

/*---------------------------------------------*/
</style>
