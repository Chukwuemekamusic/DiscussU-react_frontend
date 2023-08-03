import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/Category.css'
import { useHomeStore } from "../store";

const CategoriesFeed = ({ sortRoomsByCategory, categories,  }) => {
  const setIsSorted = useHomeStore((state) => state.setIsSorted)

  const handleCategoryClick = (d) => {
    if (d===""){
      setIsSorted(false)
    } else {
      setIsSorted(true)
    }
    sortRoomsByCategory(d)
  }
  return (
    <Container>
      <Row>
        <Col>
          <h3>
            <Link onClick={() => handleCategoryClick("")}>All</Link>
          </h3>
        </Col>
      </Row>

      <Row>
        {categories.map((category) => {
          // console.log('category id', category.id);
          return (
            <Col key={category.id} xs={6} md={4}>
              <div className="category-card">
                <h3>
                  <Link onClick={() => handleCategoryClick(category.name)}>
                    {category.name}
                  </Link>
                </h3>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CategoriesFeed;
