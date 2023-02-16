<template>
  <div class="nav">
    <div class="level1" v-for="item in navList" :key="item.cn">
      <div class="justify" @click="clickNav(item)">
        <span>{{ item.cn }}</span>
      </div>
      <span class="level1-en">{{ item.en }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTip: false,
      timer: null,
      navList: [
        {
          cn: "心 愿 众 筹",
          en: "Crowdfunding for Wishes",
          path: ""
        },
        {
          cn: "互 帮 互 助",
          en: "Renmine helps Renmine",
          path: ""
        },
        {
          cn: "交 流 论 坛",
          en: "Communication Forum",
          path: "/communicationList"
        },
        {
          cn: "心 理 辅 导",
          en: "Counselling",
          path: ""
        },
        {
          cn: "矿 仔 保 险",
          en: "Renmine Insurance",
          path: ""
        }
      ]
    };
  },
  methods: {
    show() {
      this.showTip = true;
    },
    hide() {
      this.showTip = false;
    },
    tip() {
      // this.show();
      // clearTimeout(this.timer);
      // this.timer = setTimeout(() => {
      //   this.hide();
      // }, 2000);
      this.$message.info("即将到来 \r\n coming soon");
    },
    clickNav(nav) {
      // if (nav.path) {
      //   this.$router.push(nav.path);
      // } else {
      //   this.tip();
      // }
      this.tip();
    }
  }
};
</script>

<style scoped>
.nav {
  height: 80px;
  background-color: rgba(255, 255, 255, 0.3);
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  min-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 3px 3px rgba(255, 255, 255, 0.3);
  color: #fff;
}

.nav .level1 {
  padding: 0 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
}
/* .nav .level1 span {
        text-align: justify;
      } */
/* .nav .level1 .justify {
        display: flex;
        justify-content: space-between;
      } */
.nav .level1 .level1-en {
  font-size: 14px;
}
</style>
