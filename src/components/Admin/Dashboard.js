import React, { Component } from 'react';
import AdminLayout from '../Hoc/AdminLayout';

class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <AdminLayout>
                <div className = 'user_dashboard'>
                    <div>
                        This is your Dashboard.
                    </div>
                </div>
            </AdminLayout>
        );
    }
}
 
export default Dashboard;