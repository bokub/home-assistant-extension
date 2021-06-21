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
                  <input v-model="options.height" type="range" min="25" max="655" value="300" />
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

        <div class="column center">
          <div class="subtitle">Preview</div>
          <div class="iframe-wrapper is-relative" v-if="options.url" :style="wrapperStyle">
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
  </div>
</template>

<script>
import Popup from '../popup/popup.vue';
export default {
  components: { Popup },
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
  .iframe-wrapper {
    overflow: hidden;
    box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2);
  }
  .placeholder,
  .iframe-wrapper {
    margin: auto;
  }
  .center {
    text-align: center;
  }
  .form {
    z-index: 3;
  }
</style>
