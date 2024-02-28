
rs.initiate(
    {
      _id: "rs0",
      members: [
        { _id: 0, host: "paypal_mongodb:27017" },
        // Add more members as needed
      ],
    }
  );