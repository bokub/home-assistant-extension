<template>
  <div v-if="options && options.url" :style="wrapperStyle" class="wrapper">
    <iframe
      :src="options.url"
      :height="options.height || '300'"
      :width="options.width || '300'"
      :style="iframeStyle"
      frameborder="0"
      name="ha-main-window"
    ></iframe>
  </div>
  <section v-else class="alert">
    <p class="title">The Home Assistant extension is not configured</p>
    <p class="subtitle"><a href="/options.html" target="_blank">Open options</a></p>
  </section>
</template>

<script>
  export default {
    name: 'Popup',
    props: {
      previewOptions: null,
    },
    data() {
      return {
        options: null,
      };
    },
    computed: {
      iframeStyle() {
        return {
          top: this.options.hideHeader ? -this.options.headerHeight + 'px' : 0,
        };
      },
      wrapperStyle() {
        const height = this.options.hideHeader ? this.options.height - this.options.headerHeight : this.options.height;
        return {
          width: this.options.width,
          height: height + 'px',
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

    .wrapper {
      overflow: hidden;
    }

    iframe {
      margin-bottom: -5px;
      position: relative;
      border: 0;
    }

    .alert {
      min-width: 250px;
      padding: 5px 15px;

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
