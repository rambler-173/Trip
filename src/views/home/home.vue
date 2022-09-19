<template>
  <div class="home">
      <div class="nav-bar">
        <div class="title">陌陌旅途</div>
      </div>
      <div class="banner">
        <img src="@/assets/img/home/banner.webp" alt="">
      </div>
      <div class="location">
        <div class="city">广州</div>
        <div class="position">
          <span>我的位置</span>
          <img src="@/assets/img/home/icon_location.png" alt="">
        </div>
      </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
  .home {
    .nav-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 46px;
      border-bottom: 1px solid #f2f2f2;

      .title {
        color: var(--primary-color);
        font-size: 18px;
        font-weight: 700;
      }
    }

    .banner {
      img {
        width: 100%;
      }    
    }

    .location {
      display: flex;
      align-items: center;
      height: 44px;
      padding: 0 20px;

      .city {
        flex: 1;
      }

      .position {
        width: 74px;

        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
</style>

