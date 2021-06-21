<template>
  <section v-if="options && options.url">
    <div :style="wrapperStyle">
      <iframe
        :src="options.url"
        :height="options.height || '300'"
        :width="options.width || '300'"
        title="Home Assistant Chrome Extension"
        name="extensionFrame"
        :style="iframeStyle"
      ></iframe>
    </div>
  </section>
  <section v-else id="alert">
    <p class="title">The Home Assistant extension is not configured</p>
    <p class="subtitle"><a href="/options.html" target="_blank">Open options</a></p>
  </section>
</template>

<script>
  export default {
    name: 'Popup',
    props: {
      previewOptions: '',
    },
    data() {
      return {
        options: '',
      };
    },
    computed: {
      actualFrameHeight() {
        return this.options.hideHeader ? this.options.height - this.options.headerHeight : this.options.height;
      },
      iframeStyle() {
        return {
          position: 'relative',
          top: this.options.hideHeader ? -this.options.headerHeight + 'px' : 0,
          border: 0,
        };
      },
      wrapperStyle() {
        return {
          width: this.options.width,
          height: this.actualFrameHeight + 'px',
          overflow: 'hidden',
        };
      },
    },
    created() {
      if (this.previewOptions) {
        this.options = this.previewOptions;
      } else {
        chrome.storage.sync.get(['options'], ({ options }) => {
          this.options = options;
        });
      }
    },
    methods: {},
  };
</script>

<style lang="scss">
  body {
    margin: 0;
    font-family: sans-serif;

    iframe {
      margin-bottom: -5px;
    }

    #alert {
      min-width: 250px;
      padding: 5px 15px;

      &.is-hidden {
        display: none;
      }

      .title {
        font-size: 15px;
      }

      .subtitle {
        font-size: 13px;
      }

      a {
        color: #485fc7;
        cursor: pointer;
        text-decoration: none;
      }
    }
  }
</style>
