import { lazy, useEffect, useState } from "react";
import axios from "axios";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

interface User {
  id: number;
  full_name: string | null;
  email: string;
}

// Define the Project interface
interface Project {
  id: number;
  name: string;
  description: string;
}
const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/sign-in/";
          return;
        }

        // Fetch user details
        const userResponse = await axios.get("http://localhost:8080/users/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userResponse.data);

        // Fetch user's projects (if applicable)
        const projectsResponse = await axios.get("http://localhost:8080/projects/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects(projectsResponse.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Handle Axios-specific errors
          console.error("Axios error:", error.response?.data || error.message);
          if (error.response?.status === 401) {
            alert("Session expired. Please sign in again.");
            localStorage.removeItem("token");
            window.location.href = "/sign-in/";
          } else if (error instanceof Error) {
            // Handle generic JavaScript errors
            console.error("Unexpected error:", error.message);
          } else {
            // Handle unknown error
            console.error("Unknown error:", error);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading account details...</div>;
  }

  if (!user) {
    return <div>Error loading account details. Please try again later.</div>;
  }

  return (
    <Container>
      <ScrollToTop />
      <div style={{ padding: "20px" }}>
        <h1>Account Details</h1>
        <div>
          <p><strong>Full Name:</strong> {user.full_name || "N/A"}</p>
        </div>
        <div>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <h2>My Projects</h2>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <strong>{project.name}</strong> - {project.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects available.</p>
        )}
      </div>
    </Container>
  );
};

export default Account;
