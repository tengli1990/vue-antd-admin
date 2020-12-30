<template>
  <div class="welcome-content">
    <div class="welcome-title">
      <h2>欢迎登录,</h2>
      <h3>湃星象</h3>
    </div>

  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.welcome-content {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/welcome.png') no-repeat;
  background-size: 60% auto;
  background-position: center;

  .welcome-title {
    padding: 5% 0 0 27%;

    h2 {
      font-size: 36px;
      line-height: 50px;
      margin-bottom: 0;
    }

    h3 {
      font-size: 24px;
      font-weight: normal;
    }
  }
}
</style>
