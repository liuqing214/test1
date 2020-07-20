<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
  <el-header>
    <div>
      <img src="~@/assets/img/logo.png" alt="">
      <span>后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <!-- 侧边菜单 -->
    <el-aside :width="isFold ? '64px' : '200px'">
      <div class="fold-mune" @click="foldMune">|||</div>
      <el-menu
      background-color="#343A40"
      text-color="#fff"
      active-text-color="cadetblue"
      unique-opened
      :collapse="isFold"
      :collapse-transition="false"
      router
      :default-active="activeMenu">
      <!-- 一级菜单 -->
      <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
        <!-- 一级菜单模板 -->
        <template slot="title">
          <i :class="icon[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="menuData(subItem.path)">
          <!-- 二级菜单模板 -->
          <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span>{{subItem.authName}}</span>
        </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-container>
      <!-- 中间区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import {getMenudata} from '@/network/home.js'
// import Welcome from '@/components/Welcome'

export default {
  name: 'Home',
  components: {
    // Welcome
  },
  data() {
    return {
      //左侧导航
      menulist: [],
      // 一级导航图标
      icon: {
        '101': 'iconfont icon-xiala',
        '103': 'iconfont icon-mima',
        '105': 'iconfont icon-yonghuming',
        '107': 'iconfont icon-mima',
        '109': 'iconfont icon-yonghuming'
      },
      isFold: false,
      //菜单状态
      activeMenu: ''
    }
  },
  created() {
    this.getMenudata(),
    //给菜单状态赋值
    this.activeMenu = window.sessionStorage.getItem('munestate')
  },
  methods: {
  //一般方法：
    //退出登录
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //菜单折叠
    foldMune() {
      this.isFold = !this.isFold
    },
    //点击菜单储存点击状态
    menuData(activeMenu) {
      window.sessionStorage.setItem('munestate' , activeMenu)
      activeMenu = this.activeMenu
    },
  //网络请求：
    //左侧菜单
    getMenudata() {
      getMenudata().then(res => {
        // console.log(res);
        this.menulist = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-container{
    height: 100%;
    background: #F4F6F9;
  }
  .el-header{
    background: cadetblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    div{
      display: flex;
      align-items: center;
      color: #ffffff;
      font-size: 18px;
      img{
        height: 80px;
      }
    }
    i{
      font-size: 18px;
      color: #ffffff;
      display: block;
    }
  }
  .el-aside{
    background: #343A40;
    .el-menu{
      border: none;
    }
    i{
      margin-right: 10px;
    }
  }
  .el-footer{
    background: #ffffff;
  }
  .fold-mune{
    background:lightslategray;
    height: 30px;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
    letter-spacing: .2rem;
    font-size: 14px;
  }

</style>