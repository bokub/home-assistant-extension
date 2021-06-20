<template>
  <div class="section">
    <div class="columns">
      <div class="column form is-relative" style="min-width: 628px">
        <div class="subtitle">Options</div>
        <div class="columns">
          <div class="field column" style="flex: 2">
            <label class="label">URL</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="URL of the default Home Assistant page"
                v-model="options.dashboards[0].url"
              />
            </div>
          </div>
          <div class="field column">
            <label class="label">Title</label>
            <div class="control" style="flex: 1">
              <input
                class="input"
                type="text"
                maxlength="25"
                placeholder="Title of the dashboard"
                v-model="options.dashboards[0].title"
              />
            </div>
          </div>
        </div>

        <div
          class="columns"
          v-for="(dashboard, index) in options.dashboards"
          v-if="options.dashboards[0] !== dashboard"
        >
          <div class="field column" style="flex: 2">
            <label class="label">Additional URL</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="URL of the additional Home Assistant page"
                v-model="dashboard.url"
              />
            </div>
          </div>
          <div class="field column" style="flex: 1">
            <label class="label">Additional Title</label>
            <div class="control">
              <input
                class="input"
                type="text"
                maxlength="25"
                placeholder="Title of the dashboard"
                v-model="dashboard.title"
              />
            </div>
          </div>
          <div class="column" style="flex: none">
            <button class="button is-delete" @click="removeDashboard(index)">Remove</button>
          </div>
        </div>

        <div>
          <button
            class="button is-primary addDashboardButton"
            @click="addDashboard"
            :disabled="dashboardsLimitReached()"
          >
            Add dashboard
          </button>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Height</label>
              <div class="control">
                <input v-model="options.height" type="range" min="25" max="600" value="300" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Width</label>
              <div class="control">
                <input v-model="options.width" type="range" min="25" max="800" value="300" />
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Header visibility</label>
              <label class="checkbox p-2">
                <input type="checkbox" v-model="options.hideHeader" />
                Hide header
              </label>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Header height</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="56"
                  v-model="options.headerHeight"
                  :disabled="!options.hideHeader"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-primary is-fullwidth" @click="save" :disabled="saved">
              {{ saved ? 'Saved!' : 'Save' }}
            </button>
          </div>
        </div>
      </div>

      <div class="column center" style="float: right">
        <div class="subtitle">Preview</div>
        <div v-if="options.dashboards[0].url" :style="wrapperStyle" style="margin: 0 auto">
          <Popup :previewOptions="options" />
        </div>
        <div
          v-else
          class="placeholder is-relative has-background-light"
          :style="{ height: options.height + 'px', width: options.width + 'px', ...iframeStyle }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Popup from '../popup/popup.vue';
  export default {
    components: { Popup },
    data: function () {
      return {
        loaded: false,
        saved: false,
        options: {
          dashboards: [
            {
              url: '',
              title: '',
            },
          ],
          height: 300,
          width: 300,
          headerHeight: 56,
          hideHeader: false,
        },
      };
    },
    computed: {
      actualHeaderHeight() {
        return this.options.hideHeader ? this.options.headerHeight : 0;
      },
      wrapperStyle() {
        return {
          height: this.options.height - this.actualHeaderHeight + 'px',
          width: this.options.width + 'px',
        };
      },
      iframeStyle() {
        return { top: -this.actualHeaderHeight + 'px' };
      },
    },
    created() {
      chrome.storage.sync.get(['options'], ({ options }) => {
        if (options) {
          this.options = options;
        }
        this.loaded = true;
      });
    },
    methods: {
      save() {
        chrome.storage.sync.set({ options: this.options }, () => {
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
          }, 2000);
        });
      },
      addDashboard() {
        this.options.dashboards.push({ url: '', title: '' });
      },
      removeDashboard(index) {
        this.options.dashboards.splice(index, 1);
      },
      dashboardsLimitReached() {
        return this.options.dashboards.length >= 5;
      },
    },
  };
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all.sass';
  @import '~bulma/sass/base/_all.sass';
  @import '~bulma/sass/helpers/position.sass';
  @import '~bulma/sass/helpers/spacing.sass';
  @import '~bulma/sass/helpers/color.sass';

  @import '~bulma/sass/layout/section.sass';
  @import '~bulma/sass/elements/container.sass';
  @import '~bulma/sass/elements/title.sass';
  @import '~bulma/sass/grid/columns.sass';

  @import '~bulma/sass/elements/button.sass';
  @import '~bulma/sass/form/all.sass';

  input[type='range'] {
    width: 100%;
  }
  .placeholder {
    margin: auto;
  }
  .center {
    text-align: center;
  }
  .form {
    z-index: 3;
  }
  .addDashboardButton {
    font-size: 16px;
  }
  .is-delete {
    margin-top: 32px;
    float: right;
  }
</style>
