<script>
  import '../app.scss';
</script>

<section class="container">
  <nav class="navbar is-transparent" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">&nbsp;</a>
    </div>
  </nav>
</section>

<section class="container">
  <slot />
</section>

<style lang="scss">
  .navbar-item {
    border: 1px solid red;
    background: {
      image: url(/img/logo.png);
      position: center center;
      repeat: no-repeat;
      size: cover;
    }
    height: 100px;
    width: 332px;
  }
</style>
