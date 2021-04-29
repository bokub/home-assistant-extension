<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column form is-relative is-narrow">
          <div class="subtitle">Options</div>
          <div class="field">
            <label class="label">URL</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="URL of the Home Assistant page you want to display"
                v-model="options.url"
              />
            </div>
          </div>

          <div class="columns">
            <div class="column preview">
              <div class="field">
                <label class="label">Height</label>
                <div class="control">
                  <input v-model="options.height" type="range" min="25" max="580" value="300" />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Width</label>
                <div class="control">
                  <input v-model="options.width" type="range" min="25" max="780" value="300" />
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
                {{ saved ? 'Saved !' : 'Save' }}
              </button>
            </div>
          </div>
        </div>

        <div class="column center">
          <div class="hide-header is-relative" v-if="options.hideHeader" :style="hideStyle"></div>
          <iframe
            v-if="options.url"
            :src="options.url"
            :width="options.width"
            :height="options.height"
            frameborder="0"
            class="is-relative"
            :style="iframeStyle"
          ></iframe>
          <div
            v-else
            class="placeholder is-relative has-background-light"
            :style="{ height: options.height + 'px', width: options.width + 'px', ...iframeStyle }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false,
        saved: false,
        options: {
          url: '',
          height: 300,
          width: 300,
          headerHeight: 56,
          hideHeader: false,
        },
      };
    },
    computed: {
      hideStyle() {
        return {
          height: this.options.headerHeight + 'px',
          width: this.options.width + 'px',
          top: -this.options.headerHeight + 'px',
        };
      },
      iframeStyle() {
        return { top: this.options.hideHeader ? -2 * this.options.headerHeight + 'px' : 0 };
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

  .hide-header {
    background: #fff;
    z-index: 2;
    margin: auto;
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
</style>
