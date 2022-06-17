using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scoreboard.Data;

namespace Scoreboard.Controllers.Factory;

[Route("api/[controller]")]
public class PlayerController : Controller
{
    private DataContext Context { get; }
    private readonly DbSet<PlayerModel> _database;
    private readonly List<PlayerModel> _data;
    
    public PlayerController(DataContext context)
    {
        Context = context;
        _database = context.PlayerModels;
        _data = _database.ToList();
    }
    
    [HttpGet]  
    public IEnumerable<PlayerModel> Get()
    {
        return _data;
    }
    
    [HttpPut]  
    [Route("Edit")]  
    public IActionResult Edit(PlayerModel playerModel)
    {
        var result = _database.SingleOrDefault(b => b.id == playerModel.id);
        if (result == null) return NotFound(playerModel);
        result = playerModel;
        Context.SaveChanges();
        return Ok(result);
    } 

    [HttpPost]
    [Route("Add")] 
    public IActionResult Post(PlayerModel playerModel)
    {
        // Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        _database.Add(playerModel);
        _data.Add(playerModel);
        Context.SaveChanges();
        return Ok(playerModel);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var category = _data.FirstOrDefault(x => x.id == int.Parse(id));
        if (category  == null)
        {
            return NotFound();
        }

        _database.Remove(category);
        _data.Remove(category);
        Context.SaveChanges();
        return Ok(category);
    }
}