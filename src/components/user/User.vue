<template>
  <div>
    <!-- 面包屑头部 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="userList.query" clearable @clear="getUserlist">
            <el-button slot="append" icon="el-icon-search" @click="getUserlist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" 
          @click="adddialogVisible = true"
          >
          添加用户
          </el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table
        :data="userlist"
        stripe
        border
        style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="173px">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserform(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
            <el-tooltip content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userList.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="userList.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
        background>
      </el-pagination>
    </el-card>
    <!-- 对话框区域 -->
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      width="50%"
      :visible.sync="adddialogVisible"
      @close="adddialogClose">
      <!-- 内容 -->
      <el-form :model="addForm" :rules="addRules" ref="userRef" label-width="100px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>  
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户信息 -->
    <el-dialog
      title="编辑用户"
      width="50%"
      :visible.sync="editdialogVisible">
      <!-- 内容 -->
      <el-form :model="editFrom"  ref="editFromRef" label-width="100px" :rules="addRules" @close="editFromClose">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="editFrom.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editFrom.mobile"></el-input>
        </el-form-item>
      </el-form>  
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import {getUserlist, changeUserstate ,addUserinfo, editUserinfo, editUserSubmit, deleteUserinfo} from '@/network/user.js'

export default {
  name: 'User',
  data() {
    var cheakEmail = (rule, value, callback) => {
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if(regEmail.test(value)) {
        callback()
      } else{
        callback(new Error('请输入正确的邮箱'))
      }
    }
    var cheakMobile = (rule, value, callback) => {
      const regMobile = /^[1][3,4,5,6,7,8][0-9]{9}$/
      if(regMobile.test(value)) {
        callback()
      } else{
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      userList: {
        query: '',
        // 当前页数
        pagenum: 1,  
        //当前显示多少条数据
        pagesize: 2
      },
      totalpage: 0,
      userlist: [],
      adddialogVisible: false,
      editdialogVisible: false,
      addForm: {
        username: '123',
        password: '123456',
        email: '123@qq.com',
        mobile: '16675342314'
      },
      editFrom: {},
      addRules: {
        username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: cheakEmail, trigger: 'blur' }
            ],
        mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: cheakMobile, trigger: 'blur' }
            
          ]
      }
    }
  },
  created() {
    this.getUserlist()
  },
  methods: {
    //获取用户列表数据
    getUserlist() {
      getUserlist(this.userList).then(res => {
        // console.log(res);
        this.totalpage = res.data.totalpage
        this.userlist = res.data.users
      })
    },
    //分页数据处理
    handleSizeChange(newSize){
      this.userList.pagesize = newSize
      this.getUserlist()
    },
    handleCurrentChange(newPage){
      this.userList.pagenum = newPage
      this.getUserlist()
    },
    //用户列表状态修改
    changeState(userrow){
      changeUserstate(userrow).then(res => {
        if(res.meta.status !== 200) {
          userrow.mg_state = !userrow.mg_state
          this.$message.error('用户状态修改失败')
        } else{
          this.$message.success('用户状态修改成功')
        }
      })
    },
    //重置添加用户表单信息
    adddialogClose() {
      this.$refs.userRef.resetFields()
    },
    //添加用户
    addUser() {
      this.$refs.userRef.validate(valid => {
        if(valid) {
          addUserinfo(this.addForm).then(res => {
            if(res.meta.status == 201) {
              this.adddialogVisible = false
              this.$message.success('用户添加成功')
              this.getUserlist()
            } else {
              this.$message.error('用户添加失败')
            }
          })
        }
      })
    },
    //编辑用户信息
    editUserform(id) {
      this.editdialogVisible = true
      editUserinfo(id).then (res => {
        // console.log(res);
        if(res.meta.status == 200) {
          this.editFrom = res.data
        }else {
          this.$message.error('用户信息修改失败')
        }
      })
    },
    //重置编辑用户表单信息
    editFromClose() {
      this.$refs.editFromRef.resetFields()
    },
    //编辑用户并确定
    editUser() {
      this.$refs.editFromRef.validate(valid => {
        // console.log(valid);
        if(valid) {
          editUserSubmit(this.editFrom).then(res => {
            // console.log(res);
            if(res.meta.status == 200) {
              this.editdialogVisible = false
              this.getUserlist()
              this.$message.success('修改用户成功')
            } else {
              this.$message.error('修改用户失败')
            }
          })
        }
      }) 
    },
    //删除用户
    deleteUser(id) {
      // console.log(id);
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserinfo(id).then(res => {
            console.log(res);
            if(res.meta.status == 200) {
              this.$message.success('删除成功!')
              this.getUserlist()
            }else (
              this.$message.error('删除失败')
            )
          })
        }).catch(() => {
          this.$message.info('已取消删除')         
        })
      }
  }
}
</script>

<style lang="scss" scoped>

</style>