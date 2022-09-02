using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using FirebaseAdmin;
using api.Models;
using api.Models.Repositories;
using Microsoft.AspNetCore.Authentication;
namespace api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddControllers();
            // services.AddSwaggerGen(c =>
            // {
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "api", Version = "v1" });
            // });
            services.AddAuthentication("Api")
                .AddScheme<AuthenticationSchemeOptions, FirebaseAuthencticationHandler>("Api", options => { });
            services.AddCors(options => {
                options.AddDefaultPolicy(
                    builder => builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins(new string[] { "https://localhost:3001", "http://localhost:3000" })
                );
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseSwagger();
                // app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "api v1"));
            }

            app.UseHttpsRedirection();

            app.UseCors();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //Credential = Google.Apis.Auth.OAuth2.GoogleCredential.GetApplicationDefault()
            var path = @"/Users/jun/workspace/practice/react-auth-4/api/cred/fire-base-test-7721f-firebase-adminsdk-s9aab-e2515f8f82.json";
            FirebaseApp.Create(new AppOptions() {
                Credential = Google.Apis.Auth.OAuth2.GoogleCredential.FromFile(path)
            });
        }
    }
}
