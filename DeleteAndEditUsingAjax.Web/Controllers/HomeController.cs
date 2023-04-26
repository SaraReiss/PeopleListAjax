using DeleteAndEditUsingAjax.Data;
using DeleteAndEditUsingAjax.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;

namespace DeleteAndEditUsingAjax.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=People;Integrated Security=true;";
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetPeople()
        {
            var manager = new PeopleManager(_connectionString);
            return Json(manager.GetAll());
        }
        [HttpPost]
        public void AddPerson(Person person)
        {
            var manager = new PeopleManager(_connectionString);
            manager.Add(person);

        }
        [HttpPost]
        public void EditPerson(Person person)
        {
            var manager = new PeopleManager(_connectionString);
            manager.Edit(person);
        }
        [HttpPost]
        public void DeletePerson(int id)
        {
            var manager = new PeopleManager(_connectionString);
            manager.Delete(id);

        }
        [HttpPost]
        public IActionResult GetPersonFromId(int id)
        {
            var manager = new PeopleManager(_connectionString);
            return Json(manager.GetPersonFromId(id));
        }

    }
}