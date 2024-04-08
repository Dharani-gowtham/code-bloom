import MenuBar from "../components/MenuBar";
import NewsItem from "../components/NewsItem";

const Home = () => {
  const newsData = [
    {
      title: "Python has updated into new version",
      tags: ["python", "update", "new version"],
      description: "this is the sample description for the testing purpose",
      img: "https://images.pexels.com/photos/17022636/pexels-photo-17022636/free-photo-of-redhead-with-freckles-wearing-makeup.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/python-updated",
    },
    {
      title: "JavaScript version 9 released",
      tags: ["javascript", "update", "new version"],
      description: "this is the sample description for the testing purpose",
      img: "https://images.pexels.com/photos/4385547/pexels-photo-4385547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/javascript-updated",
    },
    {
      title: "React 18 is out with new features",
      tags: ["react", "update", "new version"],
      description: "this is the sample description for the testing purpose",
      img: "https://images.pexels.com/photos/20732688/pexels-photo-20732688/free-photo-of-man-in-suit-standing-in-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/react-updated",
    },
    {
      title: "React 18 is out with new features",
      tags: ["react", "update", "new version"],
      description: "this is the sample description for the testing purpose",
      img: "https://images.pexels.com/photos/20732688/pexels-photo-20732688/free-photo-of-man-in-suit-standing-in-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/react-updated",
    },
    {
      title: "React 18 is out with new features",
      tags: ["react", "update", "new version"],
      description: "this is the sample description for the testing purpose",
      img: "https://images.pexels.com/photos/20732688/pexels-photo-20732688/free-photo-of-man-in-suit-standing-in-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/react-updated",
    },
    {
      title: "React 18 is out with new features",
      tags: ["react", "update", "new version"],
      description: "this is the sample description for the testing purpose",
      img: "https://images.pexels.com/photos/20732688/pexels-photo-20732688/free-photo-of-man-in-suit-standing-in-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/react-updated",
    },
    {
      title: "React 18 is out with new features",
      tags: ["react", "update", "new version"],
      description: "this is the sample description for the testing purpose",
      img: "https://images.pexels.com/photos/20732688/pexels-photo-20732688/free-photo-of-man-in-suit-standing-in-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/react-updated",
    },
  ];

  return (
    <>
      <MenuBar />
      <div className="home-container">
        <h1 className="home-heading">Latest News</h1>
        <div className="news-container">
          {newsData.map((item, index) => (
            <div key={index} className="news-item">
              <NewsItem
                title={item.title}
                tags={item.tags}
                description={item.description}
                img={item.img}
                link={item.link}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
