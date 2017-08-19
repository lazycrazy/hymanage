<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="2" style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
                    <el-menu-item index="/manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                       <el-menu-item index="/manage/synclist">同步记录</el-menu-item>
                     
                </el-menu>
            </el-col>
            <el-col :span="22" style="height: 100%;overflow: auto;">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    computed: {
        defaultActive: function() {
            return this.$route.path.replace('/', '');
        }
    },
}
</script>
<style scoped>
@import 'mixin.css';
.manage_page {}
</style>
