<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="app-breadcrumb">
      江苏传智播客教育科技股份有限公司
      <span class="breadBtn">体验版</span>
    </div>
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="right-menu">
      <theme-picker class="right-menu-item" />
      <lang class="ver" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-imageError="defaultImage" :src="staffPhoto" class="user-avatar">
          <span class="userName">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 主页 </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>项目文档</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  data() {
    return {
      defaultImage: require('@/assets/common/img.jpeg')
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'staffPhoto', 'name'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #4a7afb;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .app-breadcrumb {
    flex: 1;
    color: #fff;
    .breadBtn {
      display: inline-block;
      width: 50px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: rgba($color: #fff, $alpha: .3);
      font-size: 12px;
      border-radius: 20px;
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      line-height: 50px;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }
        .userName {
          color: #fff;
          font-size: 12px;
          margin-left: 5px;

        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top:50%;
          transform: translateY(-50%);
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }

}
</style>
