<template>
  <view class="header">
    <view class="header__block" :style="height"></view>
    <view class="header__fixed" :style="headerStyle">
      <view class="header__nav" :style="headerBarStyle">
        <slot name="headerBar">
          <view class="header__content" :style="headerBarContentStyle">
            <!-- 返回按钮 -->
            <view v-if="props.isShowBack" class="header__back" @click="back">
              <image class="header__img" :src="backImageUrl"></image>
            </view>

            <view v-if="isShowMenu" class="header__menu" @click="showMenu">
              <image
                class="header__img header__img-menu"
                :src="menuImage"
              ></image>
              <view class="header__menu-dot"></view>
              <view v-show="isShowMenuList" class="header__menu-content">
                <HeaderMenu :unread="unread" />
              </view>
            </view>

            <slot name="headerTitle">
              <text :style="headerBarTitleStyle" class="header__title">{{
                props.title
              }}</text>
            </slot>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
/**
 * @component 自定义导航栏
 * @description 自定义导航栏组件
 * @props show 是否展示当前组件
 * @props disableBackDefaultBehavior 是否禁点击自动返回
 * @props isShowBack 是否显示返回按钮
 * @props title 标题
 * @props titleStyle 标题样式
 * @props isCompatibleMenubarArea 是否兼容胶囊宽度
 * @props clearCount 需要杀死的页面数量
 */

import { reactive, defineProps, computed, ref } from "vue";

import { getSafeAreaInsertInfo, isTabBarUrl } from "@/utils/tools";

import HeaderMenu from "./Menu.vue";

const menuImage = `../../static/header-menu.png`;

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  pageCode: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: true,
  },
  headerStyle: {
    type: Object,
    default: () => {},
  },
  backImageUrl: {
    type: String,
    default: `../../static/header-back.png`,
  },
  titleStyle: {
    type: Object,
    default: () => {},
  },
  disableBackDefaultBehavior: {
    type: Boolean,
    default: false,
  },
  isShowBack: {
    type: Boolean,
    default: true,
  },
  isCompatibleMenubarArea: {
    type: Boolean,
    default: false,
  },
  clearCount: {
    type: Number,
    default: 1,
  },
  isToHome: {
    type: Boolean,
    default: false,
  },
  isHideMenu: {
    type: Boolean,
    default: false,
  },
  /******** h5端，app端需要传入自定义导航栏高度 *******/
  customNavHeight: {
    type: Number,
    default: 50,
  },
});

const emit = defineEmits(["back"]);

let unread = ref(80);

const safeAreaInsertState = reactive({
  navHeight: 0,
  customHeight: 0,
  menubarLeft: 0,
  statusBarHeight: 0,
  menubarRight: 0,
});

const init = () => {
  /* 获取设备信息 */
  const safeAreaInsertInfo: GetSafeAreaInsertInfoRes = getSafeAreaInsertInfo();
  /* 通用平台 */
  safeAreaInsertState.navHeight = safeAreaInsertInfo.navHeight; //头部导航栏高度

  /* 微信小程序平台 */
  // #ifdef MP-WEIXIN
  safeAreaInsertState.statusBarHeight = safeAreaInsertInfo.statusBarHeight; //状态栏高度
  safeAreaInsertState.customHeight = safeAreaInsertInfo.menuButtonHeight; //胶囊高度
  safeAreaInsertState.menubarLeft = safeAreaInsertInfo.menuButtonLeft; //胶囊左边界距离左上角的距离
  safeAreaInsertState.menubarRight = safeAreaInsertInfo.menuButtonWidth;
  // #endif

  /* 通用平台 */
  // #ifndef MP-WEIXIN
  const customHeight =
    props.customNavHeight * safeAreaInsertInfo.scaleFactor +
    safeAreaInsertInfo.statusBarHeight;
  safeAreaInsertState.navHeight = safeAreaInsertState.customHeight = customHeight;
  // #endif
};

init();

const isShowMenu = computed(() => {
  if (props.isHideMenu) {
    return false;
  }

  const pages = getCurrentPages();
  const url = pages[0].route || "";

  if (pages.length === 1 && !isTabBarUrl(url)) {
    return true;
  }

  return false;
});

const height = computed(() => {
  return {
    height: `${safeAreaInsertState.navHeight}rpx`,
  };
});

const headerStyle = computed(() => {
  return {
    ...props.headerStyle,
    height: `${safeAreaInsertState.navHeight}rpx`,
  };
});

const headerBarStyle = computed(() => {
  const paddingRight = props.isCompatibleMenubarArea
    ? `${safeAreaInsertState.menubarRight}rpx`
    : "0rpx";

  return {
    height: `${safeAreaInsertState.navHeight}rpx`,
    top: `${safeAreaInsertState.statusBarHeight}rpx`,
    paddingRight,
  };
});

const headerBarContentStyle = computed(() => {
  return {
    height: `${safeAreaInsertState.customHeight}rpx`,
    lineHeight: `${safeAreaInsertState.customHeight}rpx`,
  };
});

const headerBarTitleStyle = computed(() => {
  return {
    ...props.titleStyle,
  };
});

const isBackHomePage = computed(() => {
  const pages = getCurrentPages();

  return pages.length <= 1 || props.isToHome;
});

const isShowMenuList = ref(false);
const showMenu = () => {
  isShowMenuList.value = !isShowMenuList.value;
};

const onBackOff = ref(false);

const back = () => {
  if (onBackOff.value) return;

  // 狂点限制逻辑
  onBackOff.value = true;

  emit("back");

  setTimeout(() => {
    onBackOff.value = false;
  }, 1500);

  if (props.disableBackDefaultBehavior) return;

  if (isBackHomePage.value) {
    uni.switchTab({
      url: "/pages/index/index",
    });
    return;
  }

  uni.navigateBack({
    delta: props.clearCount,
  });
};
</script>

<style lang="scss" scoped>
.header {
  &__fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
  }

  &__nav {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__content {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 32rpx;
  }

  &__title {
    box-sizing: border-box;
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 36rpx;
    font-weight: 500;
    color: #222;
    margin-left: 30rpx;
  }

  &__back {
    box-sizing: border-box;
    width: 50rpx;
    height: 50rpx;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  &__menu {
    position: relative;
    box-sizing: border-box;
    width: 50rpx;
    height: 50rpx;
    margin-left: 12rpx;
    display: flex;
    align-items: center;
    justify-content: left;

    &-content {
      position: absolute;
      bottom: -440rpx;
      left: -48rpx;
    }

    &-dot {
      border-radius: 50%;
      background-color: #ec6056;
      position: absolute;
      top: 0rpx;
      right: -4rpx;
      width: 12rpx;
      height: 12rpx;
    }
  }

  &__img {
    width: 50rpx;
    height: 50rpx;
  }
}
</style>
