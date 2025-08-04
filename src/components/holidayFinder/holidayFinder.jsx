import { useEffect, useState } from 'react';
import ActionBar from '../actionBar/actionBar';
import RegionList from '../regionList/regionList';

function HolidayFinder() {
  const [data, setData] = useState({});
  const [region, setRegion] = useState("all")
  const [showAll, setShowAll] = useState(false);

  function fetchData() {
    fetch('https://www.gov.uk/bank-holidays.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        // console.log(response)
        return response.json();
      })
      .then((data) => {
        // console.log(typeof data)
        console.log(data)
        setData(data);
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  useEffect(() => {
    // console.log('UseEffect runs here');
    fetchData();
  }, []); 

  

  function handleRefresh()
  {
    fetchData(); 
    // console.log("handleRefresh ran")
  }

  function handleShowAll(command)
  {
    setShowAll(command)
    // console.log(showAll)
  }

  function handleRegionSelect(rg)
  {
    setRegion(rg)
    console.log(region)
  }

  function filterData()
  {
    let currentDate = new Date();
    let cutOffDate = new Date();
    cutOffDate.setDate(currentDate.getDate() + 30);

    currentDate = formatDate(currentDate)
    cutOffDate = formatDate(cutOffDate)

    console.log(currentDate)
    console.log(cutOffDate)

    const filter = (events) => {
        return events.filter(holiday=>{
        if(showAll===false)
        {
            if(currentDate <= holiday.date && holiday.date <= cutOffDate)
            {
                return holiday
            }
        }
        else
        {
            if(currentDate <= holiday.date)
            {
                return holiday
            }
        }
        
    }).map(holiday=>({
        title: holiday.title, 
        date: holiday.date
    }));
    }

    if(region !== "all")
    {
        return [{region, holidays: filter(data[region].events)}];
    }
    else if(region === "all")
    {
        return Object.keys(data).map(key => ({
            region: key,
            holidays: filter(data[key].events)
        }));
    }
}
  
  function formatDate(ufdate) {
      const year = ufdate.getFullYear();
      const month = ufdate.getMonth() + 1;
      const date = ufdate.getDate();      
      const formattedMonth = month < 10 ? '0' + month : month;
      const formattedDay = date < 10 ? '0' + date : date;
      return `${year}-${formattedMonth}-${formattedDay}`;
  }

  return (
    <div>
      <h1>Holiday Finder</h1>
      <p>{showAll ? 'All upcoming holidays' : 'Holidays in next 30 days'}</p>
      <ActionBar onRefresh={handleRefresh} onShowAll={handleShowAll} onRegionSelect={handleRegionSelect}/>
      <RegionList data={filterData()}/>
    </div>
  );
}

export default HolidayFinder;
