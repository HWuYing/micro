import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PageLayout } from '@layouts';
import { component } from '@particulate';
import { particulate } from '@components';
import { Authorized } from '@components';
import * as action from '../store/action/index';
import formConfig from './config/form.config';

const { saveRef } = component;
const { createForm } = particulate;
const Form = createForm(formConfig);

@connect(
  ({}) => ({}),
  {
    getDetails: action.exchangeDetail,
    save: action.exchangeModify,
  }
)
class Edit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: {},
    };
  }

  async componentDidMount() {
    const { getDetails } = this.props;
    const dataSource = await getDetails();

    this.setState({
      dataSource,
    });
  }

  async onSubmit(fields) {
    const { dataSource } = this.state;

    await this.props.save({
      ...dataSource,
      ...fields,
    });
  }

  render() {
    const { dataSource } = this.state;

    return (
      <PageLayout>
        <Form
          style={{ marginLeft: '30px', width: '75%' }}
          layoutCol="1"
          layout="inline"
          getForm={saveRef(this, 'form')}
          fieldsStore={dataSource}
          rootContext={{}}
          onSubmit={(...arg) => this.onSubmit(...arg)}
        >
          <Authorized target="div" style={{ textAlign: 'center', paddingTop: '100px' }}>
            <Button author={{ visibility: 'false' }} type="primary" htmlType="submit">
              保存
            </Button>
          </Authorized>
        </Form>
      </PageLayout>
    );
  }
}

export default Edit;
