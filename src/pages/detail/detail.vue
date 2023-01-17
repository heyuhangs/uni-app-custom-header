<template>
  <view class="content">
    <HeaderBar title="详情" />
    <view class="text-area">
      <text class="title">内容内容内容内容内容内容内容</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/header-bar/Header.vue'
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
</style>
