defmodule ControllerWeb.Router do
  use ControllerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {ControllerWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end
  pipeline :static do
    plug Plug.Static,
      at: "/static/images",
      from: {:controller, "priv/static/images"}
  end
   scope "/", ControllerWeb do
    scope "/static" do
      pipe_through :static
      get "/*path", ErrorController, :notfound
    end
  end


  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ControllerWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  # Other scopes may use custom stacks.
  # scope "/api", ControllerWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard in development
  if Application.compile_env(:controller, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: ControllerWeb.Telemetry
    end
  end
end
