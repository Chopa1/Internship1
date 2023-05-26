import './App.css';
import React, { useState, useEffect } from "react";
import { Tab } from '@headlessui/react'
import data from './data.json';
import { Link, useLocation} from 'react-router-dom';
import queryString from 'query-string';

interface Data {
  total: number;
  data: Row[];
}

interface Row {
  type: string;
  _id: string;
  amount: string;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  phone: string;
  address: string;
}

function App() {

  const myData: Data = data;

  let [categories] = useState({
    Income: myData.data.filter(item => item.type === "income"),
    Outcome: myData.data.filter(item => item.type === "outcome"),
    Loan: myData.data.filter(item => item.type === "loan"),
    Investment: myData.data.filter(item => item.type === "investment"),
  })

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    if (typeof queryParams.tab === "string") {
      const index = parseInt(queryParams.tab, 10);
      if (!isNaN(index) && index >= 0 && index < Object.keys(categories).length) {
        setSelectedTab(index);
      } else {
        setSelectedTab(0);
    }
    }
  }, [location.search, categories, setSelectedTab]);
  

  return (
  <div className="flex flex-col bg-gradient-to-r from-blue-500 to-blue-300 min-h-screen justify-center items-center">
  <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
    <Tab.List className="grid grid-cols-4 gap-1 w-1/2 rounded-lg bg-blue-900/20 p-1">
      {Object.keys(categories).map((type, index) => (
        <Tab
          key={type}
          className={({ selected }) =>
            classNames(
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            )
          }
        >
          <Link to={`/navigator?tab=${index}`}>{type}</Link>
        </Tab>
      ))}
    </Tab.List>
    <div className="w-1/2 mt-2 bg-white rounded-lg shadow-lg p-1 overflow-y-auto max-h-96">
      <Tab.Panels>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}>
              <ul>
                {posts.map((post) => (
                <li
                key={post._id}
                className="relative rounded-md p-3 hover:bg-gray-100 grid grid-cols-2">
                <div className="col-span-1">
                  <div className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">Name:</div>
                  <h3 className="font-bold">
                    {post.name.first} {post.name.last} 
                  </h3>
                </div>
              
                <div className="col-span-1">
                  <div className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">Amount:</div>
                  <h3 className="font-bold">
                    {post.amount}$
                  </h3>
                </div>
              
                <a
                  href="#"
                  className={classNames(
                    'absolute inset-0 rounded-md',
                    'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                  )}/>
              </li>))}
            </ul>
            </Tab.Panel>))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  </div>
  );
};

export default App;
