namespace FuelPrices.ORS.Models.Directions;

public class DirectionsModel
{
    public DirectionsFeatureModel[] Features { get; set; } = Array.Empty<DirectionsFeatureModel>();
}

public class DirectionsFeatureModel
{
    public FeaturePropertiesModel? Properties { get; set; }
}

public class FeaturePropertiesModel
{
    public FeatureSummaryModel? Summary { get; set; }
}

public class FeatureSummaryModel
{
    public decimal Distance { get; set; }
}