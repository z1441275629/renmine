<template>
  <div>
    <table border="1" width="1200">
      <tr>
        <td rowspan="2">1</td>
        <td rowspan="2">2</td>
        <td rowspan="2">3</td>
        <td colspan="3">4</td>
      </tr>
      <tr>
        <td>一般</td>
        <td>较重</td>
        <td>严重</td>
      </tr>
      <tbody v-for="(item, index) in dataList" :key="index">
        <tr colspan="9">
          {{
            item.type
          }}
        </tr>
        <tr v-for="(item2, index2) in item.items" :key="index2">
          <td>{{ item2.a }}</td>
          <td v-if="index2 === 0" :rowspan="item.items.length">
            {{ item2.b }}
          </td>
          <td>{{ item2.c }}</td>
          <!-- <td @click="clickYiban(item2)">{{ item2.yiban ? "√" : "" }}</td>
          <td @click="clickJiaozhong(item2)">{{ item2.jiaozhong ? "√" : "" }}</td>
          <td @click="clickYanzhong(item2)">{{ item2.yanzhong ? "√" : "" }}</td> -->
          <td @click="changeType(item2, 1)">{{ item2.status == 1 ? "√" : "" }}</td>
          <td @click="changeType(item2, 2)">{{ item2.status == 2 ? "√" : "" }}</td>
          <td @click="changeType(item2, 3)">{{ item2.status == 3 ? "√" : "" }}</td>
        </tr>
        <!-- <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
           <td>1</td>
           
        </tr>
         <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
           <td>1</td>
        </tr>
        <tr>
          <td>1</td>
          <td rowspan="2">1</td>
          <td>1</td>
          <td>1</td>
           <td>1</td>
           <td>1</td>
        </tr>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
           <td>1</td>
        </tr> -->
      </tbody>
    </table>
    <p @click="show = !show">显示/影藏</p>
    <header-banner></header-banner>
    <bannner-nav></bannner-nav>
    <pick-date></pick-date>
    <date-time></date-time>
    <bg-tu v-if="show" @hide="onhide" :data="datas"></bg-tu>
  </div>
</template>

<script>
// import HeaderBanner from "../components/index/HeaderBanner";
// import BannnerNav from "../components/index/BannerNav";
// import BannerInx from "../service/index";
// import PickDate   from "../components/index/date";
// import DateTime from "../components/index/dateTime"
// import BgTu from "../components/index/BgTu.vue"

export default {
  //   name: "indexheader",
  // components:{
  //   HeaderBanner,
  //   BannnerNav,
  //   PickDate,
  //  DateTime,
  //   BgTu
  // },
  data() {
    return {
      dataList: [
        {
          type: "1类",
          items: [
            {
              a: 1,
              b: "ee",
              c: "sss",
            },
            {
              a: 2,
              b: "ee",
              c: "sss",
            },
            {
              a: 3,
              b: "ee",
              c: "sss",
            },
          ],
        },
      ],
      //           imgList:[]
      show: false,
      datas: {
        name: "zhangsan",
        age: 18,
        sex: "male",
      },
    };
  },
  // created:function(){
  //   this.initData();
  // },
  methods: {
    changeType(item2, type){
      item2.status = type == item2.status ? '' : type;
    },
    clickYiban(subItem){
      subItem.yiban = !subItem.yiban;
      subItem.jiaozhong = false;
      subItem.yanzhong = false;
    },
    clickJiaozhong(subItem){
      subItem.jiaozhong = !subItem.jiaozhong;
      subItem.yiban = false;
      subItem.yanzhong = false;
    },
    clickYanzhong(subItem){
      subItem.yanzhong = !subItem.yanzhong;
      subItem.jiaozhong = false;
      subItem.yiban = false;
    },
    onhide() {
      this.show = false;
    },
    // btnajax:function(){
    //   var that = this;
    //   this.$http({
    //     method:'get',
    //     url:'/msg',
    //     params: {                    //需要发送的数据
    //       // name: 'zhangwenwu2',
    //       // age: '15'
    //     }
    //   }).then(function (res) {
    //     //var res = JSON.parse(res);
    //
    //    that.imgList=res.data.img
    //     console.log(res.data.img)
    //   }).catch(function (err) {
    //     console.log(err);
    //   });
    // }
    // initData:function() {
    //   this.imgList = BannerInx.getBanner();
    // }
  },
  created(){
    this.dataList.forEach(item => {
      item.items.forEach(sub => {
        // this.$set(sub, "yiban", false);
        // this.$set(sub, "jiaozhong", false);
        // this.$set(sub, "yanzhong", false);
        this.$set(sub, "status", false);
      });
    });
  },
};
</script>

<style scoped>
</style>
