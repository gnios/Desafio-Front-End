using System.Web;
using System.Web.Optimization;

namespace Desafio
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                      "~/Scripts/knockout/knockout-*",
                       "~/Scripts/knockout/ko-calendar.min.js", 
                       "~/Scripts/knockout/knockout.simpleGrid.3.0.js"));

            bundles.Add(new ScriptBundle("~/bundles/plugins").Include(
                      "~/Scripts/jq-dropdown/jquery.dropdown.min.js",
                      "~/Scripts/uikit/uikit.min.js",
                      "~/Scripts/blackhole/main.js",
                       "~/Scripts/underscore/underscore.js",
                       "~/Scripts/framework/main.js"));

            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/Content/css/site.css"));

            // App

            bundles.Add(new ScriptBundle("~/bundles/app").IncludeDirectory("~/App", "*.js", true));


        }
    }
}
