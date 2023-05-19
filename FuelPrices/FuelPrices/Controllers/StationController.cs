using FuelPrices.Services.Models.Station;
using FuelPrices.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace FuelPrices.Controllers;

public class StationController : BaseController
{
    private readonly StationService _stationService;

    public StationController(
        StationService stationService
        )
    {
        _stationService = stationService;
    }

    [HttpGet]
    public async Task<StationModel[]> AllAsync([FromQuery] float lat, [FromQuery] float lng)
    {
        var models = await _stationService.GetStationsAsync(lat, lng);

        return models;
    }
}