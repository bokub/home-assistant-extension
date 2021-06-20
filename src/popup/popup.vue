<template>
  <section v-if="options && options.dashboards[0].url">
    <div class="btn-group" v-if="options.dashboards.length > 1">
      <button class="block" v-for="dashboard in options.dashboards" v-if="dashboard.url" @click="display(dashboard)">
        {{ dashboard.title }}
      </button>
    </div>
    <div :style="wrapperStyle">
      <iframe
        :src="displayedUrl"
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
        displayedUrl: '',
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
        this.displayedUrl = this.previewOptions.dashboards[0].url;
      } else {
        chrome.storage.sync.get(['options'], ({ options }) => {
          this.options = options;
          this.displayedUrl = options.dashboards[0].url;
        });
      }
      console.log(this.previewOptions);
      console.log(this.displayedUrl);
    },
    methods: {
      display(dashboard) {
        this.displayedUrl = dashboard.url;
      },
    },
  };
</script>

<style lang="scss">
  .block {
    flex: 1 1 auto;
    border: none;
    background-color: #04aa6d;
    padding: 0;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }

  .btn-group {
    display: flex;
  }

  .btn-group button {
    flex: 1 1 auto;
    background-color: #04aa6d; /* Green background */
    border: 1px solid green; /* Green border */
    color: white; /* White text */
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side */
  }

  /* Clear floats (clearfix hack) */
  .btn-group:after {
    content: '';
    clear: both;
    display: table;
  }

  .btn-group button:not(:last-child) {
    border-right: none; /* Prevent double borders */
  }

  /* Add a background color on hover */
  .btn-group button:hover {
    background-color: #3e8e41;
  }
</style>
