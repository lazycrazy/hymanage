<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
        
        <h4>微盟APP应用列表</h4>
        <el-table :data="apps" >                
                  <el-table-column label="APP名称" prop="NAME">
                </el-table-column>   
                <el-table-column label="应用APPID" prop="APPID">
                </el-table-column>              
                         
                <el-table-column label="操作" >
                    <template scope="scope">
                        <el-button type="primary"  @click="APPSHOUQUAN(scope.$index, scope.row)">授权</el-button> 
                    </template>
                </el-table-column>
            </el-table>
 
<h4>微盟绑定公众号列表</h4>
            <el-table :data="gzhs" style="width: 100%">                
                <el-table-column label="公众号ID" prop="PID">
                </el-table-column>
                <el-table-column label="名称" >
                <template scope="scope" >
         <img :src="scope.row.AVATARURL" >
        <span style="margin-left: 10px;" class='middle'>{{ scope.row.NAME }}</span>
      </template>
                </el-table-column>
               
                 
                <el-table-column label="操作" >
                    <template scope="scope">
                        <el-button :plain="true"  type="primary" @click="refreshToken(scope.$index, scope.row)">刷新TOKEN</el-button>
                        <el-button :plain="true" type="primary" @click="uploadMember(scope.$index, scope.row)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                        <el-button  :plain="true" type="primary" @click="downloadMember(scope.$index, scope.row)">下载<i class="el-icon-upload el-icon--right" style="transform:rotate(180deg);"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>

             
        </div>
    </div>
</template>
<script>
import headTop from 'src/components/header-a'

import dtime from 'moment'
import {
    AdminAPI
} from 'src/service'
 
import {
    api_url,
    imgPath
} from 'src/env'

let {
    uploadMember,
    downloadMember,
     refreshToken,
    getAuthorize,
    getApps,
    getGzhs,
    getSyncs,
} = AdminAPI
export default {
    data() {
            return {
                api_url,
                imgPath,
                 authorize_code:null,
                offset: 0, 
                count: 0,
                gzhs: [],
                apps:[],
                syncs:[],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
            }
        },
        created() {
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData() {
                try {
                    
                   await Promise.all([this.getApps(),this.getGzhs(),this.getSyncs()])
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            async getApps() {
                try {
                    const rs = await getApps()
if(rs.status==1)
                    this.apps = rs.apps
                else 
                    this.$message({
                        type: 'error',
                        message: rs.message
                    })
                } catch (err) {
                    console.log('获取APPs失败', err);
                }
            },
             async getGzhs() {
                try {
                    const rs = await getGzhs()
if(rs.status==1)
                    this.gzhs = rs.gzhs
                else 
                    this.$message({
                        type: 'error',
                        message: rs.message
                    })
                } catch (err) {
                    console.log('获取gzhs失败', err);
                }
            },
             async getSyncs() {
                try {
                    const rs = await getSyncs({                   
                    currentpage: this.currentPage,
                    pagesize: 20
                })
if(rs.status==1)
                    {this.syncs = rs.syncs.Items 
                this.count = Math.ceil(rs.syncs.TotalRecords)
            }
                else 
                    this.$message({
                        type: 'error',
                        message: rs.message
                    })
                } catch (err) {
                    console.log('获取syncs失败', err);
                }
            },
            handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
            authorize(){
                if(authorize_code == ''){

                }
                dialogFormVisible = false

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;

                this.getSyncs()
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.address.address = row.address;
                this.dialogFormVisible = true;
                this.selectedCategory = row.category.split('/');
                if (!this.categoryOptions.length) {
                    this.getCategory();
                }
            },
           async refreshToken(index, row) {
                let rs = await refreshToken({PID:row.PID})
                if(rs.status ==1){
                    this.$message({type:'success',message:'刷新成功'})
                }else{
                     this.$message({type:'error',message:rs.message})
                }
            },
            async uploadMember(index, row) {
                let rs = await uploadMember({PID:row.PID})
                if(rs.status ==1){
                    this.$message({type:'success',message:'上传成功'})
                }else{
                     this.$message({type:'error',message:rs.message})
                }
            },
            async downloadMember(index, row) {
                let rs = await downloadMember({PID:row.PID})
                if(rs.status ==1){
                    this.$message({type:'success',message:'下载成功'})
                }else{
                     this.$message({type:'error',message:rs.message})
                }
            },
            APPSHOUQUAN(index, row){
                
                window.open(row.authorizeURL)
 
                // this.dialogFormVisible = true
                // 
                this.$prompt('输入授权码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\w{6,12}$/,
          inputErrorMessage: '授权码格式不正确'
        }).then(async ({ value }) => {
         var rs =  await getAuthorize( {code:value,id:row.ID})
 if(rs.status==1){
     await this.getGzhs()
          this.$message({
            type: 'success',
            message: '授权成功' 
          })

      }else 
    this.$message({
            type: 'error',
            message: rs.message
          })  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消授权操作'
          });       
        });
                  
            },
            addFood(index, row) {
                this.$router.push({
                    path: 'addGoods',
                    query: {
                        restaurant_id: row.id
                    }
                })
            },
            async handleDelete(index, row) {
                try {
                    const res = await deleteResturant(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除店铺成功'
                        });
                        this.tableData.splice(index, 1);
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除店铺失败')
                }
            },            
            addressSelect(vale) {
                const {
                    address,
                    latitude,
                    longitude
                } = vale;
                this.address = {
                    address,
                    latitude,
                    longitude
                };
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                } else {
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateShop() {
                this.dialogFormVisible = false;
                try {
                    Object.assign(this.selectTable, this.address);
                    this.selectTable.category = this.selectedCategory.join('/');
                    const res = await updateResturant(this.selectTable)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新店铺信息成功'
                        });
                        this.getResturants();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                } catch (err) {
                    console.log('更新餐馆信息失败', err);
                }
            },
        },
}
</script>
<style>

@import 'mixin.css';
.middle{
    @mixin vc;
}
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.table_container {
    img {
        @mixin wh 5rem,5rem;
    }
    padding: 20px;
    &>div {
        margin-bottom: 30px;
    }
}

.Pagination {
    display: flex;
    justify-content: flex-end; 
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}

.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>
