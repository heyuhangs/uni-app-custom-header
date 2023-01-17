<template>
  <view class="content">
    <HeaderBar title="uni-app" :isShowBack="false" />
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="content-button" @click="toDetail"> 查看菜单导航 </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { navigationTo } from "@/utils/tools";

import HeaderBar from "@/components/header-bar/Header.vue";

const title = ref("Hello");

const toDetail = () => {
  navigationTo(
    {
      url: "/pages/detail/detail",
    },
    "reLaunch"
  );
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.content-button {
  margin-top: 20rpx;
  height: 90rpx;
  width: 528rpx;
  background: rgba(88, 124, 247);
  border-radius: 44rpx;
  color: #fff;
  line-height: 90rpx;
  font-size: 32rpx;
  margin-top: 60rpx;
  text-align: center;
}
</style>
