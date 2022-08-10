import { useField ,useForm } from "vee-validate";
export default function(){
    const schema = {
        phone(value){
            if (value && value.trim()) {
                if(/^1\d{10}$/.test(value.trim())){
                    return true
                }else{
                    return '手机号格式不正确'
                }
              }
              return '请输入11位数字的手机号码';
            },
        code(value){
            if (value && value.trim()) {
                if(/^\d{6}$/.test(value.trim())){
                    return true
                }else{
                    return '验证码格式错误'
                }
            }
            return '请输入6位验证码';
            },
        password(value){
            if (value && value.trim()) {
                if(/^[0-9A-Za-z]{6,20}$/.test(value.trim())){
                    return true
                }else{
                    return '密码格式错误'
                }
            }
            return '请输入密码(6-20位数字或字母)';
            },
        password1(value){
            if (value && value.trim()) {
                if(value.trim() == password.value){
                    return true
                }else{
                    return '密码不一致'
                }
            }
            return '请输入密码(6-20位数字或字母)';
            },
        agree(value){
            if (value) {
                return true
            }
            return '请阅读并勾选同意协议';
            }
        }
    
    const {handleSubmit} = useForm({
        validationSchema: schema,
        });
        
    const { errorMessage:phoneMessage, value:phone ,handleChange:phoneChange } = useField('phone');
    const { errorMessage:codeMessage, value:code ,handleChange:codeChange } = useField('code');
    const { errorMessage:passwordMessage, value:password ,handleChange:passwordChange } = useField('password');
    const { errorMessage:password1Message, value:password1 ,handleChange:password1Change } = useField('password1');
    let { errorMessage:agreeMessage ,handleChange:agreeChange,checked:agreeChecked } = useField('agree','',{
        type:'checkbox',
        checkedValue:true,
        uncheckedValue:false
    });

    return {
    phoneMessage,
    phone,
    phoneChange,

    codeMessage,
    code,
    codeChange,

    passwordMessage,
    password,
    passwordChange,

    password1Message,
    password1,
    password1Change,
    
    agreeMessage,
    agreeChange,
    agreeChecked,

    handleSubmit
    };
}