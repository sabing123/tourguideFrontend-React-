import React,{Component} from 'react'
import { Button, Card,CardTitle,CardText,CardBody,CardImg, Col, Row} from 'reactstrap'

//import Sidenav from'./sidenav'
import {Drawer,Header,Navigation,Content,Layout,Textfield} from 'react-mdl'
export default class AdminDashboard extends Component {

    handleLogout = (e) => {
        e.preventDefault();
       // localStorage.removeItem('token');
        this.props.history.push('/admin')
    }

    render() {
        return (
            <div>
                {/* The drawer is always open in large screens. The header is always shown, even in small screens. */}
<div style={{height: '720px', position: 'relative'}}>
    <Layout fixedHeader fixedDrawer>
        <Header title="Admin Pannel"><Button color='danger' onClick={this.handleLogout}> Logout</Button></Header>
        <Drawer title="Tour Guide">
            <Navigation>
            <a href="/AdminDashboard">Dashboard</a>
                <a href="/PlaceList">Manage Place</a>
                <a href="/HotelList">Manage Hotel</a>
                <a href="/TrekkingList">Manage Treeking</a>
                <a href="/GuideList">Manage Tourist Guide</a>
                
            </Navigation>
        </Drawer>
        <Content> 
       <Row>

    
        <Col xs="6">
        <Card style={{ width: '25rem', background:'white', marginLeft:'50px'}}>
                
                <CardBody>
                    
                <Button variant="primary" size="lg" active style={{  marginLeft:'100px' , background:'blue'}} >15</Button>
                    <CardTitle>Total Number of Places</CardTitle>
                    <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </CardText>
                   
                </CardBody>
    
              </Card>
              </Col>
              <Col xs="6">
                <Card style={{ width: '25rem', background:'white' , marginLeft:'20px'}}>
                
                <CardBody>
                    
                <Button variant="primary" size="lg" active  style={{  marginLeft:'100px' , background:'blue'}}> 25</Button>
                    <CardTitle>Total Number Of Hotel</CardTitle>
                    <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </CardText>
                   
                </CardBody>
    
              </Card>
</Col>

<Col xs="6">
                <Card style={{ width: '25rem', background:'white' , marginLeft:'50px'}}>
                
                <CardBody>
                    
                <Button variant="primary" size="lg" active  style={{  marginLeft:'100px' , background:'blue'}}> 25</Button>
             
                    <CardTitle>Total Number of Guide</CardTitle>
               
                    <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </CardText>
                   
                </CardBody>
    
              </Card>
</Col>


<Col xs="6">
                <Card style={{ width: '25rem', background:'white' , marginLeft:'20px'}}>
                
                <CardBody>
                    
                <Button variant="primary" size="lg" active  style={{  marginLeft:'100px' , background:'blue'}}> 25</Button>
                    <CardTitle>Total Number of Trekking</CardTitle>
                    <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </CardText>
                   
                </CardBody>
    
              </Card>
</Col>

</Row>
        </Content>
    </Layout>
</div>

           
                
            </div>
        )
    }
}


