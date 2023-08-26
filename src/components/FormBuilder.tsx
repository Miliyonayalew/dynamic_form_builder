import { useState } from 'react';
import { Select, Card, Form, Button, Input, Space, Divider, Tooltip, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { useLocation } from "react-router-dom"
import { Layout, Row, Col } from 'antd';
import FormPreview from './FormPreview';
import { FieldConfig } from '../interfaces/FieldConfig';
import Navbar from '../pages/Navbar'

const {Content } = Layout;
const { Paragraph, Title } = Typography;

const FormBuilder = () => {
  const location = useLocation()
  const { title, description } = location.state 
  const { register } = useForm();
  const [selectedFieldType, setSelectedFieldType] = useState<string>('text');
  const [formData, setFormData] = useState<FieldConfig[]>([]);


  const handleAddField = () => {
    const newField: FieldConfig = {
      type: selectedFieldType,
      label: '',
      placeholder: '',
      validationRules: '',
      options: [],
    };

    setFormData(prevFields => [...prevFields, newField]);
  };

  const handleRemoveField = (index: number) => {
    setFormData(prevFields => prevFields.filter((_, i) => i !== index));
  };

  const handleLabelChange = (index: number, value: string) => {
    setFormData(prevFields => {
      const updatedFields = [...prevFields];
      updatedFields[index].label = value;
      return updatedFields;
    });
  };

  const generateOption = (field: FieldConfig, index: number) => {
    console.log(index)
    return (
      <Tooltip title="Separate by Comma(,)">
      <Input style={{width: '90%'}} value={field.options.map(option => option.label).join(', ')}
      {...register(`field${index}`)}
      onChange={e => {
        const options = e.target.value.split(',').map(option => ({
          label: option.trim(),
          value: option.trim(),
        }));
        setFormData(prevFields => {
          const updatedFields = [...prevFields];
          updatedFields[index].options = options;
          return updatedFields;
        });
      }
      }
      />
    </Tooltip>
    )
  }

  const handleInputGenerate = (field: FieldConfig, index: number) => {
    return (
      <Input
        style={{ width: '90%' }}
        value={field.label}
        placeholder="Label here"
        {...register(`field${index}`)}
        onChange={e => handleLabelChange(index, e.target.value)}
      />
    )
  }
  
  const handlePlaceholder = (field: FieldConfig, index: number) => {
    return (
      <Input 
      placeholder="Placeholder here"
      value={field.placeholder} 
      {...register(`field${index}`)}
      onChange={e => {
        const value = e.target.value;
        setFormData(prevFields => {
          const updatedFields = [...prevFields];
          updatedFields[index].placeholder = value;
          return updatedFields;
        });
      }}
      />
    )
  }

  


  const renderField = (field: FieldConfig, index: number) => {

    return (
      <Form 
        key={index} 
        className="space-align-container"
      > 
        {

        field.type === 'text' && (
          <>
          <Form.Item label="Label"labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            {handleInputGenerate(field, index)}         
          </Form.Item>
          <Form.Item label="Placeholder" labelCol={{ span: 24 }} wrapperCol={{ span: 18 }}>
             {handlePlaceholder(field, index)}
           </Form.Item>
          </>
        )}
        {
        field.type === 'textarea' && (
        <>
        <Form.Item label="Label" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
         {handleInputGenerate(field, index)}
        </Form.Item>
        <Form.Item label="Placeholder" labelCol={{ span: 24 }} wrapperCol={{ span: 18 }}>
        {handlePlaceholder(field, index)}
        </Form.Item>
        </>
        )}
        {field.type === 'select' && (
        <>
        <Form.Item label="Label" labelCol={{ span: 24 }} wrapperCol={{ span: 18 }}>
          {handleInputGenerate(field, index)}
        </Form.Item>
        <Form.Item label="Placeholder" labelCol={{ span: 24 }} wrapperCol={{ span: 18 }}>
             {handlePlaceholder(field, index)}
           </Form.Item>
        <Form.Item label="Options" labelCol={{ span: 24 }} wrapperCol={{ span: 20 }}>
        {generateOption(field, index)}
        </Form.Item>

        </>
        )}
        {
          field.type === 'multiSelection' && (
            <Space>
            <Form.Item label="Name" labelCol={{ span: 24 }} wrapperCol={{ span: 20 }} >
              {handleInputGenerate(field, index)}
            </Form.Item>
            <Form.Item label="Placeholder" labelCol={{ span: 24 }} wrapperCol={{ span: 18 }}>
             {handlePlaceholder(field, index)}
           </Form.Item>
            <Form.Item label="Options" tooltip="Separate by Comma(,)" labelCol={{ span: 24 }} wrapperCol={{ span: 22 }}>
              {generateOption(field, index)}
            </Form.Item>
            </Space>
          )
        }
        {
          field.type === 'radio' && (
            <>
            <Form.Item label="Name" labelCol={{ span: 24 }} wrapperCol={{ span: 18 }}>
              {handleInputGenerate(field, index)}
            </Form.Item>
            <Form.Item label="Options" tooltip="Separate by Comma(,)" labelCol={{ span: 24 }} wrapperCol={{ span: 20 }}>
            {generateOption(field, index)}
            </Form.Item>
            </>
          )
        }       
        {
          field.type==='switch' && (
            <>
            <Form.Item label="Name" labelCol={{ span: 24 }} wrapperCol={{ span: 20 }}>
              {handleInputGenerate(field, index)}
            </Form.Item>
            </>
          )
        }
        {
          field.type==='checkbox' && (
            <>
            <Form.Item label="Name" labelCol={{ span: 24 }} wrapperCol={{ span: 18 }}>
              {handleInputGenerate(field, index)}
            </Form.Item>
            <Form.Item label="Options" tooltip="Separate by Comma(,)" labelCol={{ span: 24 }} wrapperCol={{ span: 20 }}>
              {generateOption(field, index)}
            </Form.Item>
            </>
          )
        }
        {
          field.type==='file' && (
            <>
            <Form.Item label="Name" labelCol={{ span: 24 }} wrapperCol={{ span: 18 }}>
              {handleInputGenerate(field, index)}
            </Form.Item>
            </>
          )
        }
        {
          field.type==='image' && (
            <>
            <Form.Item label="Name" labelCol={{ span: 24 }} wrapperCol={{ span: 18 }}>
              {handleInputGenerate(field, index)}
            </Form.Item>
            </>
          )
        }
     {
          field.type==='video' && (
            <>
            <Form.Item label="Name" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              {handleInputGenerate(field, index)}
            </Form.Item>
            </>
          )
        }
    
         <Button 
              danger
              onClick={() => handleRemoveField(index)}
              style={{ width: '10%', marginLeft: '5px' }}
              icon={<DeleteOutlined />}
            >
        </Button>        
        
        <Divider />      
              
      </Form>
    );
  };

  return (
    <Layout className="layout">
      <Navbar/>
      <Content style={{ padding: '5%' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            {/* Left Column: Form */}
          <h2>Form Builder</h2>
          <Space.Compact block>
            <Select
              value={selectedFieldType}
              onChange={value => setSelectedFieldType(value)}
              style={{width: '40%', marginRight: 10}}
            >
            <Select.Option value="text">Text Input</Select.Option>
            <Select.Option value="textarea">Text Area</Select.Option>
            <Select.Option value="select">Select</Select.Option>
            <Select.Option value="multiSelection">Multi Selection</Select.Option>
            <Select.Option value="radio">Radio</Select.Option>
            <Select.Option value="switch">Switch</Select.Option>
            <Select.Option value="checkbox">Checkbox</Select.Option>
            <Select.Option value="file">File Upload</Select.Option>
            <Select.Option value="image">Image Upload</Select.Option>
            <Select.Option value="video">Video Upload</Select.Option>
            </Select>
            
            <Button 
              type="dashed"
              onClick={handleAddField}
              style={{ width: '25%' }}
              icon={<PlusOutlined />}
            >
              Add Field
            </Button>
          </Space.Compact>
          <Divider />
          {formData.map((field, index) => (
            <div key={index}>
              {renderField(field, index)}
            </div>
          ))}

        </Col>
  
        <Col xs={24} lg={10}>
        <Card 
          title="Form Preview" 
          bordered={false}
        >
          <Title level={5}>Title: {title}</Title>
          <Paragraph>Description: {description}</Paragraph>
          <FormPreview formData={formData} />
        </Card>
        </Col>
      </Row>
    </Content>
  </Layout>
  );
};

export default FormBuilder;
