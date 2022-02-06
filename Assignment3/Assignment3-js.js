class restaurantManager{
    restaurantList=[
        {"name":"Abhishek","Address":"Sai Nagar","city":"mumbai"},
        {"name":"yugant","Address":"Nagar","city":"mumbai"},
        {"name":"yugant","Address":"Nagar","city":"mumbai"} 
    ]
    printAllRestaurantNames = () =>{
        for(const abc of restaurantList){
            console.log(abc.name);
        }
    }

     filterRestaurantByCity = (city) =>{
        const mycity=city;
        for(const abc of this.restaurantList){
            if(mycity==abc.city){
                console.log(abc.name)
            }
        }
    }
}
//Please find order details for Punjabi Tadka restaurant in Delhi as:
 

const orderData = {
    "Below 500": 20,
    "500-1000": 29,
    "1000-1500": 30,
    "1500-2000": 44,
    "Above 2000": 76,
  };
  
  let orderDataKeys = Object.keys(orderData);
  let final = 0;
  let totalOrdersArray = orderDataKeys.map((key) => orderData[key]);
  let totalOrders = totalOrdersArray.reduce(
    (total, currentValue) => (total += currentValue)
  );
  // Question 2.a
  console.log(`Total no. of orders: ${totalOrders}`);
  
  // Question 2.b
  console.log(`Total no. of order proportions: ${orderDataKeys.length}`);
  
  // Question 2.c
    console.log(
    orderDataKeys.map((key, index) => {
      let percent = ((orderData[key] / totalOrders) * 100).toFixed(2);
      return {
        id: index + 1,
        order: key,
        "order percentage": percent,
        restaurant: "Punjabi Tadka",
      };
    })
  );