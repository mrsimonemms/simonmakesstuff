<script lang="ts">
  import '../app.scss';

  let displayNav = false;
  const currentYear = new Date().getUTCFullYear();
</script>

<section class="section has-text-centered has-background-white logo py-1">
  <p class="simon has-text-black">Simon</p>
  <p class="makes-stuff is-size-5 has-text-weight-medium has-text-danger">Makes Stuff</p>
</section>

<section>
  <nav class="navbar has-background-warning" aria-label="min avigation">
    <span class="navbar-burger" aria-hidden="true" on:click={() => (displayNav = !displayNav)}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </span>

    <div class="navbar-menu has-background-warning" class:is-active={displayNav}>
      <div class="is-flex-grow-1" />

      <a class="navbar-item" href="/">Home</a>

      <a class="navbar-item">Documentation</a>

      <div class="is-flex-grow-1" />
    </div>
  </nav>
</section>

<div class="site-content">
  <div class="container my-5">
    <slot />
  </div>
</div>

<footer class="footer has-background-black-ter has-text-white has-text-centered">
  <div class="content">
    <a
      class="has-tooltip-arrow has-tooltip-bottom"
      href="https://twitter.com/theshroppiebeek"
      target="_blank"
      data-tooltip="Twitter"
    >
      <span class="icon is-large has-text-white mx-3">
        <i class="mdi mdi-24px mdi-twitter" />
      </span>
    </a>
  </div>
  <hr class="has-background-grey-dark" />
  <div class="is-size-6">
    &copy; {currentYear}
    <span class="px-2">|</span>
    Simon Emms
    <p>
      This site is open source.
      <a
        href="https://github.com/mrsimonemms/simonmakesstuff"
        class="has-text-link-light"
        target="_blank"
      >
        Improve this page.
      </a>
    </p>
  </div>
</footer>

<style lang="scss">
  .section {
    &.logo {
      .simon {
        font: {
          family: 'Fasthand', cursive;
          size: 5em;
        }
        line-height: 1em;
      }

      .makes-stuff {
        text: {
          transform: uppercase;
        }
      }
    }
  }

  .site-content {
    flex: 1;
  }

  .footer {
    hr {
      height: 1px;
    }
  }
</style>
