<template>
    <div class="header_container">
        <el-breadcrumb separator="/"> 
            <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="handleCommand" menu-align='start'>
            <img :src="baseImgPath + adminInfo.avatar" class="avator">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="singout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import {
    AdminAPI,
    setStorage
} from 'src/service'
import {
    baseImgPath
} from 'src/env'
import {
    mapActions,
    mapMutations,
    mapState
} from 'vuex'
export default {
    data() {
            return {
                baseImgPath,
            }
        },
        created() {
            if (!this.adminInfo.id) {
                this.getAdminData().then((logined) => {
                    if (!logined)
                        this.$router.push('/manage/login');
                })
            }
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            ...mapMutations(['SET_TOKEN']),
            ...mapActions(['getAdminData']),
            async handleCommand(command) {
                if (command == 'home') {
                    this.$router.push('/manage');
                } else if (command == 'singout') {
                    const res = await AdminAPI.signout()
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '退出成功'
                        }); 
                        this.$router.push('/manage/login');
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }
            },
        }
}
</script>
<style>
@import 'mixin.css';
.header_container {
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
}

.avator {
    @mixin wh 36px,
    36px;
    border-radius: 50%;
    margin-right: 37px;
}

.el-dropdown-menu__item {
    text-align: center;
    font-size: .3rem;
}
</style>
