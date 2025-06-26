import { useDispatch, useSelector } from 'react-redux';
import ClientTestimonials from '../components/ClientTestimonials';
import HeroSection from '../components/HeroSection';
import PortfolioShowcase from '../components/PortfolioShowcase';
import ServicesSection from '../components/ServicesSection';
import { useEffect } from 'react';
import { fetchServices } from '../redux/slices/service';
import { fetchProjects } from '../redux/slices/Project';
import SplashScreen from '../components/SplashScreen';
import { fetchTestimonials } from '../redux/slices/testimonial';

function Home() {
  const dispatch = useDispatch()
  const { services, loading: servicesLoading } = useSelector(state => state.services);
  const { projects, loading: projectsLoading } = useSelector(state => state.projects);
  const { testimonials, testimonialsLoading } = useSelector(state => state.testimonials)

  const sortedProjects = [...projects].sort((a, b) => new Date(b.fromDate) - new Date(a.fromDate));


  useEffect(() => {
    dispatch(fetchTestimonials());
    dispatch(fetchServices());
    dispatch(fetchProjects());
  }, [dispatch])

  if (servicesLoading || projectsLoading, testimonialsLoading) {
    return <SplashScreen />;
  }



  return (
    <>
      <HeroSection />
      <ServicesSection services={services || []} />
      <PortfolioShowcase projects={sortedProjects || []} />
      <ClientTestimonials testimonials={testimonials || []} />
    </>
  );
}

export default Home;