// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      name: "John Doe",
      email: "john@doe.com",
      address: "Mankato Mississippi 96522, Nulla st. 10",
      workplace: "Samsung",
      phone: "(257) 563-7401",
    },
    {
      name: "Cecilia Chapman",
      email: "Cecilia@doe.com",
      address: "Tamuning PA 10855, Sodales Av. 4264",
      workplace: "Apple",
      phone: "(786) 713-8616",
    },
    {
      name: "Kyla Olsen",
      email: "Kyla@doe.com",
      address: "Chelsea MI 67708, Nunc Road 4",
      workplace: "Microsoft",
      phone: "(947) 278-5929",
    },
    {
      name: "Nyssa Vazquez",
      email: "Nyssa@doe.com",
      address: "Latrobe DE 38100, Viverra. Avenue",
      workplace: "Google",
      phone: "(608) 265-2215",
    },
    {
      name: "Aaron Hawkins",
      email: "Aaron@doe.com",
      address: "Santa Rosa MN 98804, Tortor. Street 42",
      workplace: "Facebook",
      phone: "(959) 119-8364",
    },
  ]);
}
