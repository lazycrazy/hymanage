<template>
    <div class="page">
        <head-top head-title="我的积分" :goback='true'></head-top>
        <section class="content_container">
            <section class="content">
                <header class="content_header">
                    <span class="content_title_style">当前积分</span>
                    <section class="contetn_description">
                        <img src="../../../img/description.png" height="24" width="24">
                        <a to="/points/detail" class="content_title_style">积分说明</a>
                    </section>
                </header>
                <p class="content_num">
                    <span>0</span>
                    <span>分</span>
                </p>
                <div class="promit_button" @click="usePoint">积分兑换商品</div>
            </section>
        </section>
        <p class="deal_detail">最近30天积分纪录</p>
        <div class="no_log">
            <img src="../../../img/no-log.png">
            <p>最近30天无积分纪录</p>
            <p>快去下单赚取大量积分吧</p>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import AlertTip from 'components/alert-tip'

export default {
    data() {
            return {
                showAlert: false,
                alertText: null,
            }
        },
        mounted() {

        },
        components: {
            HeadTop,
            AlertTip,
        },
        computed: {

        },
        methods: {
            usePoint() {
                this.showAlert = true;
                this.alertText = '快去下单赚取大量积分吧';
            }
        }
}
</script>
<style scoped>
@import 'mixin';
.page {
    padding-top: 1.95rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    z-index: 202;
    background-color: #f2f2f2;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.content_container {
    padding: .3rem;
    background-color: $blue;
    .content {
        padding: .4rem;
        background-color: #fff;
        border-radius: .15rem;
        .content_header {
            @mixin fj;
            font-size: .55rem;
            .contetn_description {
                display: flex;
                align-items: center;
                img {
                    @mixin wh .6rem,
                    .6rem;
                    margin-right: .2rem;
                }
                .content_title_style {
                    color: $blue;
                }
            }
            .content_title_style {
                color: #666;
            }
        }
        .content_num {
            span:nth-of-type(1) {
                @mixin sc 1.8rem,
                #333;
            }
            span:nth-of-type(2) {
                @mixin sc .7rem,
                #333;
            }
        }
        .promit_button {
            @mixin wh 100%,
            2rem;
            @mixin sc .8rem,
            #fff;
            border-radius: 0.15rem;
            line-height: 2rem;
            margin-top: 1rem;
            text-align: center;
            background-color: #fe6d47;
        }
    }
}

.deal_detail {
    @mixin sc .6rem,
    #999;
    line-height: 2rem;
    padding-left: .5rem;
}

.no_log {
    text-align: center;
    margin-top: 1rem;
    img {
        @mixin wh 8rem,
        5rem;
    }
    p {
        margin-top: .5rem;
        @mixin sc .7rem,
        #666;
    }
    p:nth-of-type(2) {
        @mixin sc .5rem,
        #999;
    }
}

.router-slid-enter-active,
.router-slid-leave-active {
    transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
