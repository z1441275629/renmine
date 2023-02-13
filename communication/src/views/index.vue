<template>
  <div class="">
    <div class="tip hide">
      <span>即将到来</span>
      <br />
      <span class="level1-en">coming soon</span>
    </div>
    <div class="global-buttons">
      <div class="home">
        <a href="###" @click="tip">
          <img src="@/assets/home.svg" />
        </a>
      </div>
      <div class="airplane">
        <a target="_blank" href="https://t.me/RENMINE_BSC">
          <img src="@/assets/airplane.svg" />
        </a>
      </div>
      <div class="twitter">
        <a target="_blank" href="https://twitter.com/Renmine_BSC">
          <img src="@/assets/twitter.svg" />
        </a>
      </div>
      <div class="whiteBook">
        <a target="_blank" href="@/assets/Renmine2.pdf">
          <img src="@/assets/whiteBook.svg" />
        </a>
      </div>
    </div>
    <div class="info">
      <h2>We are Renmine</h2>
      <div class="introduce">
        Renmine是指读了20年的书，还30年房贷，养20年医院，我们从生下来就是被作为消耗品使用的人类。
      </div>
      <div class="introduce-en">
        Renmine means the human beings who reading for 20 years, paying off a
        mortgage for 30 years and living in hospital until death. We are human
        beings who have been used as mine instead of person.
      </div>
    </div>
    <div class="join-us">
      <a
        target="_blank"
        class="join-us-button no-underline"
        href="https://pancakeswap.finance/swap?outputCurrency=0x416162B73CF0168a01C525cd3040d05f25ecF5a2#/swap?outputCurrency=0x416162b73cf0168a01c525cd3040d05f25ecf5a2"
      >
        <span>加入我们</span>
      </a>
      <br />
      <a
        target="_blank"
        class="join-us-button"
        href="https://pancakeswap.finance/swap?outputCurrency=0x416162B73CF0168a01C525cd3040d05f25ecF5a2#/swap?outputCurrency=0x416162b73cf0168a01c525cd3040d05f25ecf5a2"
      >
        <span>JOIN US</span>
      </a>
    </div>
  </div>
</template>

<script>
import bg from "@/assets/bg.webp";

export default {
  data() {
    return {
      showTip: false,
      timer: null
    };
  },
  methods: {
    show() {
      this.showTip = true;
      this.$message.info("即将到来 \r\n coming soon");
    },
    hide() {
      this.showTip = false;
    },
    tip() {
      this.show();
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.hide();
      }, 2000);
    }
  },
  mounted() {
    document.body.style.background = `url(${bg}) no-repeat center / 112%`;
  },
  beforeDestroy() {
    document.body.style.backgroundImage = null;
  }
};
</script>

<style scoped>
body {
  font-size: 16px;
  min-width: 1200px;
  /* background: url("@/assets/bg.webp") no-repeat center / 112%; */
  background: no-repeat center / 112%;
}
.global-buttons {
  position: fixed;
  right: 50px;
  top: 50%;
  z-index: 100;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.global-buttons > div {
  padding: 8px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
}
.global-buttons > div:not(:first-of-type) {
  margin-top: 30px;
}
.global-buttons div a {
  display: block;
  width: 26px;
  height: 26px;
}
.global-buttons div a img {
  width: 100%;
  height: 100%;
}
.global-buttons > div.airplane {
  padding: 8px 6px 8px 10px;
}

.info {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* margin: 0 auto; */
  text-align: center;
  color: #fff;
  max-width: 1200px;
}
.info h2 {
  font-size: 4em;
  font-style: italic;
}
.info .introduce {
  width: 1200px;
  padding: 40px 20px 0;
  font-size: 32px;
  line-height: 64px;
}
.introduce-en {
  padding: 0 18px;
  margin-top: -98px;
  font-size: 15px;
  line-height: 64px;
}

.join-us {
  position: fixed;
  left: 50%;
  bottom: 100px;
  transform: translateX(-50%);
}
.join-us-button {
  color: #fff;
  font-weight: bold;
  text-decoration: underline;
  font-size: 2em;
}
.join-us-button.no-underline {
  text-decoration: none;
}
.join-us:hover .join-us-button {
  color: #008489;
}

.tip {
  position: fixed;
  left: 50%;
  top: 100px;
  z-index: 100;
  transform: translate(-50%, 0);
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 6px 20px;
  text-align: center;
  background: #fff;
  opacity: 0.7;
  font-style: 1.5em;
  transition: all 0.5s ease;
}
.tip.hide {
  opacity: 0;
}
</style>
