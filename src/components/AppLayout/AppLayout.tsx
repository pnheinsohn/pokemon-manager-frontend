import React, { useMemo } from 'react';
import { useRoutes, Link, useLocation, Navigate } from 'react-router-dom';
import routes from '~react-pages';

interface BreadcrumbRoute {
  path: string;
  label: string;
  parent?: string;
}

// Helper function to convert path to label
const pathToLabel = (path: string): string => {
  const segment = path.split('/').pop() ?? '';
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper to create a route with optional parent
const createRoute = (path: string, label: string, parent?: string): BreadcrumbRoute => ({
  path,
  label,
  ...(parent && { parent })
});

// Generate breadcrumb routes from pages structure
const generateBreadcrumbRoutes = (): BreadcrumbRoute[] => {
  const routes: BreadcrumbRoute[] = [
    createRoute('/', 'Home'),
  ];

  // Dashboard section with dynamic route support
  routes.push(
    createRoute('/dashboard', 'Dashboard'),
    createRoute('/dashboard/report-details/:id', 'Report Details', '/dashboard')
  );

  // Resource sections (with create pages)
  const resources = ['base-pokemons', 'base-pokemon-types', 'pokemons'];
  resources.forEach(resource => {
    const basePath = `/${resource}`;
    routes.push(
      createRoute(basePath, pathToLabel(resource)),
      createRoute(
        `${basePath}/create`,
        `Create ${pathToLabel(resource.replace(/s$/, ''))}`,
        basePath
      )
    );
  });

  return routes;
};

const breadcrumbRoutes = generateBreadcrumbRoutes();

const AppLayout = (): React.ReactNode => {
  const routeElements = useRoutes(routes);
  const location = useLocation();

  const isValidPath = useMemo(() => {
    return breadcrumbRoutes.some(route => {
      const routePattern = route.path.replace(/:\w+/g, '[^/]+');
      const pattern = new RegExp(`^${routePattern}/?$`);
      return pattern.test(location.pathname) || location.pathname === '/error';
    });
  }, [location.pathname]);

  const getBreadcrumbChain = (route: BreadcrumbRoute): BreadcrumbRoute[] => {
    const buildChain = (
      currentRoute: BreadcrumbRoute,
      chain: BreadcrumbRoute[] = []
    ): BreadcrumbRoute[] => {
      const newChain = [currentRoute, ...chain];

      if (!currentRoute.parent) {
        return currentRoute.path === '/' ? newChain : [breadcrumbRoutes[0], ...newChain] as BreadcrumbRoute[];
      }

      const parentRoute = breadcrumbRoutes.find(r => r.path === currentRoute.parent);
      return parentRoute ? buildChain(parentRoute, newChain) : newChain;
    };

    return buildChain(route);
  };

  const breadcrumbs = useMemo(() => {
    if (!isValidPath && location.pathname !== '/error') {
      return [];
    }

    // Find exact or closest matching route
    const exactRoute = breadcrumbRoutes.find(r => {
      const routePattern = r.path.replace(/:\w+/g, '[^/]+');
      const pattern = new RegExp(`^${routePattern}/?$`);
      return pattern.test(location.pathname);
    });

    if (exactRoute) {
      const chain = getBreadcrumbChain({
        ...exactRoute,
        path: location.pathname,
        label: exactRoute.label
      });
      return chain[0]?.path === '/' ? chain : [breadcrumbRoutes[0], ...chain];
    }

    const closestRoute = [...breadcrumbRoutes]
      .sort((a, b) => b.path.length - a.path.length)
      .find(r => location.pathname.startsWith(r.path + '/'));

    if (closestRoute) {
      const modifiedRoute = {
        ...closestRoute,
        path: location.pathname,
      };
      const chain = getBreadcrumbChain(modifiedRoute);
      return chain[0]?.path === '/' ? chain : [breadcrumbRoutes[0], ...chain];
    }

    return [breadcrumbRoutes[0]];
  }, [location.pathname, isValidPath]);

  if (!isValidPath && location.pathname !== '/error') {
    return <Navigate to="/error" replace />;
  }

  const isPathActive = (path: string) => location.pathname.startsWith(path);

  const renderNavLink = (path: string, label: string) => (
    <Link
      to={path}
      className={`text-text-primary no-underline p-2.5 rounded hover:bg-background-hover transition-colors ${
        isPathActive(path) ? 'bg-background-hover' : ''
      }`}
    >
      {label}
    </Link>
  );

  const renderBreadcrumb = (breadcrumb: BreadcrumbRoute | undefined, index: number) => (
    <li key={`${breadcrumb?.path}-${index}`} className="flex items-center">
      {index < breadcrumbs.length - 1 ? (
        <>
          <Link to={breadcrumb?.path ?? ''} className="text-gray-500 hover:text-gray-700">
            {breadcrumb?.label}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
        </>
      ) : (
        <span className="text-gray-700">{breadcrumb?.label}</span>
      )}
    </li>
  );

  return (
    <div className="flex h-screen w-full">
      <div className="w-[250px] bg-background-primary text-text-primary p-5 flex flex-col">
        <Link to="/" className="no-underline">
          <h1 className="text-2xl mb-10 text-center text-text-primary">
            Fintual Admin
          </h1>
        </Link>

        <nav className="flex flex-col gap-2.5">
          {renderNavLink('/dashboard', 'Dashboard')}
          {renderNavLink('/pokemons', 'Pokemons')}
          {renderNavLink('/base-pokemons', 'Base Pokemons')}
          {renderNavLink('/base-pokemon-types', 'Base Pokemon Types')}
        </nav>
      </div>

      <div className="flex-1 overflow-auto bg-background-secondary w-full">
        {location.pathname !== '/error' && (
          <div className="px-5 py-3 bg-white border-b">
            <nav className="text-sm" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex">
                {breadcrumbs.map(renderBreadcrumb)}
              </ol>
            </nav>
          </div>
        )}
        <div className="p-5">{routeElements}</div>
      </div>
    </div>
  );
};

export default AppLayout;
