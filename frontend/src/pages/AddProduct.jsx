
import { Button, Dropdown, Form, Input, Select, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useAddProductMutation } from '../endpoints/productApiSlice';


function AddProduct() {

    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const [product, setProduct] = useState({
        product_name: '',
        product_image: '',
        product_description: '',
        product_price: '',
        noOfProduct: '',
    })

    const [addProduct] = useAddProductMutation()

    const submitHandler = async () => {
        setIsLoading(true);
        try {
            await addProduct(product).unwrap()
            message.success('Product added successfully');
            form.resetFields();
        } catch (error) {
            message.error("Product not added, Please try agin!")
        } finally {
            setIsLoading(false)
        }
        form.resetFields(['basic']);

    }

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <Form
                form={form}
                style={{
                    maxWidth: 350,
                    margin: '50px auto 0 auto'
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                layout='vertical'
                onFinish={submitHandler}
            >
                <Form.Item
                    label="Product name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your product name',
                        },
                    ]}
                >
                    <Input onChange={handleChange} type="name" name="product_name" />
                </Form.Item>
                <Form.Item
                    label="Product image"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your product image!',
                        },
                    ]}
                >
                    <Input onChange={handleChange} type="text" name="product_image" />
                </Form.Item>

                <Form.Item
                    label="Product price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your product price!',
                        },
                    ]}
                >
                    <Input onChange={handleChange} type="Number" name="product_price" />
                </Form.Item>

                <Form.Item
                    label="Number of product"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your number of product!',
                        },
                    ]}
                >
                    <Input onChange={handleChange} type="Number" name="noOfProduct" />
                </Form.Item>

                <Form.Item
                    label="Product description"
                >
                    <TextArea name="product_description" onChange={handleChange} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: 350 }} disabled={isLoading ? true : false}>
                        {isLoading ? <LoadingOutlined size={10} /> : "Add product"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddProduct