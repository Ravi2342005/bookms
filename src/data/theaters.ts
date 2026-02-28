export interface Theater {
  id: string;
  name: string;
  location: string;
  showtimes: string[];
}

export const theaters: Theater[] = [
  {
    id: "t1",
    name: "PVR INOX — Forum Mall",
    location: "Koramangala, Bangalore",
    showtimes: ["10:00 AM", "1:15 PM", "4:30 PM", "7:45 PM", "10:30 PM"],
  },
  {
    id: "t2",
    name: "Cinépolis — Royal Meenakshi",
    location: "Bannerghatta Road, Bangalore",
    showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:15 PM"],
  },
  {
    id: "t3",
    name: "INOX — Garuda Mall",
    location: "MG Road, Bangalore",
    showtimes: ["9:30 AM", "12:45 PM", "4:00 PM", "7:15 PM", "10:45 PM"],
  },
  {
    id: "t4",
    name: "PVR — Orion Mall",
    location: "Rajajinagar, Bangalore",
    showtimes: ["10:30 AM", "1:45 PM", "5:00 PM", "8:30 PM"],
  },
];
