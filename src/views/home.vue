<template>
    <div class="px18">
        <img class="h-20 mt20" src="../assets/img/top_logo.png" alt="">
        <div class="f-ct mt50">
            <img class="h-121" src="../assets/img/logo.png" alt="">
        </div>
        <div class="tc f30 fw500 mt40">參與點對點流通獲取回報</div>
        <div class="tc f16 fw500 mt05">滿足全球用戶對短期資金的流通需求</div>
        <div class="pr ofh mt30">
            <img class="pr full-w" src="../assets/img/total_box.png" alt="">
            <div class="pa-def full-w full-h f-ct">
                <div class="f36 fw500 van-ellipsis mt-4">${{ countInfo.cardchargesum | filterDecimal(0) }}</div>
            </div>
        </div>
        <div class="tc">全球累計流通總量</div>
        <div class="mt50 flex tc">
            <div class="flex-1 mr17 h-36 lh36 border-fff" @click="joinWordDlg = true">如何加入</div>
            <div class="flex-1 mr17 h-36 lh36 border-fff" @click="introductionDlg = true">TURBO介紹</div>
            <div class="flex-1 h-36 lh36 border-fff">公開代碼</div>
        </div>
        <div class="mt30 br15 px18 py18 bg-fill">
            <div class="f-ct mt20">
                <img class="w-59" src="../assets/img/USDT_TRON.png" alt="">
            </div>
            <div class="tc f20 fw600 mt10">USDT-TRON</div>
            <div class="mt30 flex justify-between h-42 c-fff f16">
                <div v-for="(item, index) in productList" :key="index"
                     class="flex-1 f-ct border-fff"
                     :class="{'mr17': index < 2, 'border-sec bg-sec': currentProduct.day === item.day}"
                     @click="productClick(item)">
                    <div>
                        <span class="f18">{{ item.day | filterDecimal(0) }}</span>
                        <span>天</span>
                    </div>
                </div>
            </div>
            <div class="f-c-sb f13 mt35">
                <div class="">流通金額</div>
                <div class="fw600">100～{{currentProduct.limit}} USDT</div>
            </div>
            <div class="f-c-sb f13 mt16">
                <div class="">流通返回</div>
                <div class="fw600">{{ currentProduct.rate * 100 | filterDecimal }}%</div>
            </div>
            <div class="mt35">
                <van-button type="primary" class="br6" block @click="currencyConfirm = true">
                    參與流通
                </van-button>
            </div>
            <div class="py16"></div>
        </div>

        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600">匯總數據</span>
            </div>
            <div class="f-c-sb f13 mt35">
                <div class="">參與地址總量</div>
                <div class="fw500">{{ countInfo.cardsum | filterDecimal(0) }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="">參與流通總量</div>
                <div class="fw500">{{ countInfo.cardchargesum | filterDecimal }} USDT</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="">TURBO獎池</div>
                <div class="fw500">{{ countInfo.cardturbosum | filterDecimal }} USDT</div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600">TURBO分享計劃</span>
            </div>
            <div class="f-c-sb f13 mt35">
                <div class="f-sk-0 mr10">分享鏈接</div>
                <div class="fw500 van-ellipsis mr10 flex-1 tr">{{ inviteLink }}</div>
                <div class="f-sk-0 c-1" v-copy="inviteLink">複製</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="">好友總地址數</div>
                <div class="fw500">{{ planInfo.invall | filterDecimal(0) }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="">好友流通總量</div>
                <div class="fw500">{{ planInfo.invcharge | filterDecimal }} USDT</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10">直推好友</div>
                <div class="fw500 van-ellipsis mr10 flex-1 tr">{{ planInfo.inv | filterDecimal(0) }}</div>
                <div class="f-sk-0 c-1" @click="startFriendDlg = true">查看</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10">2～21代好友</div>
                <div class="fw500 van-ellipsis mr10 flex-1 tr">{{ planInfo.inv21 | filterDecimal(0) }}</div>
                <div class="f-sk-0 c-1" @click="otherFriendDlg = true">查看</div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600">個人數據統計</span>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10">個人總流通量</div>
                <div class="fw500 van-ellipsis flex-1 tr">{{ myTotalInfo.fdmUsdtCharge | filterDecimal }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10">個人總返回量</div>
                <div class="fw500 van-ellipsis flex-1 tr">{{ myTotalInfo.fdmUsdtReturn | filterDecimal }}</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10">個人分享獎勵</div>
                <div class="fw500 van-ellipsis mr10 flex-1 tr">{{ myTotalInfo.fdmIncome | filterDecimal }}</div>
                <div class="f-sk-0 c-1" @click="rewardPointDlg = true">查看</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10">個人TUBRO獎勵</div>
                <div class="fw500 van-ellipsis flex-1 tr">{{ myTotalInfo.fdmReward | filterDecimal }} USDT</div>
            </div>
            <div class="f-c-sb f13 mt20">
                <div class="f-sk-0 mr10">當前個人總盈虧</div>
                <div class="fw500 van-ellipsis flex-1 tr">{{ myTotalInfo.fdmProfit | filterDecimal }} USDT</div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600">流通記錄</span>
            </div>
            <div class="mt30 py05 flex">
                <div class="flex-4">流通周期</div>
                <div class="flex-5 tc">流通→返回</div>
                <div class="flex-6 tr">到期時間</div>
            </div>
            <div v-for="item in flowRecordList" :key="item.ID" class="mt16 flex">
                <div class="flex-4 flex">
                    <div class="mr10">{{ item.fdiDay }}天</div>
                    <a class="c-1" target="_blank" :href="Env.transactionHost + item.fdcTxID">查看</a>
                </div>
                <div class="flex-5 f-ct">
                    <span class="mr05">{{ item.fdmAmt | filterDecimal }}</span>
                    <span class="mr05 mt-4">→</span>
                    <span>{{ item.fdmReturn | filterDecimal }}</span>
                </div>
                <div class="flex-6 f12 flex align-center justify-end">{{ item.fddReturn }}</div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt16 br15 px18 py18 bg-fill">
            <div class="f-ct">
                <span class="bottom-line f17 fw600">交易地址列表</span>
            </div>
            <div class="py10"></div>
            <div class="mh100 ofy">
                <div v-for="(item, index) in tradingAddrList" :key="index" class="f-c-sb f13 mt16">
                    <div class="fw500 van-ellipsis mr10 flex-1">{{ item.fdcTel }}</div>
                    <a class="f-sk-0 c-1" target="_blank" :href="Env.transactionHost + item.fdcTel">查看</a>
                </div>
            </div>
            <div class="py05"></div>
        </div>
        <div class="mt35 f-sb px12">
            <a class="" href="https://bitpie.com/" target="_blank">
                <img class="w-43" src="../assets/img/bitpie.png" alt="">
                <div class="tc f12 c-fff">Bitpie</div>
            </a>
            <a class="" href="https://www.biki.cc" target="_blank">
                <img class="w-43" src="../assets/img/bik.png" alt="">
                <div class="tc f12 c-fff">bikicoin</div>
            </a>
            <a href="https://www.gateio.tv/" target="_blank" class="">
                <img class="w-43" src="../assets/img/gate.png" alt="">
                <div class="tc f12 c-fff">gate-io</div>
            </a>
            <a href="https://bitkeep.org/" target="_blank" class="">
                <img class="w-43" src="../assets/img/bitkeep.png" alt="">
                <div class="tc f12 c-fff">bitkeep</div>
            </a>
            <a href="https://token.im/" target="_blank" class="">
                <img class="w-43" src="../assets/img/imtoken.png" alt="">
                <div class="tc f12 c-fff">imtoken</div>
            </a>
        </div>

        <div class="mt50 px12 flex">
            <a href="https://tronscan.io/#/" target="_blank">
                <img class="h-23 mr20" src="../assets/img/tronscan.png" alt="">
            </a>
            <a href="https://www.tronlink.org/" target="_blank">
                <img class="h-23 mr20" src="../assets/img/tronLink.png" alt="">
            </a>
            <a href="https://tron.network/" target="_blank">
                <img class="h-23" src="../assets/img/tron.png" alt="">
            </a>
        </div>
        <div class="f-ct py25 f12">
            遇到問題：turbo323@gmail.com
        </div>



        <!-- 如何加入 弹框 居中 -->
        <van-popup
                v-model="joinWordDlg"
                :close-on-click-overlay="false"
                class="cus-popup">
            <div class="pop-box py25 px18 f13 lh2 flex f-column">
                <div class="flex-1 ofy">
                    <p class="tc f18 fw500">如何加入？</p>
                    <div class="mt20">1. 使用好友分享鏈接進入後登入您的USDT（TRC20）錢包地址自動激活TURBO。</div>
                    <div class="mt14">2. 選擇流通週期，並向付幣地址支付您需要流通的USDT（TRC20）數量。</div>
                    <div class="mt14">3. 流通到期後，合約將自動返回增長後的USDT(TRC20)至您的錢包地址。</div>
                    <div class="mt14">4. USDT（TRC20）第一轮流通獎勵規則：</div>
                    <div>流通1天后返回101%，流通7天后返回110%，流通15天后返回130%</div>
                    <div class="mt14">5. 分享獎勵規則：</div>
                    <div>自己每多流通100USDT,就可多拿一代的分享獎勵，最高能夠獲得20代的分享獎勵。</div>
                    <div>自己流通100USDT，可獲得1代每次收益的30%</div>
                    <div>自己流通200USDT，可獲得2代每次收益的20%</div>
                    <div>自己流通300USDT，可獲得3代每次收益的10%</div>
                    <div>自己流通400-1000USDT，可獲得4-10代每次收益的5%</div>
                    <div>自己流通1100-2000USDT，可獲得11-20代每次收益的1%</div>
                </div>

            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="joinWordDlg = false">
            </div>
        </van-popup>

        <!-- 如何加入 弹框 居中 -->
        <van-popup
                v-model="introductionDlg"
                :close-on-click-overlay="false"
                class="cus-popup">
            <div class="pop-box py25 px18 f13 lh2 flex f-column">
                <div class="flex-1 ofy">
                    <p class="tc f18 fw500">TURBO介绍</p>
                    <div class="mt20">1：TURBO DIFI采用分布式去中心化的流通返回方式，TURBO从第一轮开始自动运行，当流通量不足以支付返回量时，TURBO将自动重置并进入下一轮，最高达到第九轮。</div>
                    <div class="mt14">2：每提高一轮，资金流通收益率将自动提高50%，用于激励下一轮的参与热度。</div>
                    <div class="mt14">3：每重新启动一轮，将有10%的流通资金进入TURBO奖池，用于双倍奖励上一轮所有亏损的钱包地址。</div>
                    <div class="mt14">4. USDT（TRC20）第一轮流通獎勵規則：</div>
                    <div>流通1天后返回101%，流通7天后返回110%，流通15天后返回130%</div>
                    <div class="mt14">5. 分享獎勵規則：</div>
                    <div>自己每多流通100USDT,就可多拿一代的分享獎勵，最高能夠獲得20代的分享獎勵。</div>
                    <div>自己流通100USDT，可獲得1代每次收益的30%</div>
                    <div>自己流通200USDT，可獲得2代每次收益的20%</div>
                    <div>自己流通300USDT，可獲得3代每次收益的10%</div>
                    <div>自己流通400-1000USDT，可獲得4-10代每次收益的5%</div>
                    <div>自己流通1100-2000USDT，可獲得11-20代每次收益的1%</div>
                </div>

            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="introductionDlg = false">
            </div>
        </van-popup>

        <!-- 个人分享奖励 弹框 居中 -->
        <van-popup
                v-model="rewardPointDlg"
                :close-on-click-overlay="false"
                @opened="getRewardPoint"
                @closed="popClosedCallback"
                class="cus-popup">
            <div class="pop-box py25 px18 f13 lh2 flex f-column">
                <p class="tc f18 fw500">個人分享獎勵</p>
                <div class="flex py05 mt14 tc">
                    <p class="flex-3">時間</p>
                    <p class="flex-3">金額</p>
                    <p class="flex-2">狀態</p>
                </div>
                <van-list
                        v-model="listLoading"
                        :finished="listFinished"
                        class="flex-1 ofy"
                        oading-text="加載中..."
                        finished-text="沒有更多了"
                        :immediate-check="false"
                        @load="getRewardPoint">
                    <div v-for="item in rewardPointList" :key="item.ID" class="flex mt14 tc f12">
                        <p class="flex-3">{{ item.fddTime }}</p>
                        <p class="flex-3">{{ item.fdmAmt | filterDecimal }}USDT</p>
                        <p class="flex-2">{{ rewardPointStatus[item.fdiState] }}</p>
                    </div>
                </van-list>
            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="rewardPointDlg = false">
            </div>
        </van-popup>

        <!-- 直推好友 弹框 居中 -->
        <van-popup
                v-model="startFriendDlg"
                :close-on-click-overlay="false"
                @opened="getStartFriend"
                @closed="popClosedCallback"
                class="cus-popup">
            <div class="pop-box py25 px18 f13 lh2 flex f-column">
                <p class="tc f18 fw500">直推好友</p>
                <div class="flex py05 mt14 tc">
                    <p class="flex-3">好友地址</p>
                    <p class="flex-3">注冊時間</p>
                    <p class="flex-2">流通金額</p>
                </div>
                <van-list
                        v-model="listLoading"
                        :finished="listFinished"
                        class="flex-1 ofy"
                        oading-text="加載中..."
                        finished-text="没有更多了"
                        :immediate-check="false"
                        @load="getStartFriend">
                    <div v-for="(item, index) in startFriendList" :key="index" class="flex mt14 tc f12">
                        <p class="flex-3 van-ellipsis">{{ item.fdcTel }}</p>
                        <p class="flex-3 f-sk-0">{{ item.fddRegister.replace(/-/g, '/') }}</p>
                        <p class="flex-2 f-sk-0">{{ item.fdmValue | filterDecimal }}USDT</p>
                    </div>
                </van-list>
            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="startFriendDlg = false">
            </div>
        </van-popup>

        <!-- 2～21代好友 弹框 居中 -->
        <van-popup
                v-model="otherFriendDlg"
                :close-on-click-overlay="false"
                @opened="getOtherFriend"
                @closed="popClosedCallback"
                class="cus-popup">
            <div class="pop-box py25 px18 f13 lh2 flex f-column">
                <p class="tc f18 fw500">2～21代好友</p>
                <div class="flex py05 mt14 tc">
                    <p class="flex-3">好友地址</p>
                    <p class="flex-3">注冊時間</p>
                    <p class="flex-2">流通金額</p>
                </div>
                <van-list
                        v-model="listLoading"
                        :finished="listFinished"
                        class="flex-1 ofy"
                        oading-text="加載中..."
                        finished-text="没有更多了"
                        :immediate-check="false"
                        @load="getOtherFriend">
                    <div v-for="(item, index) in otherFriendList" :key="index" class="flex mt14 tc">
                        <p class="flex-3 van-ellipsis">{{ item.fdcTel }}</p>
                        <p class="flex-3 f-sk-0">{{ item.fddRegister }}</p>
                        <p class="flex-2 f-sk-0">{{ item.fdmValue | filterDecimal }}USDT</p>
                    </div>
                </van-list>
            </div>
            <div class="f-ct mt16 f-sk-0">
                <img class="w-45" src="../assets/img/close.png" alt="" @click="otherFriendDlg = false">
            </div>
        </van-popup>

        <!-- 充值金额 底部弹框 -->
        <van-popup
                v-model="currencyConfirm"
                closeable
                position="bottom"
                :close-on-click-overlay="false"
                close-icon-position="top-left"
                class="py15 cus-popup-bottom"
                @closed="popClosedCallback">
            <div class="tc f17 fw500">流通金額</div>
            <div class="px20 mt25">
                <div class="input-box h-50">
                    <input class="mr10" type="number" v-model="currencyValue" placeholder="請輸入流通金額">
                    <span class="f17">USDT</span>
                </div>
                <p class="mt20 lh2">溫馨提示：</p>
                <p class="c-c2c f12 lh2">參與1天流通金額為100～1,000USDT</p>
                <p class="c-c2c f12 lh2">參與7天流通金額為100～5,000USDT</p>
                <p class="c-c2c f12 lh2">參與15天流通金額為100～10,000USDT</p>
                <div class="py10 mt20">
                    <van-button
                            class="f16"
                            type="primary"
                            block
                            @click="currencyConfirmClick">
                        <div class="f-ct">
                            <van-loading v-if="currencyLoading" color="#ffffff" type="spinner" size="20" class="mr10" />
                            <span>確 認</span>
                        </div>
                    </van-button>
                </div>
            </div>
        </van-popup>

        <!-- 完善信息 邀请地址 弹框 居中 -->
        <van-popup
                v-model="registerInviteDlg"
                :close-on-click-overlay="false"
                class="cus-popup cus-popup-bottom border-sec br6"
                @closed="popClosedCallback">
            <div class="py25 px16 mx16">
                <p class="tc f18 fw600">完善信息</p>
                <div class="mt30">
                    <div class="f15">請先完善信息再進行後續操作</div>
                    <div class="input-box mt20 h-44 br6">
                        <input type="text" v-model="sharecode" :placeholder="$t('inviteP')">
                    </div>
                </div>
                <div class="mt20 f15 c-deg">* 信息提交後無法修改，請仔細核查</div>
                <div class="mt40">
                    <van-button
                            type="primary"
                            block
                            @click="inviteRegisterClick">
                        {{ $t('confirm') }}
                    </van-button>
                </div>
                <div class="f-ct py10 mt10">
                    <span class="c-deg" @click="setRegisterInviteDlg(false)">取消</span>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import Env from '../env'
    import { getQueryString, isAddress, deposit, getAccountUsdtBalance } from '../utlis/tron'

    export default {
        name: "home",
        data() {
            return {
                // registerInviteDlg: false,
                sharecode: '',
                productList: [],
                currentProduct: {},
                currencyLoading: false,
                joinWordDlg: false,
                introductionDlg: false,
                rewardPointDlg: false,
                listLoading: false,
                listFinished: false,
                startFriendDlg: false,
                otherFriendDlg: false,
                currencyConfirm: false,
                currencyValue: '',
                myTotalInfo: {},
                planInfo: {},
                countInfo: {},
                pageNum: 0,
                pageSize: 10,
                startFriendList: [],
                otherFriendList: [],
                rewardPointList: [],
                flowRecordList: [],
                tradingAddrList: [],
            }
        },
        computed: {
            ...mapState(['registerInviteDlg']),
            inviteLink() {
                let host = 'https://turbo-tron.io';
                return host + '?code=' + window.tronWeb.defaultAddress.base58;
            },
            rewardPointStatus() {
                return {
                    '1': '未完成',
                    '2': '已完成',
                }
            },
            Env() {
                return Env
            },
        },
        activated() {
            this.getIsRegister();
            this.getProductList();
            this.getMyTotalInfo();
            this.getPlanInfo();
            this.getCountInfo();
            this.getFlowRecordList();
            this.getTradingAddrList();
            let reloadTimer = setInterval(() => {
                this.getMyTotalInfo();
                this.getPlanInfo();
                this.getCountInfo();
                this.getFlowRecordList();
                this.getTradingAddrList();
            }, 20e3);
            this.$once('hook:deactivated', () => {
                clearInterval(reloadTimer);
            });
        },
        methods: {
            ...mapMutations({
                setUserInfo: 'SET_USER_INFO',
                setRegisterInviteDlg: 'SET_REGISTER_INVITE_DLG',
            }),
            async getTradingAddrList() {
                let url = 'mobile/member/joinlist';
                this.tradingAddrList = await this.$http.get(url);
            },
            async getFlowRecordList() {
                let params = {
                    page: 1,
                    num: 100,
                };
                let url = 'mobile/contract/log';
                this.flowRecordList = await this.$http.get(url, { params });
            },
            async getCountInfo() {
                let url = 'mobile/contract/all';
                this.countInfo = await this.$http.get(url);
            },
            async getProductList() {
                let url = 'mobile/contract/days';
                let res = await this.$http.get(url);
                this.currentProduct = res[0] || {};
                this.productList = res;
            },
            async getMyTotalInfo() {
                let url = 'mobile/contract/data';
                this.myTotalInfo = await this.$http.get(url);
            },
            async getPlanInfo() {
                let url = 'mobile/member/frienddata';
                this.planInfo = await this.$http.get(url);
            },
            getOtherFriend() {
                if (!this.pageNum) this.otherFriendList = [];
                this.pageNum ++;
                let params = {
                    deth: 21,
                    page: this.pageNum,
                    num: this.pageSize,
                };
                let url = 'mobile/member/friends';
                this.$http.get(url, { params }).then(res => {
                    this.otherFriendList = this.otherFriendList.concat(res);
                    if (res.length < this.pageSize) this.listFinished = true;
                }).catch(err => {
                    this.listFinished = true;
                });
            },
            getStartFriend() {
                if (!this.pageNum) this.startFriendList = [];
                this.pageNum ++;
                let params = {
                    deth: 1,
                    page: this.pageNum,
                    num: this.pageSize,
                };
                let url = 'mobile/member/friends';
                this.$http.get(url, { params }).then(res => {
                    this.startFriendList = this.startFriendList.concat(res);
                    if (res.length < this.pageSize) this.listFinished = true;
                }).catch(err => {
                    this.listFinished = true;
                });
            },
            getRewardPoint() {
                if (!this.pageNum) this.rewardPointList = [];
                this.pageNum ++;
                let params = {
                    page: this.pageNum,
                    num: this.pageSize,
                };
                let url = 'mobile/contract/rewards';
                this.$http.get(url, { params }).then(res => {
                    this.rewardPointList = this.rewardPointList.concat(res);
                    if (res.length < this.pageSize) this.listFinished = true;
                }).catch(err => {
                    this.listFinished = true;
                });
            },
            async currencyConfirmClick() {
                let { currencyValue } = this;
                if (!currencyValue) {
                    this.$toast('請輸入金額');
                    return;
                }

                if (currencyValue < 100 || currencyValue > this.currentProduct.limit) {
                    this.$toast('金額超出范围');
                    return;
                }
                if (this.currencyLoading) return;
                this.currencyLoading = true;
                let count = await getAccountUsdtBalance();
                if (currencyValue > count) {
                    this.$toast('賬戶餘額不足');
                    this.currencyLoading = false;
                    return;
                }
                deposit(currencyValue).then(res => {
                    let url = 'mobile/contract/create';
                    this.$http.post(url, {txID: res, fdiDay: this.currentProduct.day}).then(r => {
                        this.$dialog({message: '充值成功'});
                    })
                }).catch(err => {
                    this.$dialog({message: '充值失敗'});
                }).finally(() => {
                    this.currencyLoading = false;
                    this.currencyValue = '';
                    setTimeout(() => {
                        this.currencyConfirm = false;
                    }, 300);
                });
            },
            productClick(item) {
                this.currentProduct = item;
            },
            inviteRegisterClick() {
                let { sharecode } = this;
                if (!sharecode) {
                    this.$toast(this.$t('inviteP'));
                    return;
                }
                if (!isAddress(sharecode)) {
                    this.$toast('請輸入正確的邀請地址');
                    this.sharecode = '';
                    return;
                }
                this.setRegisterInviteDlg(false);
                let url = 'mobile/card/reg';
                let selfAddr = window.tronWeb.defaultAddress.base58;
                let params = {
                    sharecode,
                    phone: selfAddr,
                };
                this.$http.post(url, params).then(res => {
                    this.$toast(this.$t('bindSuc'));
                }).then(err => {

                })
            },
            async getIsRegister() {
                let selfAddr = window.tronWeb.defaultAddress.base58;
                let params = {
                    phone: selfAddr,
                };
                let url = '/mobile/card/login';
                this.$http.post(url, params).then(res => {

                }).catch(() => {
                    this.setRegisterInviteDlg(true);
                    this.sharecode = getQueryString('code') || '';
                });
            },
            popClosedCallback() {
               this.listLoading = false;
               this.listFinished = false;
               this.currencyValue = '';
               this.pageNum = 0;
               this.startFriendList = [];
               this.otherFriendList = [];
               this.rewardPointList = [];
            },
        }
    }
</script>

<style scoped>
    .mh100 { max-height: 300px; }
</style>
