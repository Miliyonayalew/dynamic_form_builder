import { UploadOutlined } from '@ant-design/icons';
import { Select, Form, Button, Input, Radio, Switch, Checkbox, Upload  } from 'antd';
import { useForm } from 'react-hook-form';
import { beforeUpload, beforeUploadVideo, uploadOnChange } from '../utils/PreviewFunction';
import { FieldConfig } from '../interfaces/FieldConfig';


interface FormPreviewProps {
  formData: FieldConfig[];
}



const FormPreview = ({ formData }: FormPreviewProps) => {

  const { TextArea } = Input;
  const CheckboxGroup = Checkbox.Group;
  const { register } = useForm();




  return (
    <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          
        >
          {formData.map((field, index) => (
            <>
            <Form.Item key={index} label={field.label}>
              {
              field.type === 'text' && 
              <Input
              placeholder={field.placeholder}
              {...register(`field${index}`)} />}
              {
              field.type === 'textarea' && 
              <TextArea placeholder={field.placeholder} {...register(`field${index}`)} />}
              {
              field.type === 'select' && 
              <Select placeholder={field.placeholder} {...register(`field${index}`)}>
                {field.options.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
              }
              {
              field.type === 'multiSelection' &&
              <Select mode="multiple" placeholder={field.placeholder} {...register(`field${index}`)}>
                {field.options.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
              }
              {
              field.type === 'radio' &&
              <Radio.Group>
                {field.options.map(option => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
              }
              {
              field.type === 'switch' &&
              <Switch defaultChecked={false}/>
              }
              {
              field.type === 'checkbox' &&
              <CheckboxGroup>
                {field.options.map(option => (
                  <Checkbox key={option.value} value={option.value}>
                    {option.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
              }
              {
                field.type === 'file' &&
                <Upload {...register(`field${index}`)} onChange={uploadOnChange}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              }
              {
                field.type === 'image' &&
                <Upload {...register(`field${index}`)} accept='image/*'  beforeUpload={beforeUpload} onChange={uploadOnChange}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>

              }
              {
                field.type === 'video' &&
                <Upload {...register(`field${index}`)} accept='video/*'  beforeUpload={beforeUploadVideo} onChange={uploadOnChange}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              }
            </Form.Item>

            </>
          ))}
        </Form>
    </div>
  )
}

export default FormPreview