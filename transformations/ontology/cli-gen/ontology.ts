/** Used at the top-level node to indicate the context for the JSON-LD objects used. The context provided in this type is compatible with the keys and URLs in the rest of this generated file. */
export type WithContext<T extends Thing> = T & {
    "@context": {
        "uxi": "https://uxiverse.com/ontology/";
        "schema": "https://schema.org/";
    };
};
export interface Graph {
    "@context": {
        "uxi": "https://uxiverse.com/ontology/";
        "schema": "https://schema.org/";
    };
    "@graph": readonly Thing[];
}
type SchemaValue<T, TProperty extends string> = T | Role<T, TProperty> | readonly (T | Role<T, TProperty>)[];
type IdReference = {
    /** IRI identifying the canonical address of this object. */
    "@id": string;
};

/** Boolean: True or False. */
export type Boolean = "https://schema.org/False" | "schema:False" | "https://schema.org/True" | "schema:True" | boolean;

/** A date value in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
export type Date = string;

/** A combination of date and time of day in the form [-]CCYY-MM-DDThh:mm:ss[Z|(+|-)hh:mm] (see Chapter 5.4 of ISO 8601). */
export type DateTime = string;

interface EmployeeRoleBase extends OrganizationRoleBase {
    /** The base salary of the job or of an employee in an EmployeeRole. */
    "schema:baseSalary"?: SchemaValue<MonetaryAmount | Number | PriceSpecification | IdReference, "schema:baseSalary">;
    /** The currency (coded using {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217} ) used for the main salary information in this job posting or for this employee. */
    "schema:salaryCurrency"?: SchemaValue<Text, "schema:salaryCurrency">;
}
type EmployeeRoleLeaf<TContent, TProperty extends string> = EmployeeRoleBase & {
    "@type": "schema:EmployeeRole";
} & {
    [key in TProperty]: TContent;
};
/** A subclass of OrganizationRole used to describe employee relationships. */
export type EmployeeRole<TContent = never, TProperty extends string = never> = EmployeeRoleLeaf<TContent, TProperty>;

interface LinkRoleBase extends RoleBase {
    /** The language of the content or performance or used in an action. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/availableLanguage availableLanguage}. */
    "schema:inLanguage"?: SchemaValue<Language | Text | IdReference, "schema:inLanguage">;
    /** Indicates the relationship type of a Web link. */
    "schema:linkRelationship"?: SchemaValue<Text, "schema:linkRelationship">;
}
type LinkRoleLeaf<TContent, TProperty extends string> = LinkRoleBase & {
    "@type": "schema:LinkRole";
} & {
    [key in TProperty]: TContent;
};
/** A Role that represents a Web link e.g. as expressed via the 'url' property. Its linkRelationship property can indicate URL-based and plain textual link types e.g. those in IANA link registry or others such as 'amphtml'. This structure provides a placeholder where details from HTML's link element can be represented outside of HTML, e.g. in JSON-LD feeds. */
export type LinkRole<TContent = never, TProperty extends string = never> = LinkRoleLeaf<TContent, TProperty>;

/**
 * Data type: Number.
 *
 * Usage guidelines:
 * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
 * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
 */
export type Number = Float | Integer | number | `${number}`;

interface OrganizationRoleBase extends RoleBase {
    /** A number associated with a role in an organization, for example, the number on an athlete's jersey. */
    "schema:numberedPosition"?: SchemaValue<Number, "schema:numberedPosition">;
}
type OrganizationRoleLeaf<TContent, TProperty extends string> = OrganizationRoleBase & {
    "@type": "schema:OrganizationRole";
} & {
    [key in TProperty]: TContent;
};
/** A subclass of Role used to describe roles within organizations. */
export type OrganizationRole<TContent = never, TProperty extends string = never> = OrganizationRoleLeaf<TContent, TProperty> | EmployeeRole<TContent, TProperty>;

interface PerformanceRoleBase extends RoleBase {
    /** The name of a character played in some acting or performing role, i.e. in a PerformanceRole. */
    "schema:characterName"?: SchemaValue<Text, "schema:characterName">;
}
type PerformanceRoleLeaf<TContent, TProperty extends string> = PerformanceRoleBase & {
    "@type": "schema:PerformanceRole";
} & {
    [key in TProperty]: TContent;
};
/** A PerformanceRole is a Role that some entity places with regard to a theatrical performance, e.g. in a Movie, TVSeries etc. */
export type PerformanceRole<TContent = never, TProperty extends string = never> = PerformanceRoleLeaf<TContent, TProperty>;

interface RoleBase extends ThingBase {
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:endDate"?: SchemaValue<Date | DateTime, "schema:endDate">;
    /**
     * A position played, performed or filled by a person or organization, as part of an organization. For example, an athlete in a SportsTeam might play in the position named 'Quarterback'.
     *
     * @deprecated Consider using https://schema.org/roleName instead.
     */
    "schema:namedPosition"?: SchemaValue<Text | URL, "schema:namedPosition">;
    /** A role played, performed or filled by a person or organization. For example, the team of creators for a comic book might fill the roles named 'inker', 'penciller', and 'letterer'; or an athlete in a SportsTeam might play in the position named 'Quarterback'. */
    "schema:roleName"?: SchemaValue<Text | URL, "schema:roleName">;
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:startDate"?: SchemaValue<Date | DateTime, "schema:startDate">;
}
type RoleLeaf<TContent, TProperty extends string> = RoleBase & {
    "@type": "schema:Role";
} & {
    [key in TProperty]: TContent;
};
/**
 * Represents additional information about a relationship or property. For example a Role can be used to say that a 'member' role linking some SportsTeam to a player occurred during a particular time period. Or that a Person's 'actor' role in a Movie was for some particular characterName. Such properties can be attached to a Role entity, which is then associated with the main entities using ordinary properties like 'member' or 'actor'.
 *
 * See also {@link http://blog.schema.org/2014/06/introducing-role.html blog post}.
 */
export type Role<TContent = never, TProperty extends string = never> = RoleLeaf<TContent, TProperty> | LinkRole<TContent, TProperty> | OrganizationRole<TContent, TProperty> | PerformanceRole<TContent, TProperty>;

/** Data type: Text. */
export type Text = CssSelectorType | PronounceableText | URL | XPathType | string;

/** A point in time recurring on multiple days in the form hh:mm:ss[Z|(+|-)hh:mm] (see {@link http://www.w3.org/TR/xmlschema-2/#time XML schema for details}). */
export type Time = string;

/** The basic data types such as Integers, Strings, etc. */
export type DataType = Boolean | Date | DateTime | Number | Text | Time;

interface _3DModelBase extends MediaObjectBase {
    /** Whether the 3DModel allows resizing. For example, room layout applications often do not allow 3DModel elements to be resized to reflect reality. */
    "schema:isResizable"?: SchemaValue<Boolean, "schema:isResizable">;
}
interface _3DModelLeaf extends _3DModelBase {
    "@type": "schema:3DModel";
}
/** A 3D model represents some kind of 3D content, which may have {@link https://schema.org/encoding encoding}s in one or more {@link https://schema.org/MediaObject MediaObject}s. Many 3D formats are available (e.g. see {@link https://en.wikipedia.org/wiki/Category:3D_graphics_file_formats Wikipedia}); specific encoding formats can be represented using the {@link https://schema.org/encodingFormat encodingFormat} property applied to the relevant {@link https://schema.org/MediaObject MediaObject}. For the case of a single file published after Zip compression, the convention of appending '+zip' to the {@link https://schema.org/encodingFormat encodingFormat} can be used. Geospatial, AR/VR, artistic/animation, gaming, engineering and scientific content can all be represented using {@link https://schema.org/3DModel 3DModel}. */
export type _3DModel = _3DModelLeaf;

interface AboutPageLeaf extends WebPageBase {
    "@type": "schema:AboutPage";
}
/** Web page type: About page. */
export type AboutPage = AboutPageLeaf;

interface ABTestBase extends ElementBase {
    /** An A-version is one of the two versions tested in an A/B-Test. The A-version is usually the status quo of the application, and the B-version the changed one that's hoped to bring improved conversion. */
    "uxi:aVersion"?: SchemaValue<UIElement | IdReference, "uxi:aVersion">;
    /** A B-version is one of the two versions tested in an A/B-Test. The B-version is usually the 'new' version that is tested against the status quo, which is called the A-version. */
    "uxi:bVersion"?: SchemaValue<UIElement | IdReference, "uxi:bVersion">;
    /** variation of the same UI element, e.g. the A and B version of an A/B-test */
    "uxi:variation"?: SchemaValue<UIElement | IdReference, "uxi:variation">;
}
interface ABTestLeaf extends ABTestBase {
    "@type": "uxi:ABTest";
}
/** An A/B test is an important tool for improving UX based on data. In such a test, the users are presented with almost identical versions of a page, and only one aspect is varied. Interaction data is collected and compared between both versions. Analysing A/B-tests rely on statistical methods, so one needs a high number of views to yield meaningful results. Testing more than two versions (A/B/C-tests) is possible, but harder to analyze, and even more views are needed. */
export type ABTest = ABTestLeaf;

interface AcceptActionLeaf extends ActionBase {
    "@type": "schema:AcceptAction";
}
/**
 * The act of committing to/adopting an object.
 *
 * Related actions:
 * - {@link https://schema.org/RejectAction RejectAction}: The antonym of AcceptAction.
 */
export type AcceptAction = AcceptActionLeaf;

interface AccommodationBase extends PlaceBase {
    /** Category of an {@link https://schema.org/Accommodation Accommodation}, following real estate conventions e.g. RESO (see {@link https://ddwiki.reso.org/display/DDW17/PropertySubType+Field PropertySubType}, and {@link https://ddwiki.reso.org/display/DDW17/PropertyType+Field PropertyType} fields for suggested values). */
    "schema:accommodationCategory"?: SchemaValue<Text, "schema:accommodationCategory">;
    /** A floorplan of some {@link https://schema.org/Accommodation Accommodation}. */
    "schema:accommodationFloorPlan"?: SchemaValue<FloorPlan | IdReference, "schema:accommodationFloorPlan">;
    /** An amenity feature (e.g. a characteristic or service) of the Accommodation. This generic property does not make a statement about whether the feature is included in an offer for the main accommodation or available at extra costs. */
    "schema:amenityFeature"?: SchemaValue<LocationFeatureSpecification | IdReference, "schema:amenityFeature">;
    /** The floor level for an {@link https://schema.org/Accommodation Accommodation} in a multi-storey building. Since counting systems {@link https://en.wikipedia.org/wiki/Storey#Consecutive_number_floor_designations vary internationally}, the local system should be used where possible. */
    "schema:floorLevel"?: SchemaValue<Text, "schema:floorLevel">;
    /** The size of the accommodation, e.g. in square meter or squarefoot. Typical unit code(s): MTK for square meter, FTK for square foot, or YDK for square yard */
    "schema:floorSize"?: SchemaValue<QuantitativeValue | IdReference, "schema:floorSize">;
    /** Length of the lease for some {@link https://schema.org/Accommodation Accommodation}, either particular to some {@link https://schema.org/Offer Offer} or in some cases intrinsic to the property. */
    "schema:leaseLength"?: SchemaValue<Duration | QuantitativeValue | IdReference, "schema:leaseLength">;
    /** The total integer number of bathrooms in a some {@link https://schema.org/Accommodation Accommodation}, following real estate conventions as {@link https://ddwiki.reso.org/display/DDW17/BathroomsTotalInteger+Field documented in RESO}: "The simple sum of the number of bathrooms. For example for a property with two Full Bathrooms and one Half Bathroom, the Bathrooms Total Integer will be 3.". See also {@link https://schema.org/numberOfRooms numberOfRooms}. */
    "schema:numberOfBathroomsTotal"?: SchemaValue<Integer, "schema:numberOfBathroomsTotal">;
    /** The total integer number of bedrooms in a some {@link https://schema.org/Accommodation Accommodation}, {@link https://schema.org/ApartmentComplex ApartmentComplex} or {@link https://schema.org/FloorPlan FloorPlan}. */
    "schema:numberOfBedrooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfBedrooms">;
    /** Number of full bathrooms - The total number of full and ¾ bathrooms in an {@link https://schema.org/Accommodation Accommodation}. This corresponds to the {@link https://ddwiki.reso.org/display/DDW17/BathroomsFull+Field BathroomsFull field in RESO}. */
    "schema:numberOfFullBathrooms"?: SchemaValue<Number, "schema:numberOfFullBathrooms">;
    /** Number of partial bathrooms - The total number of half and ¼ bathrooms in an {@link https://schema.org/Accommodation Accommodation}. This corresponds to the {@link https://ddwiki.reso.org/display/DDW17/BathroomsPartial+Field BathroomsPartial field in RESO}. */
    "schema:numberOfPartialBathrooms"?: SchemaValue<Number, "schema:numberOfPartialBathrooms">;
    /** The number of rooms (excluding bathrooms and closets) of the accommodation or lodging business. Typical unit code(s): ROM for room or C62 for no unit. The type of room can be put in the unitText property of the QuantitativeValue. */
    "schema:numberOfRooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfRooms">;
    /** Indications regarding the permitted usage of the accommodation. */
    "schema:permittedUsage"?: SchemaValue<Text, "schema:permittedUsage">;
    /** Indicates whether pets are allowed to enter the accommodation or lodging business. More detailed information can be put in a text value. */
    "schema:petsAllowed"?: SchemaValue<Boolean | Text, "schema:petsAllowed">;
    /** A page providing information on how to book a tour of some {@link https://schema.org/Place Place}, such as an {@link https://schema.org/Accommodation Accommodation} or {@link https://schema.org/ApartmentComplex ApartmentComplex} in a real estate setting, as well as other kinds of tours as appropriate. */
    "schema:tourBookingPage"?: SchemaValue<URL, "schema:tourBookingPage">;
    /** The year an {@link https://schema.org/Accommodation Accommodation} was constructed. This corresponds to the {@link https://ddwiki.reso.org/display/DDW17/YearBuilt+Field YearBuilt field in RESO}. */
    "schema:yearBuilt"?: SchemaValue<Number, "schema:yearBuilt">;
}
interface AccommodationLeaf extends AccommodationBase {
    "@type": "schema:Accommodation";
}
/**
 * An accommodation is a place that can accommodate human beings, e.g. a hotel room, a camping pitch, or a meeting room. Many accommodations are for overnight stays, but this is not a mandatory requirement. For more specific types of accommodations not defined in schema.org, one can use additionalType with external vocabularies.
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type Accommodation = AccommodationLeaf | Apartment | CampingPitch | House | Room | Suite | string;

interface AccountingServiceLeaf extends FinancialServiceBase {
    "@type": "schema:AccountingService";
}
/**
 * Accountancy business.
 *
 * As a {@link https://schema.org/LocalBusiness LocalBusiness} it can be described as a {@link https://schema.org/provider provider} of one or more {@link https://schema.org/Service Service}(s).
 */
export type AccountingService = AccountingServiceLeaf | string;

interface AchieveActionLeaf extends ActionBase {
    "@type": "schema:AchieveAction";
}
/** The act of accomplishing something via previous efforts. It is an instantaneous action rather than an ongoing process. */
export type AchieveAction = AchieveActionLeaf | LoseAction | TieAction | WinAction;

interface ActionBase extends ThingBase {
    /** Indicates the current disposition of the Action. */
    "schema:actionStatus"?: SchemaValue<ActionStatusType | IdReference, "schema:actionStatus">;
    /** The direct performer or driver of the action (animate or inanimate). e.g. _John_ wrote a book. */
    "schema:agent"?: SchemaValue<Organization | Person | IdReference, "schema:agent">;
    /**
     * The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. e.g. John wrote a book from January to _December_. For media, including audio and video, it's the time offset of the end of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:endTime"?: SchemaValue<DateTime | Time, "schema:endTime">;
    /** For failed actions, more information on the cause of the failure. */
    "schema:error"?: SchemaValue<Thing | IdReference, "schema:error">;
    /** The object that helped the agent perform the action. e.g. John wrote a book with _a pen_. */
    "schema:instrument"?: SchemaValue<Thing | IdReference, "schema:instrument">;
    /** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
    "schema:location"?: SchemaValue<Place | PostalAddress | Text | VirtualLocation | IdReference, "schema:location">;
    /** The object upon which the action is carried out, whose state is kept intact or changed. Also known as the semantic roles patient, affected or undergoer (which change their state) or theme (which doesn't). e.g. John read _a book_. */
    "schema:object"?: SchemaValue<Thing | IdReference, "schema:object">;
    /** Other co-agents that participated in the action indirectly. e.g. John wrote a book with _Steve_. */
    "schema:participant"?: SchemaValue<Organization | Person | IdReference, "schema:participant">;
    /** The result produced in the action. e.g. John wrote _a book_. */
    "schema:result"?: SchemaValue<Thing | IdReference, "schema:result">;
    /**
     * The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. e.g. John wrote a book from _January_ to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:startTime"?: SchemaValue<DateTime | Time, "schema:startTime">;
    /** Indicates a target EntryPoint for an Action. */
    "schema:target"?: SchemaValue<EntryPoint | IdReference, "schema:target">;
}
interface ActionLeaf extends ActionBase {
    "@type": "schema:Action";
}
/**
 * An action performed by a direct agent and indirect participants upon a direct object. Optionally happens at a location with the help of an inanimate instrument. The execution of the action may produce a result. Specific action sub-type documentation specifies the exact expectation of each argument/role.
 *
 * See also {@link http://blog.schema.org/2014/04/announcing-schemaorg-actions.html blog post} and {@link https://schema.org/docs/actions.html Actions overview document}.
 */
export type Action = ActionLeaf | AchieveAction | AssessAction | ConsumeAction | ControlAction | CreateAction | FindAction | InteractAction | MoveAction | OrganizeAction | PlayAction | SearchAction | SeekToAction | SolveMathAction | TradeAction | TransferAction | UIAction | UpdateAction;

interface ActionAccessSpecificationBase extends ThingBase {
    /** The end of the availability of the product or service included in the offer. */
    "schema:availabilityEnds"?: SchemaValue<Date | DateTime | Time, "schema:availabilityEnds">;
    /** The beginning of the availability of the product or service included in the offer. */
    "schema:availabilityStarts"?: SchemaValue<Date | DateTime | Time, "schema:availabilityStarts">;
    /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
    "schema:category"?: SchemaValue<PhysicalActivityCategory | Text | Thing | URL | IdReference, "schema:category">;
    /**
     * The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is valid.
     *
     * See also {@link https://schema.org/ineligibleRegion ineligibleRegion}.
     */
    "schema:eligibleRegion"?: SchemaValue<GeoShape | Place | Text | IdReference, "schema:eligibleRegion">;
    /** An Offer which must be accepted before the user can perform the Action. For example, the user may need to buy a movie before being able to watch it. */
    "schema:expectsAcceptanceOf"?: SchemaValue<Offer | IdReference, "schema:expectsAcceptanceOf">;
    /**
     * The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.
     *
     * See also {@link https://schema.org/eligibleRegion eligibleRegion}.
     */
    "schema:ineligibleRegion"?: SchemaValue<GeoShape | Place | Text | IdReference, "schema:ineligibleRegion">;
    /** Indicates if use of the media require a subscription (either paid or free). Allowed values are `true` or `false` (note that an earlier version had 'yes', 'no'). */
    "schema:requiresSubscription"?: SchemaValue<Boolean | MediaSubscription | IdReference, "schema:requiresSubscription">;
}
interface ActionAccessSpecificationLeaf extends ActionAccessSpecificationBase {
    "@type": "schema:ActionAccessSpecification";
}
/** A set of requirements that a must be fulfilled in order to perform an Action. */
export type ActionAccessSpecification = ActionAccessSpecificationLeaf;

interface ActionStatusTypeLeaf extends EnumerationBase {
    "@type": "schema:ActionStatusType";
}
/** The status of an Action. */
export type ActionStatusType = "https://schema.org/ActiveActionStatus" | "schema:ActiveActionStatus" | "https://schema.org/CompletedActionStatus" | "schema:CompletedActionStatus" | "https://schema.org/FailedActionStatus" | "schema:FailedActionStatus" | "https://schema.org/PotentialActionStatus" | "schema:PotentialActionStatus" | ActionStatusTypeLeaf;

interface ActivateActionLeaf extends ActionBase {
    "@type": "schema:ActivateAction";
}
/** The act of starting or activating a device or application (e.g. starting a timer or turning on a flashlight). */
export type ActivateAction = ActivateActionLeaf;

interface AddActionLeaf extends UpdateActionBase {
    "@type": "schema:AddAction";
}
/** The act of editing by adding an object to a collection. */
export type AddAction = AddActionLeaf | InsertAction;

interface AdministrativeAreaLeaf extends PlaceBase {
    "@type": "schema:AdministrativeArea";
}
/** A geographical region, typically under the jurisdiction of a particular government. */
export type AdministrativeArea = AdministrativeAreaLeaf | City | Country | SchoolDistrict | State | string;

interface AdultEntertainmentLeaf extends LocalBusinessBase {
    "@type": "schema:AdultEntertainment";
}
/** An adult entertainment establishment. */
export type AdultEntertainment = AdultEntertainmentLeaf | string;

interface AdvertiserContentArticleLeaf extends ArticleBase {
    "@type": "schema:AdvertiserContentArticle";
}
/** An {@link https://schema.org/Article Article} that an external entity has paid to place or to produce to its specifications. Includes {@link https://en.wikipedia.org/wiki/Advertorial advertorials}, sponsored content, native advertising and other paid content. */
export type AdvertiserContentArticle = AdvertiserContentArticleLeaf;

interface AggregateOfferBase extends OfferBase {
    /**
     * The highest price of all offers available.
     *
     * Usage guidelines:
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     */
    "schema:highPrice"?: SchemaValue<Number | Text, "schema:highPrice">;
    /**
     * The lowest price of all offers available.
     *
     * Usage guidelines:
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     */
    "schema:lowPrice"?: SchemaValue<Number | Text, "schema:lowPrice">;
    /** The number of offers for the product. */
    "schema:offerCount"?: SchemaValue<Integer, "schema:offerCount">;
    /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use {@link https://schema.org/businessFunction businessFunction} to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a {@link https://schema.org/Demand Demand}. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:offers"?: SchemaValue<Demand | Offer | IdReference, "schema:offers">;
}
interface AggregateOfferLeaf extends AggregateOfferBase {
    "@type": "schema:AggregateOffer";
}
/**
 * When a single product is associated with multiple offers (for example, the same pair of shoes is offered by different merchants), then AggregateOffer can be used.
 *
 * Note: AggregateOffers are normally expected to associate multiple offers that all share the same defined {@link https://schema.org/businessFunction businessFunction} value, or default to http://purl.org/goodrelations/v1#Sell if businessFunction is not explicitly defined.
 */
export type AggregateOffer = AggregateOfferLeaf;

interface AggregateRatingBase extends RatingBase {
    /** The item that is being reviewed/rated. */
    "schema:itemReviewed"?: SchemaValue<Thing | IdReference, "schema:itemReviewed">;
    /** The count of total number of ratings. */
    "schema:ratingCount"?: SchemaValue<Integer, "schema:ratingCount">;
    /** The count of total number of reviews. */
    "schema:reviewCount"?: SchemaValue<Integer, "schema:reviewCount">;
}
interface AggregateRatingLeaf extends AggregateRatingBase {
    "@type": "schema:AggregateRating";
}
/** The average rating based on multiple ratings or reviews. */
export type AggregateRating = AggregateRatingLeaf | EmployerAggregateRating;

interface AgreeActionLeaf extends ActionBase {
    "@type": "schema:AgreeAction";
}
/** The act of expressing a consistency of opinion with the object. An agent agrees to/about an object (a proposition, topic or theme) with participants. */
export type AgreeAction = AgreeActionLeaf;

interface AirlineBase extends OrganizationBase {
    /** The type of boarding policy used by the airline (e.g. zone-based or group-based). */
    "schema:boardingPolicy"?: SchemaValue<BoardingPolicyType | IdReference, "schema:boardingPolicy">;
    /** IATA identifier for an airline or airport. */
    "schema:iataCode"?: SchemaValue<Text, "schema:iataCode">;
}
interface AirlineLeaf extends AirlineBase {
    "@type": "schema:Airline";
}
/** An organization that provides flights for passengers. */
export type Airline = AirlineLeaf | string;

interface AirportBase extends CivicStructureBase {
    /** IATA identifier for an airline or airport. */
    "schema:iataCode"?: SchemaValue<Text, "schema:iataCode">;
    /** ICAO identifier for an airport. */
    "schema:icaoCode"?: SchemaValue<Text, "schema:icaoCode">;
}
interface AirportLeaf extends AirportBase {
    "@type": "schema:Airport";
}
/** An airport. */
export type Airport = AirportLeaf | string;

interface AlertLeaf extends ElementBase {
    "@type": "uxi:Alert";
}
/** Alerts notify the user that an expected event has happend or is about to happen. Common examples are price alerts or alerts to check in or board a flight */
export type Alert = AlertLeaf;

interface AlignActionLeaf extends UIActionBase {
    "@type": "uxi:AlignAction";
}
/** A user action to align content to a constraint or 'proper' position. This can mean left- or right-align, to the center or another visual guide */
export type AlignAction = AlignActionLeaf;

interface AlignmentObjectBase extends ThingBase {
    /** A category of alignment between the learning resource and the framework node. Recommended values include: 'requires', 'textComplexity', 'readingLevel', and 'educationalSubject'. */
    "schema:alignmentType"?: SchemaValue<Text, "schema:alignmentType">;
    /** The framework to which the resource being described is aligned. */
    "schema:educationalFramework"?: SchemaValue<Text, "schema:educationalFramework">;
    /** The description of a node in an established educational framework. */
    "schema:targetDescription"?: SchemaValue<Text, "schema:targetDescription">;
    /** The name of a node in an established educational framework. */
    "schema:targetName"?: SchemaValue<Text, "schema:targetName">;
    /** The URL of a node in an established educational framework. */
    "schema:targetUrl"?: SchemaValue<URL, "schema:targetUrl">;
}
interface AlignmentObjectLeaf extends AlignmentObjectBase {
    "@type": "schema:AlignmentObject";
}
/**
 * An intangible item that describes an alignment between a learning resource and a node in an educational framework.
 *
 * Should not be used where the nature of the alignment can be described using a simple property, for example to express that a resource {@link https://schema.org/teaches teaches} or {@link https://schema.org/assesses assesses} a competency.
 */
export type AlignmentObject = AlignmentObjectLeaf;

interface AllocateActionLeaf extends ActionBase {
    "@type": "schema:AllocateAction";
}
/** The act of organizing tasks/objects/events by associating resources to it. */
export type AllocateAction = AllocateActionLeaf | AcceptAction | AssignAction | AuthorizeAction | RejectAction;

interface AmpStoryLeaf extends CreativeWorkBase {
    "@type": "schema:AmpStory";
}
/** A creative work with a visual storytelling format intended to be viewed online, particularly on mobile devices. */
export type AmpStory = AmpStoryLeaf;

interface AMRadioChannelLeaf extends BroadcastChannelBase {
    "@type": "schema:AMRadioChannel";
}
/** A radio channel that uses AM. */
export type AMRadioChannel = AMRadioChannelLeaf;

interface AmusementParkLeaf extends LocalBusinessBase {
    "@type": "schema:AmusementPark";
}
/** An amusement park. */
export type AmusementPark = AmusementParkLeaf | string;

interface AnalysisNewsArticleLeaf extends NewsArticleBase {
    "@type": "schema:AnalysisNewsArticle";
}
/** An AnalysisNewsArticle is a {@link https://schema.org/NewsArticle NewsArticle} that, while based on factual reporting, incorporates the expertise of the author/producer, offering interpretations and conclusions. */
export type AnalysisNewsArticle = AnalysisNewsArticleLeaf;

interface AnatomicalStructureBase extends MedicalEntityBase {
    /** If applicable, a description of the pathophysiology associated with the anatomical system, including potential abnormal changes in the mechanical, physical, and biochemical functions of the system. */
    "schema:associatedPathophysiology"?: SchemaValue<Text, "schema:associatedPathophysiology">;
    /** Location in the body of the anatomical structure. */
    "schema:bodyLocation"?: SchemaValue<Text, "schema:bodyLocation">;
    /** Other anatomical structures to which this structure is connected. */
    "schema:connectedTo"?: SchemaValue<AnatomicalStructure | IdReference, "schema:connectedTo">;
    /** An image containing a diagram that illustrates the structure and/or its component substructures and/or connections with other structures. */
    "schema:diagram"?: SchemaValue<ImageObject | IdReference, "schema:diagram">;
    /** The anatomical or organ system that this structure is part of. */
    "schema:partOfSystem"?: SchemaValue<AnatomicalSystem | IdReference, "schema:partOfSystem">;
    /** A medical condition associated with this anatomy. */
    "schema:relatedCondition"?: SchemaValue<MedicalCondition | IdReference, "schema:relatedCondition">;
    /** A medical therapy related to this anatomy. */
    "schema:relatedTherapy"?: SchemaValue<MedicalTherapy | IdReference, "schema:relatedTherapy">;
    /** Component (sub-)structure(s) that comprise this anatomical structure. */
    "schema:subStructure"?: SchemaValue<AnatomicalStructure | IdReference, "schema:subStructure">;
}
interface AnatomicalStructureLeaf extends AnatomicalStructureBase {
    "@type": "schema:AnatomicalStructure";
}
/** Any part of the human body, typically a component of an anatomical system. Organs, tissues, and cells are all anatomical structures. */
export type AnatomicalStructure = AnatomicalStructureLeaf | Bone | BrainStructure | Joint | Ligament | Muscle | Nerve | Vessel;

interface AnatomicalSystemBase extends MedicalEntityBase {
    /** If applicable, a description of the pathophysiology associated with the anatomical system, including potential abnormal changes in the mechanical, physical, and biochemical functions of the system. */
    "schema:associatedPathophysiology"?: SchemaValue<Text, "schema:associatedPathophysiology">;
    /** Specifying something physically contained by something else. Typically used here for the underlying anatomical structures, such as organs, that comprise the anatomical system. */
    "schema:comprisedOf"?: SchemaValue<AnatomicalStructure | AnatomicalSystem | IdReference, "schema:comprisedOf">;
    /** A medical condition associated with this anatomy. */
    "schema:relatedCondition"?: SchemaValue<MedicalCondition | IdReference, "schema:relatedCondition">;
    /** Related anatomical structure(s) that are not part of the system but relate or connect to it, such as vascular bundles associated with an organ system. */
    "schema:relatedStructure"?: SchemaValue<AnatomicalStructure | IdReference, "schema:relatedStructure">;
    /** A medical therapy related to this anatomy. */
    "schema:relatedTherapy"?: SchemaValue<MedicalTherapy | IdReference, "schema:relatedTherapy">;
}
interface AnatomicalSystemLeaf extends AnatomicalSystemBase {
    "@type": "schema:AnatomicalSystem";
}
/** An anatomical system is a group of anatomical structures that work together to perform a certain task. Anatomical systems, such as organ systems, are one organizing principle of anatomy, and can includes circulatory, digestive, endocrine, integumentary, immune, lymphatic, muscular, nervous, reproductive, respiratory, skeletal, urinary, vestibular, and other systems. */
export type AnatomicalSystem = AnatomicalSystemLeaf;

interface AnimalShelterLeaf extends LocalBusinessBase {
    "@type": "schema:AnimalShelter";
}
/** Animal shelter. */
export type AnimalShelter = AnimalShelterLeaf | string;

interface AnnotateActionLeaf extends UIActionBase {
    "@type": "uxi:AnnotateAction";
}
/** An annotate action is similar to a mark action, only that it adds more information about why the media part has been marked. E.g. comments, stickers over video, reader-highlights in a blogpost, etc. */
export type AnnotateAction = AnnotateActionLeaf;

interface AnswerBase extends CommentBase {
    /** A step-by-step or full explanation about Answer. Can outline how this Answer was achieved or contain more broad clarification or statement about it. */
    "schema:answerExplanation"?: SchemaValue<Comment | WebContent | IdReference, "schema:answerExplanation">;
}
interface AnswerLeaf extends AnswerBase {
    "@type": "schema:Answer";
}
/** An answer offered to a question; perhaps correct, perhaps opinionated or wrong. */
export type Answer = AnswerLeaf;

interface ApartmentBase extends AccommodationBase {
    /** The number of rooms (excluding bathrooms and closets) of the accommodation or lodging business. Typical unit code(s): ROM for room or C62 for no unit. The type of room can be put in the unitText property of the QuantitativeValue. */
    "schema:numberOfRooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfRooms">;
    /** The allowed total occupancy for the accommodation in persons (including infants etc). For individual accommodations, this is not necessarily the legal maximum but defines the permitted usage as per the contractual agreement (e.g. a double room used by a single person). Typical unit code(s): C62 for person */
    "schema:occupancy"?: SchemaValue<QuantitativeValue | IdReference, "schema:occupancy">;
}
interface ApartmentLeaf extends ApartmentBase {
    "@type": "schema:Apartment";
}
/** An apartment (in American English) or flat (in British English) is a self-contained housing unit (a type of residential real estate) that occupies only part of a building (Source: Wikipedia, the free encyclopedia, see {@link http://en.wikipedia.org/wiki/Apartment http://en.wikipedia.org/wiki/Apartment}). */
export type Apartment = ApartmentLeaf | string;

interface ApartmentComplexBase extends ResidenceBase {
    /** Indicates the total (available plus unavailable) number of accommodation units in an {@link https://schema.org/ApartmentComplex ApartmentComplex}, or the number of accommodation units for a specific {@link https://schema.org/FloorPlan FloorPlan} (within its specific {@link https://schema.org/ApartmentComplex ApartmentComplex}). See also {@link https://schema.org/numberOfAvailableAccommodationUnits numberOfAvailableAccommodationUnits}. */
    "schema:numberOfAccommodationUnits"?: SchemaValue<QuantitativeValue | IdReference, "schema:numberOfAccommodationUnits">;
    /** Indicates the number of available accommodation units in an {@link https://schema.org/ApartmentComplex ApartmentComplex}, or the number of accommodation units for a specific {@link https://schema.org/FloorPlan FloorPlan} (within its specific {@link https://schema.org/ApartmentComplex ApartmentComplex}). See also {@link https://schema.org/numberOfAccommodationUnits numberOfAccommodationUnits}. */
    "schema:numberOfAvailableAccommodationUnits"?: SchemaValue<QuantitativeValue | IdReference, "schema:numberOfAvailableAccommodationUnits">;
    /** The total integer number of bedrooms in a some {@link https://schema.org/Accommodation Accommodation}, {@link https://schema.org/ApartmentComplex ApartmentComplex} or {@link https://schema.org/FloorPlan FloorPlan}. */
    "schema:numberOfBedrooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfBedrooms">;
    /** Indicates whether pets are allowed to enter the accommodation or lodging business. More detailed information can be put in a text value. */
    "schema:petsAllowed"?: SchemaValue<Boolean | Text, "schema:petsAllowed">;
    /** A page providing information on how to book a tour of some {@link https://schema.org/Place Place}, such as an {@link https://schema.org/Accommodation Accommodation} or {@link https://schema.org/ApartmentComplex ApartmentComplex} in a real estate setting, as well as other kinds of tours as appropriate. */
    "schema:tourBookingPage"?: SchemaValue<URL, "schema:tourBookingPage">;
}
interface ApartmentComplexLeaf extends ApartmentComplexBase {
    "@type": "schema:ApartmentComplex";
}
/** Residence type: Apartment complex. */
export type ApartmentComplex = ApartmentComplexLeaf | string;

interface APIReferenceBase extends TechArticleBase {
    /**
     * Library file name e.g., mscorlib.dll, system.web.dll.
     *
     * @deprecated Consider using https://schema.org/executableLibraryName instead.
     */
    "schema:assembly"?: SchemaValue<Text, "schema:assembly">;
    /** Associated product/technology version. e.g., .NET Framework 4.5. */
    "schema:assemblyVersion"?: SchemaValue<Text, "schema:assemblyVersion">;
    /** Library file name e.g., mscorlib.dll, system.web.dll. */
    "schema:executableLibraryName"?: SchemaValue<Text, "schema:executableLibraryName">;
    /** Indicates whether API is managed or unmanaged. */
    "schema:programmingModel"?: SchemaValue<Text, "schema:programmingModel">;
    /** Type of app development: phone, Metro style, desktop, XBox, etc. */
    "schema:targetPlatform"?: SchemaValue<Text, "schema:targetPlatform">;
}
interface APIReferenceLeaf extends APIReferenceBase {
    "@type": "schema:APIReference";
}
/** Reference documentation for application programming interfaces (APIs). */
export type APIReference = APIReferenceLeaf;

interface AppendActionLeaf extends InsertActionBase {
    "@type": "schema:AppendAction";
}
/** The act of inserting at the end if an ordered collection. */
export type AppendAction = AppendActionLeaf;

interface ApplyActionLeaf extends ActionBase {
    "@type": "schema:ApplyAction";
}
/**
 * The act of registering to an organization/service without the guarantee to receive it.
 *
 * Related actions:
 * - {@link https://schema.org/RegisterAction RegisterAction}: Unlike RegisterAction, ApplyAction has no guarantees that the application will be accepted.
 */
export type ApplyAction = ApplyActionLeaf;

interface ApprovedIndicationLeaf extends MedicalEntityBase {
    "@type": "schema:ApprovedIndication";
}
/** An indication for a medical therapy that has been formally specified or approved by a regulatory body that regulates use of the therapy; for example, the US FDA approves indications for most drugs in the US. */
export type ApprovedIndication = ApprovedIndicationLeaf;

interface AquariumLeaf extends CivicStructureBase {
    "@type": "schema:Aquarium";
}
/** Aquarium. */
export type Aquarium = AquariumLeaf | string;

interface ArchiveComponentBase extends CreativeWorkBase {
    /** {@link https://schema.org/ArchiveOrganization ArchiveOrganization} that holds, keeps or maintains the {@link https://schema.org/ArchiveComponent ArchiveComponent}. */
    "schema:holdingArchive"?: SchemaValue<ArchiveOrganization | IdReference, "schema:holdingArchive">;
    /** Current location of the item. */
    "schema:itemLocation"?: SchemaValue<Place | PostalAddress | Text | IdReference, "schema:itemLocation">;
}
interface ArchiveComponentLeaf extends ArchiveComponentBase {
    "@type": "schema:ArchiveComponent";
}
/** An intangible type to be applied to any archive content, carrying with it a set of properties required to describe archival items and collections. */
export type ArchiveComponent = ArchiveComponentLeaf;

interface ArchiveOrganizationBase extends LocalBusinessBase {
    /** Collection, {@link https://en.wikipedia.org/wiki/Fonds fonds}, or item held, kept or maintained by an {@link https://schema.org/ArchiveOrganization ArchiveOrganization}. */
    "schema:archiveHeld"?: SchemaValue<ArchiveComponent | IdReference, "schema:archiveHeld">;
}
interface ArchiveOrganizationLeaf extends ArchiveOrganizationBase {
    "@type": "schema:ArchiveOrganization";
}
/** An organization with archival holdings. An organization which keeps and preserves archival material and typically makes it accessible to the public. */
export type ArchiveOrganization = ArchiveOrganizationLeaf | string;

interface ArriveActionLeaf extends MoveActionBase {
    "@type": "schema:ArriveAction";
}
/** The act of arriving at a place. An agent arrives at a destination from a fromLocation, optionally with participants. */
export type ArriveAction = ArriveActionLeaf;

interface ArteryBase extends AnatomicalStructureBase {
    /** The branches that comprise the arterial structure. */
    "schema:arterialBranch"?: SchemaValue<AnatomicalStructure | IdReference, "schema:arterialBranch">;
    /** The area to which the artery supplies blood. */
    "schema:supplyTo"?: SchemaValue<AnatomicalStructure | IdReference, "schema:supplyTo">;
}
interface ArteryLeaf extends ArteryBase {
    "@type": "schema:Artery";
}
/** A type of blood vessel that specifically carries blood away from the heart. */
export type Artery = ArteryLeaf;

interface ArtGalleryLeaf extends LocalBusinessBase {
    "@type": "schema:ArtGallery";
}
/** An art gallery. */
export type ArtGallery = ArtGalleryLeaf | string;

interface ArticleBase extends CreativeWorkBase {
    /** The actual body of the article. */
    "schema:articleBody"?: SchemaValue<Text, "schema:articleBody">;
    /** Articles may belong to one or more 'sections' in a magazine or newspaper, such as Sports, Lifestyle, etc. */
    "schema:articleSection"?: SchemaValue<Text, "schema:articleSection">;
    /** For an {@link https://schema.org/Article Article}, typically a {@link https://schema.org/NewsArticle NewsArticle}, the backstory property provides a textual summary giving a brief explanation of why and how an article was created. In a journalistic setting this could include information about reporting process, methods, interviews, data sources, etc. */
    "schema:backstory"?: SchemaValue<CreativeWork | Text | IdReference, "schema:backstory">;
    /** The page on which the work ends; for example "138" or "xvi". */
    "schema:pageEnd"?: SchemaValue<Integer | Text, "schema:pageEnd">;
    /** The page on which the work starts; for example "135" or "xiii". */
    "schema:pageStart"?: SchemaValue<Integer | Text, "schema:pageStart">;
    /** Any description of pages that is not separated into pageStart and pageEnd; for example, "1-6, 9, 55" or "10-12, 46-49". */
    "schema:pagination"?: SchemaValue<Text, "schema:pagination">;
    /**
     * Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech.
     *
     * The _speakable_ property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values:
     *
     * 1.) _id-value_ URL references - uses _id-value_ of an element in the page being annotated. The simplest use of _speakable_ has (potentially relative) URL values, referencing identified sections of the document concerned.
     *
     * 2.) CSS Selectors - addresses content in the annotated page, eg. via class attribute. Use the {@link https://schema.org/cssSelector cssSelector} property.
     *
     * 3.) XPaths - addresses content via XPaths (assuming an XML view of the content). Use the {@link https://schema.org/xpath xpath} property.
     *
     * For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, {@link https://schema.org/SpeakableSpecification SpeakableSpecification} which is defined to be a possible value of the _speakable_ property.
     */
    "schema:speakable"?: SchemaValue<SpeakableSpecification | URL | IdReference, "schema:speakable">;
    /** The number of words in the text of the Article. */
    "schema:wordCount"?: SchemaValue<Integer, "schema:wordCount">;
}
interface ArticleLeaf extends ArticleBase {
    "@type": "schema:Article";
}
/**
 * An article, such as a news article or piece of investigative report. Newspapers and magazines have articles of many different types and this is intended to cover them all.
 *
 * See also {@link http://blog.schema.org/2014/09/schemaorg-support-for-bibliographic_2.html blog post}.
 */
export type Article = ArticleLeaf | AdvertiserContentArticle | NewsArticle | Report | SatiricalArticle | ScholarlyArticle | SocialMediaPosting | TechArticle;

interface AskActionBase extends CommunicateActionBase {
    /** A sub property of object. A question. */
    "schema:question"?: SchemaValue<Question | IdReference, "schema:question">;
}
interface AskActionLeaf extends AskActionBase {
    "@type": "schema:AskAction";
}
/**
 * The act of posing a question / favor to someone.
 *
 * Related actions:
 * - {@link https://schema.org/ReplyAction ReplyAction}: Appears generally as a response to AskAction.
 */
export type AskAction = AskActionLeaf;

interface AskPublicNewsArticleLeaf extends NewsArticleBase {
    "@type": "schema:AskPublicNewsArticle";
}
/** A {@link https://schema.org/NewsArticle NewsArticle} expressing an open call by a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization} asking the public for input, insights, clarifications, anecdotes, documentation, etc., on an issue, for reporting purposes. */
export type AskPublicNewsArticle = AskPublicNewsArticleLeaf;

interface AssessActionLeaf extends ActionBase {
    "@type": "schema:AssessAction";
}
/** The act of forming one's opinion, reaction or sentiment. */
export type AssessAction = AssessActionLeaf | ChooseAction | IgnoreAction | ReactAction | ReviewAction;

interface AssignActionLeaf extends ActionBase {
    "@type": "schema:AssignAction";
}
/** The act of allocating an action/event/task to some destination (someone or something). */
export type AssignAction = AssignActionLeaf;

interface AtlasLeaf extends CreativeWorkBase {
    "@type": "schema:Atlas";
}
/** A collection or bound volume of maps, charts, plates or tables, physical or in media form illustrating any subject. */
export type Atlas = AtlasLeaf;

interface AtomUIElementLeaf extends UIElementBase {
    "@type": "uxi:AtomUIElement";
}
/** An Atom UI element is the smallest element as understood by the Atomic Design Methodology. Atoms can't be broken down any further, so these UI elements constitute the smallest building block: https://atomicdesign.bradfrost.com */
export type AtomUIElement = AtomUIElementLeaf | Avatar | Button | Checkbox | Datepicker | Heading | Icon | InputElement | Label | Link | Radiobutton | Shape | Subheading | Subtitle | Switch | Textfield | Timepicker | Title;

interface AttorneyLeaf extends LocalBusinessBase {
    "@type": "schema:Attorney";
}
/**
 * Professional service: Attorney.
 *
 * This type is deprecated - {@link https://schema.org/LegalService LegalService} is more inclusive and less ambiguous.
 */
export type Attorney = AttorneyLeaf | string;

interface AudienceBase extends ThingBase {
    /** The target group associated with a given audience (e.g. veterans, car owners, musicians, etc.). */
    "schema:audienceType"?: SchemaValue<Text, "schema:audienceType">;
    /** The geographic area associated with the audience. */
    "schema:geographicArea"?: SchemaValue<AdministrativeArea | IdReference, "schema:geographicArea">;
}
interface AudienceLeaf extends AudienceBase {
    "@type": "schema:Audience";
}
/** Intended audience for an item, i.e. the group for whom the item was created. */
export type Audience = AudienceLeaf | BusinessAudience | EducationalAudience | MedicalAudience | PeopleAudience | Researcher;

interface AudiobookBase extends AudioObjectBase, BookBase {
    /** The duration of the item (movie, audio recording, event, etc.) in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    "schema:duration"?: SchemaValue<Duration | IdReference, "schema:duration">;
    /** A person who reads (performs) the audiobook. */
    "schema:readBy"?: SchemaValue<Person | IdReference, "schema:readBy">;
}
interface AudiobookLeaf extends AudiobookBase {
    "@type": "schema:Audiobook";
}
/** An audiobook. */
export type Audiobook = AudiobookLeaf;

interface AudioObjectBase extends MediaObjectBase {
    /** The caption for this object. For downloadable machine formats (closed caption, subtitles etc.) use MediaObject and indicate the {@link https://schema.org/encodingFormat encodingFormat}. */
    "schema:caption"?: SchemaValue<MediaObject | Text | IdReference, "schema:caption">;
    /** Represents textual captioning from a {@link https://schema.org/MediaObject MediaObject}, e.g. text of a 'meme'. */
    "schema:embeddedTextCaption"?: SchemaValue<Text, "schema:embeddedTextCaption">;
    /** If this MediaObject is an AudioObject or VideoObject, the transcript of that object. */
    "schema:transcript"?: SchemaValue<Text, "schema:transcript">;
}
interface AudioObjectLeaf extends AudioObjectBase {
    "@type": "schema:AudioObject";
}
/** An audio file. */
export type AudioObject = AudioObjectLeaf | Audiobook | AudioObjectSnapshot;

interface AudioObjectSnapshotLeaf extends AudioObjectBase {
    "@type": "schema:AudioObjectSnapshot";
}
/** A specific and exact (byte-for-byte) version of an {@link https://schema.org/AudioObject AudioObject}. Two byte-for-byte identical files, for the purposes of this type, considered identical. If they have different embedded metadata the files will differ. Different external facts about the files, e.g. creator or dateCreated that aren't represented in their actual content, do not affect this notion of identity. */
export type AudioObjectSnapshot = AudioObjectSnapshotLeaf;

interface AuthorizeActionBase extends ActionBase {
    /** A sub property of participant. The participant who is at the receiving end of the action. */
    "schema:recipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:recipient">;
}
interface AuthorizeActionLeaf extends AuthorizeActionBase {
    "@type": "schema:AuthorizeAction";
}
/** The act of granting permission to an object. */
export type AuthorizeAction = AuthorizeActionLeaf;

interface AutoBodyShopLeaf extends LocalBusinessBase {
    "@type": "schema:AutoBodyShop";
}
/** Auto body shop. */
export type AutoBodyShop = AutoBodyShopLeaf | string;

interface AutocompleteLeaf extends ElementBase {
    "@type": "uxi:Autocomplete";
}
/** Autocomplete is a Structural Element that is most commonly used with search bars, showing longer text after a short user input text. When the user input is likely imperfect or can only match a number of values, auto-correcting saves effort for cleaning data. Examples would be converting pen strokes to common shapes in a design tool or code completion in a coding tool (IDE). */
export type Autocomplete = AutocompleteLeaf;

interface AutoDealerLeaf extends LocalBusinessBase {
    "@type": "schema:AutoDealer";
}
/** An car dealership. */
export type AutoDealer = AutoDealerLeaf | string;

interface AutomatedTellerLeaf extends FinancialServiceBase {
    "@type": "schema:AutomatedTeller";
}
/** ATM/cash machine. */
export type AutomatedTeller = AutomatedTellerLeaf | string;

interface AutomotiveBusinessLeaf extends LocalBusinessBase {
    "@type": "schema:AutomotiveBusiness";
}
/** Car repair, sales, or parts. */
export type AutomotiveBusiness = AutomotiveBusinessLeaf | AutoBodyShop | AutoDealer | AutoPartsStore | AutoRental | AutoRepair | AutoWash | GasStation | MotorcycleDealer | MotorcycleRepair | string;

interface AutoPartsStoreBase extends LocalBusinessBase, LocalBusinessBase {
}
interface AutoPartsStoreLeaf extends AutoPartsStoreBase {
    "@type": "schema:AutoPartsStore";
}
/** An auto parts store. */
export type AutoPartsStore = AutoPartsStoreLeaf | string;

interface AutoRentalLeaf extends LocalBusinessBase {
    "@type": "schema:AutoRental";
}
/** A car rental business. */
export type AutoRental = AutoRentalLeaf | string;

interface AutoRepairLeaf extends LocalBusinessBase {
    "@type": "schema:AutoRepair";
}
/** Car repair business. */
export type AutoRepair = AutoRepairLeaf | string;

interface AutoWashLeaf extends LocalBusinessBase {
    "@type": "schema:AutoWash";
}
/** A car wash business. */
export type AutoWash = AutoWashLeaf | string;

interface AvatarLeaf extends UIElementBase {
    "@type": "uxi:Avatar";
}
/** An Avatar is a UI element to visually represent a user, business or organization with a single image or icon. They often frame that image in a way that makes it easy to distinguish from other icons. Avatars can also contain user's initials, a colour, or an auto-generated Avatar if none has been set. They're often combined with indicators for activity or status. */
export type Avatar = AvatarLeaf;

interface BackActionLeaf extends UIActionBase {
    "@type": "uxi:BackAction";
}
/** A user action to take a step back in the navigation history or hierarchy. Not to be confused with undo/redo, which modifies the content. In mobile apps, it's often used to move up in the navigation hierarchy, back to the main menu */
export type BackAction = BackActionLeaf;

interface BackgroundNewsArticleLeaf extends NewsArticleBase {
    "@type": "schema:BackgroundNewsArticle";
}
/** A {@link https://schema.org/NewsArticle NewsArticle} providing historical context, definition and detail on a specific topic (aka "explainer" or "backgrounder"). For example, an in-depth article or frequently-asked-questions ({@link https://en.wikipedia.org/wiki/FAQ FAQ}) document on topics such as Climate Change or the European Union. Other kinds of background material from a non-news setting are often described using {@link https://schema.org/Book Book} or {@link https://schema.org/Article Article}, in particular {@link https://schema.org/ScholarlyArticle ScholarlyArticle}. See also {@link https://schema.org/NewsArticle NewsArticle} for related vocabulary from a learning/education perspective. */
export type BackgroundNewsArticle = BackgroundNewsArticleLeaf;

interface BakeryLeaf extends FoodEstablishmentBase {
    "@type": "schema:Bakery";
}
/** A bakery. */
export type Bakery = BakeryLeaf | string;

interface BankAccountBase extends FinancialProductBase {
    /** A minimum amount that has to be paid in every month. */
    "schema:accountMinimumInflow"?: SchemaValue<MonetaryAmount | IdReference, "schema:accountMinimumInflow">;
    /** An overdraft is an extension of credit from a lending institution when an account reaches zero. An overdraft allows the individual to continue withdrawing money even if the account has no funds in it. Basically the bank allows people to borrow a set amount of money. */
    "schema:accountOverdraftLimit"?: SchemaValue<MonetaryAmount | IdReference, "schema:accountOverdraftLimit">;
    /** The type of a bank account. */
    "schema:bankAccountType"?: SchemaValue<Text | URL, "schema:bankAccountType">;
}
interface BankAccountLeaf extends BankAccountBase {
    "@type": "schema:BankAccount";
}
/** A product or service offered by a bank whereby one may deposit, withdraw or transfer money and in some cases be paid interest. */
export type BankAccount = BankAccountLeaf | DepositAccount;

interface BankOrCreditUnionLeaf extends FinancialServiceBase {
    "@type": "schema:BankOrCreditUnion";
}
/** Bank or credit union. */
export type BankOrCreditUnion = BankOrCreditUnionLeaf | string;

interface BarcodeLeaf extends ImageObjectBase {
    "@type": "schema:Barcode";
}
/** An image of a visual machine-readable code such as a barcode or QR code. */
export type Barcode = BarcodeLeaf;

interface BarOrPubLeaf extends FoodEstablishmentBase {
    "@type": "schema:BarOrPub";
}
/** A bar or pub. */
export type BarOrPub = BarOrPubLeaf | string;

interface BeachLeaf extends CivicStructureBase {
    "@type": "schema:Beach";
}
/** Beach. */
export type Beach = BeachLeaf | string;

interface BeautySalonLeaf extends LocalBusinessBase {
    "@type": "schema:BeautySalon";
}
/** Beauty salon. */
export type BeautySalon = BeautySalonLeaf | string;

interface BedAndBreakfastLeaf extends LodgingBusinessBase {
    "@type": "schema:BedAndBreakfast";
}
/**
 * Bed and breakfast.
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type BedAndBreakfast = BedAndBreakfastLeaf | string;

interface BedDetailsBase extends ThingBase {
    /** The quantity of the given bed type available in the HotelRoom, Suite, House, or Apartment. */
    "schema:numberOfBeds"?: SchemaValue<Number, "schema:numberOfBeds">;
    /** The type of bed to which the BedDetail refers, i.e. the type of bed available in the quantity indicated by quantity. */
    "schema:typeOfBed"?: SchemaValue<BedType | Text | IdReference, "schema:typeOfBed">;
}
interface BedDetailsLeaf extends BedDetailsBase {
    "@type": "schema:BedDetails";
}
/** An entity holding detailed information about the available bed types, e.g. the quantity of twin beds for a hotel room. For the single case of just one bed of a certain type, you can use bed directly with a text. See also {@link https://schema.org/BedType BedType} (under development). */
export type BedDetails = BedDetailsLeaf;

interface BedTypeLeaf extends QualitativeValueBase {
    "@type": "schema:BedType";
}
/** A type of bed. This is used for indicating the bed or beds available in an accommodation. */
export type BedType = BedTypeLeaf;

interface BefriendActionLeaf extends ActionBase {
    "@type": "schema:BefriendAction";
}
/**
 * The act of forming a personal connection with someone (object) mutually/bidirectionally/symmetrically.
 *
 * Related actions:
 * - {@link https://schema.org/FollowAction FollowAction}: Unlike FollowAction, BefriendAction implies that the connection is reciprocal.
 */
export type BefriendAction = BefriendActionLeaf;

interface BikeStoreLeaf extends LocalBusinessBase {
    "@type": "schema:BikeStore";
}
/** A bike store. */
export type BikeStore = BikeStoreLeaf | string;

interface BioChemEntityBase extends ThingBase {
    /** Disease associated to this BioChemEntity. Such disease can be a MedicalCondition or a URL. If you want to add an evidence supporting the association, please use PropertyValue. */
    "schema:associatedDisease"?: SchemaValue<MedicalCondition | PropertyValue | URL | IdReference, "schema:associatedDisease">;
    /** A BioChemEntity that is known to interact with this item. */
    "schema:bioChemInteraction"?: SchemaValue<BioChemEntity | IdReference, "schema:bioChemInteraction">;
    /** A similar BioChemEntity, e.g., obtained by fingerprint similarity algorithms. */
    "schema:bioChemSimilarity"?: SchemaValue<BioChemEntity | IdReference, "schema:bioChemSimilarity">;
    /** A role played by the BioChemEntity within a biological context. */
    "schema:biologicalRole"?: SchemaValue<DefinedTerm | IdReference, "schema:biologicalRole">;
    /** Indicates a BioChemEntity that (in some sense) has this BioChemEntity as a part. */
    "schema:hasBioChemEntityPart"?: SchemaValue<BioChemEntity | IdReference, "schema:hasBioChemEntityPart">;
    /** Molecular function performed by this BioChemEntity; please use PropertyValue if you want to include any evidence. */
    "schema:hasMolecularFunction"?: SchemaValue<DefinedTerm | PropertyValue | URL | IdReference, "schema:hasMolecularFunction">;
    /** A common representation such as a protein sequence or chemical structure for this entity. For images use schema.org/image. */
    "schema:hasRepresentation"?: SchemaValue<PropertyValue | Text | URL | IdReference, "schema:hasRepresentation">;
    /** Another BioChemEntity encoding by this one. */
    "schema:isEncodedByBioChemEntity"?: SchemaValue<Gene | IdReference, "schema:isEncodedByBioChemEntity">;
    /** Biological process this BioChemEntity is involved in; please use PropertyValue if you want to include any evidence. */
    "schema:isInvolvedInBiologicalProcess"?: SchemaValue<DefinedTerm | PropertyValue | URL | IdReference, "schema:isInvolvedInBiologicalProcess">;
    /** Subcellular location where this BioChemEntity is located; please use PropertyValue if you want to include any evidence. */
    "schema:isLocatedInSubcellularLocation"?: SchemaValue<DefinedTerm | PropertyValue | URL | IdReference, "schema:isLocatedInSubcellularLocation">;
    /** Indicates a BioChemEntity that is (in some sense) a part of this BioChemEntity. */
    "schema:isPartOfBioChemEntity"?: SchemaValue<BioChemEntity | IdReference, "schema:isPartOfBioChemEntity">;
    /** The taxonomic grouping of the organism that expresses, encodes, or in someway related to the BioChemEntity. */
    "schema:taxonomicRange"?: SchemaValue<DefinedTerm | Taxon | Text | URL | IdReference, "schema:taxonomicRange">;
}
interface BioChemEntityLeaf extends BioChemEntityBase {
    "@type": "schema:BioChemEntity";
}
/** Any biological, chemical, or biochemical thing. For example: a protein; a gene; a chemical; a synthetic chemical. */
export type BioChemEntity = BioChemEntityLeaf | ChemicalSubstance | Gene | MolecularEntity | Protein;

interface BlankStateLeaf extends ElementBase {
    "@type": "uxi:BlankState";
}
/** A UI elment is in a blank state when it has no data. Reasons can be that the user hasn't created anything yet, is a new user, has deleted all data or doesn't have accesss rights. Can also be used for when the user is offline */
export type BlankState = BlankStateLeaf;

interface BlogBase extends CreativeWorkBase {
    /** A posting that is part of this blog. */
    "schema:blogPost"?: SchemaValue<BlogPosting | IdReference, "schema:blogPost">;
    /**
     * Indicates a post that is part of a {@link https://schema.org/Blog Blog}. Note that historically, what we term a "Blog" was once known as a "weblog", and that what we term a "BlogPosting" is now often colloquially referred to as a "blog".
     *
     * @deprecated Consider using https://schema.org/blogPost instead.
     */
    "schema:blogPosts"?: SchemaValue<BlogPosting | IdReference, "schema:blogPosts">;
    /** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
    "schema:issn"?: SchemaValue<Text, "schema:issn">;
}
interface BlogLeaf extends BlogBase {
    "@type": "schema:Blog";
}
/** A {@link https://en.wikipedia.org/wiki/Blog blog}, sometimes known as a "weblog". Note that the individual posts ({@link https://schema.org/BlogPosting BlogPosting}s) in a {@link https://schema.org/Blog Blog} are often colloqually referred to by the same term. */
export type Blog = BlogLeaf;

interface BlogPostingLeaf extends SocialMediaPostingBase {
    "@type": "schema:BlogPosting";
}
/** A blog post. */
export type BlogPosting = BlogPostingLeaf | LiveBlogPosting;

interface BloodTestLeaf extends MedicalTestBase {
    "@type": "schema:BloodTest";
}
/** A medical test performed on a sample of a patient's blood. */
export type BloodTest = BloodTestLeaf;

interface BoardingPolicyTypeLeaf extends EnumerationBase {
    "@type": "schema:BoardingPolicyType";
}
/** A type of boarding policy used by an airline. */
export type BoardingPolicyType = "https://schema.org/GroupBoardingPolicy" | "schema:GroupBoardingPolicy" | "https://schema.org/ZoneBoardingPolicy" | "schema:ZoneBoardingPolicy" | BoardingPolicyTypeLeaf;

interface BoatReservationLeaf extends ReservationBase {
    "@type": "schema:BoatReservation";
}
/**
 * A reservation for boat travel.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use {@link https://schema.org/Offer Offer}.
 */
export type BoatReservation = BoatReservationLeaf;

interface BoatTerminalLeaf extends CivicStructureBase {
    "@type": "schema:BoatTerminal";
}
/** A terminal for boats, ships, and other water vessels. */
export type BoatTerminal = BoatTerminalLeaf | string;

interface BoatTripBase extends TripBase {
    /** The terminal or port from which the boat arrives. */
    "schema:arrivalBoatTerminal"?: SchemaValue<BoatTerminal | IdReference, "schema:arrivalBoatTerminal">;
    /** The terminal or port from which the boat departs. */
    "schema:departureBoatTerminal"?: SchemaValue<BoatTerminal | IdReference, "schema:departureBoatTerminal">;
}
interface BoatTripLeaf extends BoatTripBase {
    "@type": "schema:BoatTrip";
}
/** A trip on a commercial ferry line. */
export type BoatTrip = BoatTripLeaf;

interface BodyMeasurementTypeEnumerationLeaf extends EnumerationBase {
    "@type": "schema:BodyMeasurementTypeEnumeration";
}
/** Enumerates types (or dimensions) of a person's body measurements, for example for fitting of clothes. */
export type BodyMeasurementTypeEnumeration = "https://schema.org/BodyMeasurementArm" | "schema:BodyMeasurementArm" | "https://schema.org/BodyMeasurementBust" | "schema:BodyMeasurementBust" | "https://schema.org/BodyMeasurementChest" | "schema:BodyMeasurementChest" | "https://schema.org/BodyMeasurementFoot" | "schema:BodyMeasurementFoot" | "https://schema.org/BodyMeasurementHand" | "schema:BodyMeasurementHand" | "https://schema.org/BodyMeasurementHead" | "schema:BodyMeasurementHead" | "https://schema.org/BodyMeasurementHeight" | "schema:BodyMeasurementHeight" | "https://schema.org/BodyMeasurementHips" | "schema:BodyMeasurementHips" | "https://schema.org/BodyMeasurementInsideLeg" | "schema:BodyMeasurementInsideLeg" | "https://schema.org/BodyMeasurementNeck" | "schema:BodyMeasurementNeck" | "https://schema.org/BodyMeasurementUnderbust" | "schema:BodyMeasurementUnderbust" | "https://schema.org/BodyMeasurementWaist" | "schema:BodyMeasurementWaist" | "https://schema.org/BodyMeasurementWeight" | "schema:BodyMeasurementWeight" | BodyMeasurementTypeEnumerationLeaf;

interface BodyOfWaterLeaf extends PlaceBase {
    "@type": "schema:BodyOfWater";
}
/** A body of water, such as a sea, ocean, or lake. */
export type BodyOfWater = BodyOfWaterLeaf | Canal | LakeBodyOfWater | OceanBodyOfWater | Pond | Reservoir | RiverBodyOfWater | SeaBodyOfWater | Waterfall | string;

interface BoneLeaf extends AnatomicalStructureBase {
    "@type": "schema:Bone";
}
/** Rigid connective tissue that comprises up the skeletal structure of the human body. */
export type Bone = BoneLeaf;

interface BookBase extends CreativeWorkBase {
    /** Indicates whether the book is an abridged edition. */
    "schema:abridged"?: SchemaValue<Boolean, "schema:abridged">;
    /** The edition of the book. */
    "schema:bookEdition"?: SchemaValue<Text, "schema:bookEdition">;
    /** The format of the book. */
    "schema:bookFormat"?: SchemaValue<BookFormatType | IdReference, "schema:bookFormat">;
    /** The illustrator of the book. */
    "schema:illustrator"?: SchemaValue<Person | IdReference, "schema:illustrator">;
    /** The ISBN of the book. */
    "schema:isbn"?: SchemaValue<Text, "schema:isbn">;
    /** The number of pages in the book. */
    "schema:numberOfPages"?: SchemaValue<Integer, "schema:numberOfPages">;
}
interface BookLeaf extends BookBase {
    "@type": "schema:Book";
}
/** A book. */
export type Book = BookLeaf | Audiobook;

interface BookFormatTypeLeaf extends EnumerationBase {
    "@type": "schema:BookFormatType";
}
/** The publication format of the book. */
export type BookFormatType = "https://schema.org/AudiobookFormat" | "schema:AudiobookFormat" | "https://schema.org/EBook" | "schema:EBook" | "https://schema.org/GraphicNovel" | "schema:GraphicNovel" | "https://schema.org/Hardcover" | "schema:Hardcover" | "https://schema.org/Paperback" | "schema:Paperback" | BookFormatTypeLeaf;

interface BookmarkActionLeaf extends ActionBase {
    "@type": "schema:BookmarkAction";
}
/** An agent bookmarks/flags/labels/tags/marks an object. */
export type BookmarkAction = BookmarkActionLeaf;

interface BookSeriesLeaf extends CreativeWorkSeriesBase {
    "@type": "schema:BookSeries";
}
/** A series of books. Included books can be indicated with the hasPart property. */
export type BookSeries = BookSeriesLeaf;

interface BookStoreLeaf extends LocalBusinessBase {
    "@type": "schema:BookStore";
}
/** A bookstore. */
export type BookStore = BookStoreLeaf | string;

interface BooleanTypeBase extends ElementBase {
    /** Whether or not the element is active */
    "uxi:isActive"?: SchemaValue<Boolean, "uxi:isActive">;
    /** Whether or not the element is checked */
    "uxi:isChecked"?: SchemaValue<Boolean, "uxi:isChecked">;
    /** Whether or not the element is disabled */
    "uxi:isDisabled"?: SchemaValue<Boolean, "uxi:isDisabled">;
    /** Whether or not the element is enabled */
    "uxi:isEnabled"?: SchemaValue<Boolean, "uxi:isEnabled">;
    /** Whether or not the element is inactive */
    "uxi:isInactive"?: SchemaValue<Boolean, "uxi:isInactive">;
    /** Whether or not the element is off */
    "uxi:isOff"?: SchemaValue<Boolean, "uxi:isOff">;
    /** Whether or not the element is on */
    "uxi:isOn"?: SchemaValue<Boolean, "uxi:isOn">;
    /** Whether or not the element is unchecked */
    "uxi:isUnchecked"?: SchemaValue<Boolean, "uxi:isUnchecked">;
}
interface BooleanTypeLeaf extends BooleanTypeBase {
    "@type": "uxi:BooleanType";
}
/** Data type: Boolean. Human-readable terms like on/off, true/false have this as a supertype */
export type BooleanType = BooleanTypeLeaf;

interface BorrowActionBase extends TransferActionBase {
    /** A sub property of participant. The person that lends the object being borrowed. */
    "schema:lender"?: SchemaValue<Organization | Person | IdReference, "schema:lender">;
}
interface BorrowActionLeaf extends BorrowActionBase {
    "@type": "schema:BorrowAction";
}
/**
 * The act of obtaining an object under an agreement to return it at a later date. Reciprocal of LendAction.
 *
 * Related actions:
 * - {@link https://schema.org/LendAction LendAction}: Reciprocal of BorrowAction.
 */
export type BorrowAction = BorrowActionLeaf;

interface BowlingAlleyLeaf extends LocalBusinessBase {
    "@type": "schema:BowlingAlley";
}
/** A bowling alley. */
export type BowlingAlley = BowlingAlleyLeaf | string;

interface BrainStructureLeaf extends AnatomicalStructureBase {
    "@type": "schema:BrainStructure";
}
/** Any anatomical structure which pertains to the soft nervous tissue functioning as the coordinating center of sensation and intellectual and nervous activity. */
export type BrainStructure = BrainStructureLeaf;

interface BrandBase extends ThingBase {
    /** The overall rating, based on a collection of reviews or ratings, of the item. */
    "schema:aggregateRating"?: SchemaValue<AggregateRating | IdReference, "schema:aggregateRating">;
    /** An associated logo. */
    "schema:logo"?: SchemaValue<ImageObject | URL | IdReference, "schema:logo">;
    /** A review of the item. */
    "schema:review"?: SchemaValue<Review | IdReference, "schema:review">;
    /** A slogan or motto associated with the item. */
    "schema:slogan"?: SchemaValue<Text, "schema:slogan">;
}
interface BrandLeaf extends BrandBase {
    "@type": "schema:Brand";
}
/** A brand is a name used by an organization or business person for labeling a product, product group, or similar. */
export type Brand = BrandLeaf;

interface BreadcrumbListLeaf extends ItemListBase {
    "@type": "schema:BreadcrumbList";
}
/**
 * A BreadcrumbList is an ItemList consisting of a chain of linked Web pages, typically described using at least their URL and their name, and typically ending with the current page.
 *
 * The {@link https://schema.org/position position} property is used to reconstruct the order of the items in a BreadcrumbList The convention is that a breadcrumb list has an {@link https://schema.org/itemListOrder itemListOrder} of {@link https://schema.org/ItemListOrderAscending ItemListOrderAscending} (lower values listed first), and that the first items in this list correspond to the "top" or beginning of the breadcrumb trail, e.g. with a site or section homepage. The specific values of 'position' are not assigned meaning for a BreadcrumbList, but they should be integers, e.g. beginning with '1' for the first item in the list.
 */
export type BreadcrumbList = BreadcrumbListLeaf;

interface BreweryLeaf extends FoodEstablishmentBase {
    "@type": "schema:Brewery";
}
/** Brewery. */
export type Brewery = BreweryLeaf | string;

interface BridgeLeaf extends CivicStructureBase {
    "@type": "schema:Bridge";
}
/** A bridge. */
export type Bridge = BridgeLeaf | string;

interface BroadcastChannelBase extends ThingBase {
    /** The unique address by which the BroadcastService can be identified in a provider lineup. In US, this is typically a number. */
    "schema:broadcastChannelId"?: SchemaValue<Text, "schema:broadcastChannelId">;
    /** The frequency used for over-the-air broadcasts. Numeric values or simple ranges e.g. 87-99. In addition a shortcut idiom is supported for frequences of AM and FM radio channels, e.g. "87 FM". */
    "schema:broadcastFrequency"?: SchemaValue<BroadcastFrequencySpecification | Text | IdReference, "schema:broadcastFrequency">;
    /** The type of service required to have access to the channel (e.g. Standard or Premium). */
    "schema:broadcastServiceTier"?: SchemaValue<Text, "schema:broadcastServiceTier">;
    /** Genre of the creative work, broadcast channel or group. */
    "schema:genre"?: SchemaValue<Text | URL, "schema:genre">;
    /** The CableOrSatelliteService offering the channel. */
    "schema:inBroadcastLineup"?: SchemaValue<CableOrSatelliteService | IdReference, "schema:inBroadcastLineup">;
    /** The BroadcastService offered on this channel. */
    "schema:providesBroadcastService"?: SchemaValue<BroadcastService | IdReference, "schema:providesBroadcastService">;
}
interface BroadcastChannelLeaf extends BroadcastChannelBase {
    "@type": "schema:BroadcastChannel";
}
/** A unique instance of a BroadcastService on a CableOrSatelliteService lineup. */
export type BroadcastChannel = BroadcastChannelLeaf | RadioChannel | TelevisionChannel;

interface BroadcastEventBase extends PublicationEventBase {
    /** The event being broadcast such as a sporting event or awards ceremony. */
    "schema:broadcastOfEvent"?: SchemaValue<Event | IdReference, "schema:broadcastOfEvent">;
    /** True if the broadcast is of a live event. */
    "schema:isLiveBroadcast"?: SchemaValue<Boolean, "schema:isLiveBroadcast">;
    /** Languages in which subtitles/captions are available, in {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard format}. */
    "schema:subtitleLanguage"?: SchemaValue<Language | Text | IdReference, "schema:subtitleLanguage">;
    /** The type of screening or video broadcast used (e.g. IMAX, 3D, SD, HD, etc.). */
    "schema:videoFormat"?: SchemaValue<Text, "schema:videoFormat">;
}
interface BroadcastEventLeaf extends BroadcastEventBase {
    "@type": "schema:BroadcastEvent";
}
/** An over the air or online broadcast event. */
export type BroadcastEvent = BroadcastEventLeaf;

interface BroadcastFrequencySpecificationBase extends ThingBase {
    /** The frequency in MHz for a particular broadcast. */
    "schema:broadcastFrequencyValue"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:broadcastFrequencyValue">;
    /** The modulation (e.g. FM, AM, etc) used by a particular broadcast service. */
    "schema:broadcastSignalModulation"?: SchemaValue<QualitativeValue | Text | IdReference, "schema:broadcastSignalModulation">;
    /** The subchannel used for the broadcast. */
    "schema:broadcastSubChannel"?: SchemaValue<Text, "schema:broadcastSubChannel">;
}
interface BroadcastFrequencySpecificationLeaf extends BroadcastFrequencySpecificationBase {
    "@type": "schema:BroadcastFrequencySpecification";
}
/** The frequency in MHz and the modulation used for a particular BroadcastService. */
export type BroadcastFrequencySpecification = BroadcastFrequencySpecificationLeaf;

interface BroadcastServiceBase extends ServiceBase {
    /**
     * The area within which users can expect to reach the broadcast service.
     *
     * @deprecated Consider using https://schema.org/serviceArea instead.
     */
    "schema:area"?: SchemaValue<Place | IdReference, "schema:area">;
    /** The media network(s) whose content is broadcast on this station. */
    "schema:broadcastAffiliateOf"?: SchemaValue<Organization | IdReference, "schema:broadcastAffiliateOf">;
    /** The name displayed in the channel guide. For many US affiliates, it is the network name. */
    "schema:broadcastDisplayName"?: SchemaValue<Text, "schema:broadcastDisplayName">;
    /** The organization owning or operating the broadcast service. */
    "schema:broadcaster"?: SchemaValue<Organization | IdReference, "schema:broadcaster">;
    /** The frequency used for over-the-air broadcasts. Numeric values or simple ranges e.g. 87-99. In addition a shortcut idiom is supported for frequences of AM and FM radio channels, e.g. "87 FM". */
    "schema:broadcastFrequency"?: SchemaValue<BroadcastFrequencySpecification | Text | IdReference, "schema:broadcastFrequency">;
    /** The timezone in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 format} for which the service bases its broadcasts */
    "schema:broadcastTimezone"?: SchemaValue<Text, "schema:broadcastTimezone">;
    /** A {@link https://en.wikipedia.org/wiki/Call_sign callsign}, as used in broadcasting and radio communications to identify people, radio and TV stations, or vehicles. */
    "schema:callSign"?: SchemaValue<Text, "schema:callSign">;
    /** A broadcast channel of a broadcast service. */
    "schema:hasBroadcastChannel"?: SchemaValue<BroadcastChannel | IdReference, "schema:hasBroadcastChannel">;
    /** The language of the content or performance or used in an action. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/availableLanguage availableLanguage}. */
    "schema:inLanguage"?: SchemaValue<Language | Text | IdReference, "schema:inLanguage">;
    /** A broadcast service to which the broadcast service may belong to such as regional variations of a national channel. */
    "schema:parentService"?: SchemaValue<BroadcastService | IdReference, "schema:parentService">;
    /** The type of screening or video broadcast used (e.g. IMAX, 3D, SD, HD, etc.). */
    "schema:videoFormat"?: SchemaValue<Text, "schema:videoFormat">;
}
interface BroadcastServiceLeaf extends BroadcastServiceBase {
    "@type": "schema:BroadcastService";
}
/** A delivery service through which content is provided via broadcast over the air or online. */
export type BroadcastService = BroadcastServiceLeaf | RadioBroadcastService;

interface BrokerageAccountLeaf extends InvestmentOrDepositBase {
    "@type": "schema:BrokerageAccount";
}
/** An account that allows an investor to deposit funds and place investment orders with a licensed broker or brokerage firm. */
export type BrokerageAccount = BrokerageAccountLeaf;

interface BrowseActionLeaf extends UIActionBase {
    "@type": "uxi:BrowseAction";
}
/** A user action to casually look over content in the application. It's an action that doesn't need to have intent, but rather searches something of interest. Combining content the user knows with new content can drive usage of browse features */
export type BrowseAction = BrowseActionLeaf;

interface BuddhistTempleLeaf extends CivicStructureBase {
    "@type": "schema:BuddhistTemple";
}
/** A Buddhist temple. */
export type BuddhistTemple = BuddhistTempleLeaf | string;

interface BusinessAudienceBase extends AudienceBase {
    /** The number of employees in an organization e.g. business. */
    "schema:numberOfEmployees"?: SchemaValue<QuantitativeValue | IdReference, "schema:numberOfEmployees">;
    /** The size of the business in annual revenue. */
    "schema:yearlyRevenue"?: SchemaValue<QuantitativeValue | IdReference, "schema:yearlyRevenue">;
    /** The age of the business. */
    "schema:yearsInOperation"?: SchemaValue<QuantitativeValue | IdReference, "schema:yearsInOperation">;
}
interface BusinessAudienceLeaf extends BusinessAudienceBase {
    "@type": "schema:BusinessAudience";
}
/** A set of characteristics belonging to businesses, e.g. who compose an item's target audience. */
export type BusinessAudience = BusinessAudienceLeaf;

interface BusinessEntityTypeLeaf extends EnumerationBase {
    "@type": "schema:BusinessEntityType";
}
/**
 * A business entity type is a conceptual entity representing the legal form, the size, the main line of business, the position in the value chain, or any combination thereof, of an organization or business person.
 *
 * Commonly used values:
 * - http://purl.org/goodrelations/v1#Business
 * - http://purl.org/goodrelations/v1#Enduser
 * - http://purl.org/goodrelations/v1#PublicInstitution
 * - http://purl.org/goodrelations/v1#Reseller
 */
export type BusinessEntityType = BusinessEntityTypeLeaf;

interface BusinessEventLeaf extends EventBase {
    "@type": "schema:BusinessEvent";
}
/** Event type: Business event. */
export type BusinessEvent = BusinessEventLeaf;

interface BusinessFunctionLeaf extends EnumerationBase {
    "@type": "schema:BusinessFunction";
}
/**
 * The business function specifies the type of activity or access (i.e., the bundle of rights) offered by the organization or business person through the offer. Typical are sell, rental or lease, maintenance or repair, manufacture / produce, recycle / dispose, engineering / construction, or installation. Proprietary specifications of access rights are also instances of this class.
 *
 * Commonly used values:
 * - http://purl.org/goodrelations/v1#ConstructionInstallation
 * - http://purl.org/goodrelations/v1#Dispose
 * - http://purl.org/goodrelations/v1#LeaseOut
 * - http://purl.org/goodrelations/v1#Maintain
 * - http://purl.org/goodrelations/v1#ProvideService
 * - http://purl.org/goodrelations/v1#Repair
 * - http://purl.org/goodrelations/v1#Sell
 * - http://purl.org/goodrelations/v1#Buy
 */
export type BusinessFunction = BusinessFunctionLeaf;

interface BusOrCoachBase extends VehicleBase {
    /** The ACRISS Car Classification Code is a code used by many car rental companies, for classifying vehicles. ACRISS stands for Association of Car Rental Industry Systems and Standards. */
    "schema:acrissCode"?: SchemaValue<Text, "schema:acrissCode">;
    /**
     * The permitted total weight of cargo and installations (e.g. a roof rack) on top of the vehicle.
     *
     * Typical unit code(s): KGM for kilogram, LBR for pound
     * - Note 1: You can indicate additional information in the {@link https://schema.org/name name} of the {@link https://schema.org/QuantitativeValue QuantitativeValue} node.
     * - Note 2: You may also link to a {@link https://schema.org/QualitativeValue QualitativeValue} node that provides additional information using {@link https://schema.org/valueReference valueReference}
     * - Note 3: Note that you can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:roofLoad"?: SchemaValue<QuantitativeValue | IdReference, "schema:roofLoad">;
}
interface BusOrCoachLeaf extends BusOrCoachBase {
    "@type": "schema:BusOrCoach";
}
/** A bus (also omnibus or autobus) is a road vehicle designed to carry passengers. Coaches are luxury busses, usually in service for long distance travel. */
export type BusOrCoach = BusOrCoachLeaf;

interface BusReservationLeaf extends ReservationBase {
    "@type": "schema:BusReservation";
}
/**
 * A reservation for bus travel.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use {@link https://schema.org/Offer Offer}.
 */
export type BusReservation = BusReservationLeaf;

interface BusStationLeaf extends CivicStructureBase {
    "@type": "schema:BusStation";
}
/** A bus station. */
export type BusStation = BusStationLeaf | string;

interface BusStopLeaf extends CivicStructureBase {
    "@type": "schema:BusStop";
}
/** A bus stop. */
export type BusStop = BusStopLeaf | string;

interface BusTripBase extends TripBase {
    /** The stop or station from which the bus arrives. */
    "schema:arrivalBusStop"?: SchemaValue<BusStation | BusStop | IdReference, "schema:arrivalBusStop">;
    /** The name of the bus (e.g. Bolt Express). */
    "schema:busName"?: SchemaValue<Text, "schema:busName">;
    /** The unique identifier for the bus. */
    "schema:busNumber"?: SchemaValue<Text, "schema:busNumber">;
    /** The stop or station from which the bus departs. */
    "schema:departureBusStop"?: SchemaValue<BusStation | BusStop | IdReference, "schema:departureBusStop">;
}
interface BusTripLeaf extends BusTripBase {
    "@type": "schema:BusTrip";
}
/** A trip on a commercial bus line. */
export type BusTrip = BusTripLeaf;

interface ButtonBase extends UIElementBase {
    /** The (User-inter)-Action that gets triggered by a Button */
    "uxi:triggers"?: SchemaValue<UserAction | IdReference, "uxi:triggers">;
}
interface ButtonLeaf extends ButtonBase {
    "@type": "uxi:Button";
}
/** A Button lets users take actions and make choices with a single tap. This is typically referred to as the onClick event, but buttons can react to pressing and holding, hovering, or focussing with a keyboard. As UI elements, Buttons try to mimick physical buttons, so in AR/VR interfaces the onClick doesn't happen until it is fully pressed 'down'. Hardware Buttons on physical devices, e.g. smart home buttons, usually handle this on the device */
export type Button = ButtonLeaf;

interface BuyActionBase extends TradeActionBase {
    /** An entity which offers (sells / leases / lends / loans) the services / goods. A seller may also be a provider. */
    "schema:seller"?: SchemaValue<Organization | Person | IdReference, "schema:seller">;
    /**
     * 'vendor' is an earlier term for 'seller'.
     *
     * @deprecated Consider using https://schema.org/seller instead.
     */
    "schema:vendor"?: SchemaValue<Organization | Person | IdReference, "schema:vendor">;
    /**
     * The warranty promise(s) included in the offer.
     *
     * @deprecated Consider using https://schema.org/warranty instead.
     */
    "schema:warrantyPromise"?: SchemaValue<WarrantyPromise | IdReference, "schema:warrantyPromise">;
}
interface BuyActionLeaf extends BuyActionBase {
    "@type": "schema:BuyAction";
}
/** The act of giving money to a seller in exchange for goods or services rendered. An agent buys an object, product, or service from a seller for a price. Reciprocal of SellAction. */
export type BuyAction = BuyActionLeaf;

interface CableOrSatelliteServiceLeaf extends ServiceBase {
    "@type": "schema:CableOrSatelliteService";
}
/** A service which provides access to media programming like TV or radio. Access may be via cable or satellite. */
export type CableOrSatelliteService = CableOrSatelliteServiceLeaf;

interface CafeOrCoffeeShopLeaf extends FoodEstablishmentBase {
    "@type": "schema:CafeOrCoffeeShop";
}
/** A cafe or coffee shop. */
export type CafeOrCoffeeShop = CafeOrCoffeeShopLeaf | string;

interface CampgroundBase extends CivicStructureBase, LodgingBusinessBase {
}
interface CampgroundLeaf extends CampgroundBase {
    "@type": "schema:Campground";
}
/**
 * A camping site, campsite, or {@link https://schema.org/Campground Campground} is a place used for overnight stay in the outdoors, typically containing individual {@link https://schema.org/CampingPitch CampingPitch} locations.
 *
 * In British English a campsite is an area, usually divided into a number of pitches, where people can camp overnight using tents or camper vans or caravans; this British English use of the word is synonymous with the American English expression campground. In American English the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites (Source: Wikipedia see {@link https://en.wikipedia.org/wiki/Campsite https://en.wikipedia.org/wiki/Campsite}).
 *
 * See also the dedicated {@link /docs/hotels.html document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type Campground = CampgroundLeaf | string;

interface CampingPitchLeaf extends AccommodationBase {
    "@type": "schema:CampingPitch";
}
/**
 * A {@link https://schema.org/CampingPitch CampingPitch} is an individual place for overnight stay in the outdoors, typically being part of a larger camping site, or {@link https://schema.org/Campground Campground}.
 *
 * In British English a campsite, or campground, is an area, usually divided into a number of pitches, where people can camp overnight using tents or camper vans or caravans; this British English use of the word is synonymous with the American English expression campground. In American English the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites. (Source: Wikipedia see {@link https://en.wikipedia.org/wiki/Campsite https://en.wikipedia.org/wiki/Campsite}).
 *
 * See also the dedicated {@link /docs/hotels.html document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type CampingPitch = CampingPitchLeaf | string;

interface CanalLeaf extends PlaceBase {
    "@type": "schema:Canal";
}
/** A canal, like the Panama Canal. */
export type Canal = CanalLeaf | string;

interface CancelActionLeaf extends PlanActionBase {
    "@type": "schema:CancelAction";
}
/**
 * The act of asserting that a future event/action is no longer going to happen.
 *
 * Related actions:
 * - {@link https://schema.org/ConfirmAction ConfirmAction}: The antonym of CancelAction.
 */
export type CancelAction = CancelActionLeaf;

interface CarBase extends VehicleBase {
    /** The ACRISS Car Classification Code is a code used by many car rental companies, for classifying vehicles. ACRISS stands for Association of Car Rental Industry Systems and Standards. */
    "schema:acrissCode"?: SchemaValue<Text, "schema:acrissCode">;
    /**
     * The permitted total weight of cargo and installations (e.g. a roof rack) on top of the vehicle.
     *
     * Typical unit code(s): KGM for kilogram, LBR for pound
     * - Note 1: You can indicate additional information in the {@link https://schema.org/name name} of the {@link https://schema.org/QuantitativeValue QuantitativeValue} node.
     * - Note 2: You may also link to a {@link https://schema.org/QualitativeValue QualitativeValue} node that provides additional information using {@link https://schema.org/valueReference valueReference}
     * - Note 3: Note that you can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:roofLoad"?: SchemaValue<QuantitativeValue | IdReference, "schema:roofLoad">;
}
interface CarLeaf extends CarBase {
    "@type": "schema:Car";
}
/** A car is a wheeled, self-powered motor vehicle used for transportation. */
export type Car = CarLeaf;

interface CardLeaf extends UIElementBase {
    "@type": "uxi:Card";
}
/** A Card is a type of Organism UI Element that groups content and controls about a single subject. Most commonly, cards separate themselves from the surrounding elements with an outline or raised appearance. */
export type Card = CardLeaf;

interface CarUsageTypeLeaf extends EnumerationBase {
    "@type": "schema:CarUsageType";
}
/** A value indicating a special usage of a car, e.g. commercial rental, driving school, or as a taxi. */
export type CarUsageType = "https://schema.org/DrivingSchoolVehicleUsage" | "schema:DrivingSchoolVehicleUsage" | "https://schema.org/RentalVehicleUsage" | "schema:RentalVehicleUsage" | "https://schema.org/TaxiVehicleUsage" | "schema:TaxiVehicleUsage" | CarUsageTypeLeaf;

interface CasinoLeaf extends LocalBusinessBase {
    "@type": "schema:Casino";
}
/** A casino. */
export type Casino = CasinoLeaf | string;

interface CategoryCodeBase extends DefinedTermBase {
    /** A short textual code that uniquely identifies the value. */
    "schema:codeValue"?: SchemaValue<Text, "schema:codeValue">;
    /** A {@link https://schema.org/CategoryCodeSet CategoryCodeSet} that contains this category code. */
    "schema:inCodeSet"?: SchemaValue<CategoryCodeSet | URL | IdReference, "schema:inCodeSet">;
}
interface CategoryCodeLeaf extends CategoryCodeBase {
    "@type": "schema:CategoryCode";
}
/** A Category Code. */
export type CategoryCode = CategoryCodeLeaf | MedicalCode;

interface CategoryCodeSetBase extends DefinedTermSetBase {
    /** A Category code contained in this code set. */
    "schema:hasCategoryCode"?: SchemaValue<CategoryCode | IdReference, "schema:hasCategoryCode">;
}
interface CategoryCodeSetLeaf extends CategoryCodeSetBase {
    "@type": "schema:CategoryCodeSet";
}
/** A set of Category Code values. */
export type CategoryCodeSet = CategoryCodeSetLeaf;

interface CatholicChurchLeaf extends CivicStructureBase {
    "@type": "schema:CatholicChurch";
}
/** A Catholic church. */
export type CatholicChurch = CatholicChurchLeaf | string;

interface CDCPMDRecordBase extends ThingBase {
    /** collectiondate - Date for which patient counts are reported. */
    "schema:cvdCollectionDate"?: SchemaValue<DateTime | Text, "schema:cvdCollectionDate">;
    /** Name of the County of the NHSN facility that this data record applies to. Use {@link https://schema.org/cvdFacilityId cvdFacilityId} to identify the facility. To provide other details, {@link https://schema.org/healthcareReportingData healthcareReportingData} can be used on a {@link https://schema.org/Hospital Hospital} entry. */
    "schema:cvdFacilityCounty"?: SchemaValue<Text, "schema:cvdFacilityCounty">;
    /** Identifier of the NHSN facility that this data record applies to. Use {@link https://schema.org/cvdFacilityCounty cvdFacilityCounty} to indicate the county. To provide other details, {@link https://schema.org/healthcareReportingData healthcareReportingData} can be used on a {@link https://schema.org/Hospital Hospital} entry. */
    "schema:cvdFacilityId"?: SchemaValue<Text, "schema:cvdFacilityId">;
    /** numbeds - HOSPITAL INPATIENT BEDS: Inpatient beds, including all staffed, licensed, and overflow (surge) beds used for inpatients. */
    "schema:cvdNumBeds"?: SchemaValue<Number, "schema:cvdNumBeds">;
    /** numbedsocc - HOSPITAL INPATIENT BED OCCUPANCY: Total number of staffed inpatient beds that are occupied. */
    "schema:cvdNumBedsOcc"?: SchemaValue<Number, "schema:cvdNumBedsOcc">;
    /** numc19died - DEATHS: Patients with suspected or confirmed COVID-19 who died in the hospital, ED, or any overflow location. */
    "schema:cvdNumC19Died"?: SchemaValue<Number, "schema:cvdNumC19Died">;
    /** numc19hopats - HOSPITAL ONSET: Patients hospitalized in an NHSN inpatient care location with onset of suspected or confirmed COVID-19 14 or more days after hospitalization. */
    "schema:cvdNumC19HOPats"?: SchemaValue<Number, "schema:cvdNumC19HOPats">;
    /** numc19hosppats - HOSPITALIZED: Patients currently hospitalized in an inpatient care location who have suspected or confirmed COVID-19. */
    "schema:cvdNumC19HospPats"?: SchemaValue<Number, "schema:cvdNumC19HospPats">;
    /** numc19mechventpats - HOSPITALIZED and VENTILATED: Patients hospitalized in an NHSN inpatient care location who have suspected or confirmed COVID-19 and are on a mechanical ventilator. */
    "schema:cvdNumC19MechVentPats"?: SchemaValue<Number, "schema:cvdNumC19MechVentPats">;
    /** numc19ofmechventpats - ED/OVERFLOW and VENTILATED: Patients with suspected or confirmed COVID-19 who are in the ED or any overflow location awaiting an inpatient bed and on a mechanical ventilator. */
    "schema:cvdNumC19OFMechVentPats"?: SchemaValue<Number, "schema:cvdNumC19OFMechVentPats">;
    /** numc19overflowpats - ED/OVERFLOW: Patients with suspected or confirmed COVID-19 who are in the ED or any overflow location awaiting an inpatient bed. */
    "schema:cvdNumC19OverflowPats"?: SchemaValue<Number, "schema:cvdNumC19OverflowPats">;
    /** numicubeds - ICU BEDS: Total number of staffed inpatient intensive care unit (ICU) beds. */
    "schema:cvdNumICUBeds"?: SchemaValue<Number, "schema:cvdNumICUBeds">;
    /** numicubedsocc - ICU BED OCCUPANCY: Total number of staffed inpatient ICU beds that are occupied. */
    "schema:cvdNumICUBedsOcc"?: SchemaValue<Number, "schema:cvdNumICUBedsOcc">;
    /** numtotbeds - ALL HOSPITAL BEDS: Total number of all Inpatient and outpatient beds, including all staffed,ICU, licensed, and overflow (surge) beds used for inpatients or outpatients. */
    "schema:cvdNumTotBeds"?: SchemaValue<Number, "schema:cvdNumTotBeds">;
    /** numvent - MECHANICAL VENTILATORS: Total number of ventilators available. */
    "schema:cvdNumVent"?: SchemaValue<Number, "schema:cvdNumVent">;
    /** numventuse - MECHANICAL VENTILATORS IN USE: Total number of ventilators in use. */
    "schema:cvdNumVentUse"?: SchemaValue<Number, "schema:cvdNumVentUse">;
    /** Publication date of an online listing. */
    "schema:datePosted"?: SchemaValue<Date | DateTime, "schema:datePosted">;
}
interface CDCPMDRecordLeaf extends CDCPMDRecordBase {
    "@type": "schema:CDCPMDRecord";
}
/** A CDCPMDRecord is a data structure representing a record in a CDC tabular data format used for hospital data reporting. See {@link /docs/cdc-covid.html documentation} for details, and the linked CDC materials for authoritative definitions used as the source here. */
export type CDCPMDRecord = CDCPMDRecordLeaf;

interface CemeteryLeaf extends CivicStructureBase {
    "@type": "schema:Cemetery";
}
/** A graveyard. */
export type Cemetery = CemeteryLeaf | string;

interface ChangeOrientationActionLeaf extends UIActionBase {
    "@type": "uxi:ChangeOrientationAction";
}
/** A change-orientation action happens when a user turns their mobile device into portrait or landscape mode. Note that users can switch this functionality off, so the actual physical orientation can be different */
export type ChangeOrientationAction = ChangeOrientationActionLeaf;

interface ChapterBase extends CreativeWorkBase {
    /** The page on which the work ends; for example "138" or "xvi". */
    "schema:pageEnd"?: SchemaValue<Integer | Text, "schema:pageEnd">;
    /** The page on which the work starts; for example "135" or "xiii". */
    "schema:pageStart"?: SchemaValue<Integer | Text, "schema:pageStart">;
    /** Any description of pages that is not separated into pageStart and pageEnd; for example, "1-6, 9, 55" or "10-12, 46-49". */
    "schema:pagination"?: SchemaValue<Text, "schema:pagination">;
}
interface ChapterLeaf extends ChapterBase {
    "@type": "schema:Chapter";
}
/** One of the sections into which a book is divided. A chapter usually has a section number or a name. */
export type Chapter = ChapterLeaf;

interface CheckActionLeaf extends ActionBase {
    "@type": "schema:CheckAction";
}
/** An agent inspects, determines, investigates, inquires, or examines an object's accuracy, quality, condition, or state. */
export type CheckAction = CheckActionLeaf;

interface CheckboxBase extends UIElementBase {
    /** A set to express that there are multiple selected items */
    "uxi:selectedSet"?: SchemaValue<Number, "uxi:selectedSet">;
    /** A set to express that some items are not selected */
    "uxi:unselectedSet"?: SchemaValue<Number, "uxi:unselectedSet">;
}
interface CheckboxLeaf extends CheckboxBase {
    "@type": "uxi:Checkbox";
}
/** Checkboxes are UI elements to select one or more values from several options. They are typically displayed as a small box in which a check mark is placed if it 'isChecked'. If the checkbox is part of a group, clicking it will change the selectedSet. Checkboxes are independent, contrary to Radiobuttons */
export type Checkbox = CheckboxLeaf;

interface CheckInActionLeaf extends CommunicateActionBase {
    "@type": "schema:CheckInAction";
}
/**
 * The act of an agent communicating (service provider, social media, etc) their arrival by registering/confirming for a previously reserved service (e.g. flight check in) or at a place (e.g. hotel), possibly resulting in a result (boarding pass, etc).
 *
 * Related actions:
 * - {@link https://schema.org/CheckOutAction CheckOutAction}: The antonym of CheckInAction.
 * - {@link https://schema.org/ArriveAction ArriveAction}: Unlike ArriveAction, CheckInAction implies that the agent is informing/confirming the start of a previously reserved service.
 * - {@link https://schema.org/ConfirmAction ConfirmAction}: Unlike ConfirmAction, CheckInAction implies that the agent is informing/confirming the _start_ of a previously reserved service rather than its validity/existence.
 */
export type CheckInAction = CheckInActionLeaf;

interface CheckOutActionLeaf extends CommunicateActionBase {
    "@type": "schema:CheckOutAction";
}
/**
 * The act of an agent communicating (service provider, social media, etc) their departure of a previously reserved service (e.g. flight check in) or place (e.g. hotel).
 *
 * Related actions:
 * - {@link https://schema.org/CheckInAction CheckInAction}: The antonym of CheckOutAction.
 * - {@link https://schema.org/DepartAction DepartAction}: Unlike DepartAction, CheckOutAction implies that the agent is informing/confirming the end of a previously reserved service.
 * - {@link https://schema.org/CancelAction CancelAction}: Unlike CancelAction, CheckOutAction implies that the agent is informing/confirming the end of a previously reserved service.
 */
export type CheckOutAction = CheckOutActionLeaf;

interface CheckoutPageLeaf extends WebPageBase {
    "@type": "schema:CheckoutPage";
}
/** Web page type: Checkout page. */
export type CheckoutPage = CheckoutPageLeaf;

interface ChemicalSubstanceBase extends BioChemEntityBase {
    /** The chemical composition describes the identity and relative ratio of the chemical elements that make up the substance. */
    "schema:chemicalComposition"?: SchemaValue<Text, "schema:chemicalComposition">;
    /** A role played by the BioChemEntity within a chemical context. */
    "schema:chemicalRole"?: SchemaValue<DefinedTerm | IdReference, "schema:chemicalRole">;
    /** Intended use of the BioChemEntity by humans. */
    "schema:potentialUse"?: SchemaValue<DefinedTerm | IdReference, "schema:potentialUse">;
}
interface ChemicalSubstanceLeaf extends ChemicalSubstanceBase {
    "@type": "schema:ChemicalSubstance";
}
/** A chemical substance is 'a portion of matter of constant composition, composed of molecular entities of the same type or of different types' (source: {@link https://www.ebi.ac.uk/chebi/searchId.do?chebiId=59999 ChEBI:59999}). */
export type ChemicalSubstance = ChemicalSubstanceLeaf;

interface ChildCareLeaf extends LocalBusinessBase {
    "@type": "schema:ChildCare";
}
/** A Childcare center. */
export type ChildCare = ChildCareLeaf | string;

interface ChildrensEventLeaf extends EventBase {
    "@type": "schema:ChildrensEvent";
}
/** Event type: Children's event. */
export type ChildrensEvent = ChildrensEventLeaf;

interface ChooseActionBase extends ActionBase {
    /** A sub property of object. The options subject to this action. */
    "schema:actionOption"?: SchemaValue<Text | Thing | IdReference, "schema:actionOption">;
    /**
     * A sub property of object. The options subject to this action.
     *
     * @deprecated Consider using https://schema.org/actionOption instead.
     */
    "schema:option"?: SchemaValue<Text | Thing | IdReference, "schema:option">;
}
interface ChooseActionLeaf extends ChooseActionBase {
    "@type": "schema:ChooseAction";
}
/** The act of expressing a preference from a set of options or a large or unbounded set of choices/options. */
export type ChooseAction = ChooseActionLeaf | VoteAction;

interface ChurchLeaf extends CivicStructureBase {
    "@type": "schema:Church";
}
/** A church. */
export type Church = ChurchLeaf | CatholicChurch | string;

interface CircleLeaf extends UIElementBase {
    "@type": "uxi:Circle";
}
/** A Circle is a type of Shape which is often used as a frame, for Avatars for example. As a filled shape it might appear as a background or as a status indicator. E.g. the activity-indicator next to an avatar. */
export type Circle = CircleLeaf;

interface CityLeaf extends PlaceBase {
    "@type": "schema:City";
}
/** A city or town. */
export type City = CityLeaf | string;

interface CityHallLeaf extends CivicStructureBase {
    "@type": "schema:CityHall";
}
/** A city hall. */
export type CityHall = CityHallLeaf | string;

interface CivicStructureBase extends PlaceBase {
    /**
     * The general opening hours for a business. Opening hours can be specified as a weekly time range, starting with days, then times per day. Multiple days can be listed with commas ',' separating each day. Day or time ranges are specified using a hyphen '-'.
     * - Days are specified using the following two-letter combinations: `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`.
     * - Times are specified using 24:00 format. For example, 3pm is specified as `15:00`, 10am as `10:00`.
     * - Here is an example: `<time itemprop="openingHours" datetime="Tu,Th 16:00-20:00">Tuesdays and Thursdays 4-8pm</time>`.
     * - If a business is open 7 days a week, then it can be specified as `<time itemprop="openingHours" datetime="Mo-Su">Monday through Sunday, all day</time>`.
     */
    "schema:openingHours"?: SchemaValue<Text, "schema:openingHours">;
}
interface CivicStructureLeaf extends CivicStructureBase {
    "@type": "schema:CivicStructure";
}
/** A public structure, such as a town hall or concert hall. */
export type CivicStructure = CivicStructureLeaf | Airport | Aquarium | Beach | BoatTerminal | Bridge | BusStation | BusStop | Campground | Cemetery | Crematorium | EducationalOrganization | EventVenue | FireStation | GovernmentBuilding | Hospital | MovieTheater | Museum | MusicVenue | Park | ParkingFacility | PerformingArtsTheater | PlaceOfWorship | Playground | PoliceStation | PublicToilet | RVPark | StadiumOrArena | SubwayStation | TaxiStand | TrainStation | Zoo | string;

interface ClaimBase extends CreativeWorkBase {
    /** Indicates an occurence of a {@link https://schema.org/Claim Claim} in some {@link https://schema.org/CreativeWork CreativeWork}. */
    "schema:appearance"?: SchemaValue<CreativeWork | IdReference, "schema:appearance">;
    /** For a {@link https://schema.org/Claim Claim} interpreted from {@link https://schema.org/MediaObject MediaObject} content sed to indicate a claim contained, implied or refined from the content of a {@link https://schema.org/MediaObject MediaObject}. */
    "schema:claimInterpreter"?: SchemaValue<Organization | Person | IdReference, "schema:claimInterpreter">;
    /** Indicates the first known occurence of a {@link https://schema.org/Claim Claim} in some {@link https://schema.org/CreativeWork CreativeWork}. */
    "schema:firstAppearance"?: SchemaValue<CreativeWork | IdReference, "schema:firstAppearance">;
}
interface ClaimLeaf extends ClaimBase {
    "@type": "schema:Claim";
}
/**
 * A {@link https://schema.org/Claim Claim} in Schema.org represents a specific, factually-oriented claim that could be the {@link https://schema.org/itemReviewed itemReviewed} in a {@link https://schema.org/ClaimReview ClaimReview}. The content of a claim can be summarized with the {@link https://schema.org/text text} property. Variations on well known claims can have their common identity indicated via {@link https://schema.org/sameAs sameAs} links, and summarized with a {@link https://schema.org/name name}. Ideally, a {@link https://schema.org/Claim Claim} description includes enough contextual information to minimize the risk of ambiguity or inclarity. In practice, many claims are better understood in the context in which they appear or the interpretations provided by claim reviews.
 *
 * Beyond {@link https://schema.org/ClaimReview ClaimReview}, the Claim type can be associated with related creative works - for example a {@link https://schema.org/ScholarlyArticle ScholarlyArticle} or {@link https://schema.org/Question Question} might be {@link https://schema.org/about about} some {@link https://schema.org/Claim Claim}.
 *
 * At this time, Schema.org does not define any types of relationship between claims. This is a natural area for future exploration.
 */
export type Claim = ClaimLeaf;

interface ClaimReviewBase extends ReviewBase {
    /** A short summary of the specific claims reviewed in a ClaimReview. */
    "schema:claimReviewed"?: SchemaValue<Text, "schema:claimReviewed">;
}
interface ClaimReviewLeaf extends ClaimReviewBase {
    "@type": "schema:ClaimReview";
}
/** A fact-checking review of claims made (or reported) in some creative work (referenced via itemReviewed). */
export type ClaimReview = ClaimReviewLeaf;

interface ClassBase extends ThingBase {
    /** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
    "schema:supersededBy"?: SchemaValue<Class | Enumeration | Property | IdReference, "schema:supersededBy">;
}
interface ClassLeaf extends ClassBase {
    "@type": "schema:Class";
}
/** A class, also often called a 'Type'; equivalent to rdfs:Class. */
export type Class = ClassLeaf;

interface ClickActionLeaf extends UIActionBase {
    "@type": "uxi:ClickAction";
}
/** A click action is when a user presses and then releases an element, usually not moving the pointing device out of the element and not pressing for very long. Possibly the most common user interaction */
export type ClickAction = ClickActionLeaf;

interface ClipBase extends CreativeWorkBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /**
     * An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/actor instead.
     */
    "schema:actors"?: SchemaValue<Person | IdReference, "schema:actors">;
    /** Position of the clip within an ordered group of clips. */
    "schema:clipNumber"?: SchemaValue<Integer | Text, "schema:clipNumber">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /**
     * A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/director instead.
     */
    "schema:directors"?: SchemaValue<Person | IdReference, "schema:directors">;
    /** The end time of the clip expressed as the number of seconds from the beginning of the work. */
    "schema:endOffset"?: SchemaValue<HyperTocEntry | Number | IdReference, "schema:endOffset">;
    /** The composer of the soundtrack. */
    "schema:musicBy"?: SchemaValue<MusicGroup | Person | IdReference, "schema:musicBy">;
    /** The episode to which this clip belongs. */
    "schema:partOfEpisode"?: SchemaValue<Episode | IdReference, "schema:partOfEpisode">;
    /** The season to which this episode belongs. */
    "schema:partOfSeason"?: SchemaValue<CreativeWorkSeason | IdReference, "schema:partOfSeason">;
    /** The series to which this episode or season belongs. */
    "schema:partOfSeries"?: SchemaValue<CreativeWorkSeries | IdReference, "schema:partOfSeries">;
    /** The start time of the clip expressed as the number of seconds from the beginning of the work. */
    "schema:startOffset"?: SchemaValue<HyperTocEntry | Number | IdReference, "schema:startOffset">;
}
interface ClipLeaf extends ClipBase {
    "@type": "schema:Clip";
}
/** A short TV or radio program or a segment/part of a program. */
export type Clip = ClipLeaf | MovieClip | RadioClip | TVClip | VideoGameClip;

interface ClosedStateLeaf extends ElementBase {
    "@type": "uxi:ClosedState";
}
/** A UI element is in a closed state when it can be either closed or open and its content is summarized */
export type ClosedState = ClosedStateLeaf;

interface ClosingStateLeaf extends ElementBase {
    "@type": "uxi:ClosingState";
}
/** The closing state is entered when an open elment closes. It enters the closed state afterwards. Acoordeon menus or folder trees often use this for subtle tranistions */
export type ClosingState = ClosingStateLeaf;

interface ClothingStoreLeaf extends LocalBusinessBase {
    "@type": "schema:ClothingStore";
}
/** A clothing store. */
export type ClothingStore = ClothingStoreLeaf | string;

interface CodeLeaf extends CreativeWorkBase {
    "@type": "schema:Code";
}
/**
 * Computer programming source code. Example: Full (compile ready) solutions, code snippet samples, scripts, templates.
 *
 * @deprecated Use SoftwareSourceCode instead.
 */
export type Code = CodeLeaf;

interface CollectionBase extends CreativeWorkBase {
    /** The number of items in the {@link https://schema.org/Collection Collection}. */
    "schema:collectionSize"?: SchemaValue<Integer, "schema:collectionSize">;
}
interface CollectionLeaf extends CollectionBase {
    "@type": "schema:Collection";
}
/** A collection of items e.g. creative works or products. */
export type Collection = CollectionLeaf | ProductCollection;

interface CollectionPageLeaf extends WebPageBase {
    "@type": "schema:CollectionPage";
}
/** Web page type: Collection page. */
export type CollectionPage = CollectionPageLeaf | MediaGallery;

interface CollegeOrUniversityLeaf extends EducationalOrganizationBase {
    "@type": "schema:CollegeOrUniversity";
}
/** A college, university, or other third-level educational institution. */
export type CollegeOrUniversity = CollegeOrUniversityLeaf | string;

interface ColorCodeTypeLeaf extends ElementBase {
    "@type": "uxi:ColorCodeType";
}
/** Data type: color code. Hexadecimal RGB or ARGB-value */
export type ColorCodeType = ColorCodeTypeLeaf;

interface ColumnHeaderLeaf extends ContainerUIElementBase {
    "@type": "uxi:ColumnHeader";
}
/** A ColumnHeader is a container that is displayed on the top row of a table, showing the name of that column and often controls for sorting, filtering and ordering. */
export type ColumnHeader = ColumnHeaderLeaf;

interface ComedyClubLeaf extends LocalBusinessBase {
    "@type": "schema:ComedyClub";
}
/** A comedy club. */
export type ComedyClub = ComedyClubLeaf | string;

interface ComedyEventLeaf extends EventBase {
    "@type": "schema:ComedyEvent";
}
/** Event type: Comedy event. */
export type ComedyEvent = ComedyEventLeaf;

interface ComicCoverArtBase extends ComicStoryBase, VisualArtworkBase {
}
interface ComicCoverArtLeaf extends ComicCoverArtBase {
    "@type": "schema:ComicCoverArt";
}
/** The artwork on the cover of a comic. */
export type ComicCoverArt = ComicCoverArtLeaf;

interface ComicIssueBase extends PublicationIssueBase {
    /** The primary artist for a work in a medium other than pencils or digital line art--for example, if the primary artwork is done in watercolors or digital paints. */
    "schema:artist"?: SchemaValue<Person | IdReference, "schema:artist">;
    /** The individual who adds color to inked drawings. */
    "schema:colorist"?: SchemaValue<Person | IdReference, "schema:colorist">;
    /** The individual who traces over the pencil drawings in ink after pencils are complete. */
    "schema:inker"?: SchemaValue<Person | IdReference, "schema:inker">;
    /** The individual who adds lettering, including speech balloons and sound effects, to artwork. */
    "schema:letterer"?: SchemaValue<Person | IdReference, "schema:letterer">;
    /** The individual who draws the primary narrative artwork. */
    "schema:penciler"?: SchemaValue<Person | IdReference, "schema:penciler">;
    /** A description of the variant cover for the issue, if the issue is a variant printing. For example, "Bryan Hitch Variant Cover" or "2nd Printing Variant". */
    "schema:variantCover"?: SchemaValue<Text, "schema:variantCover">;
}
interface ComicIssueLeaf extends ComicIssueBase {
    "@type": "schema:ComicIssue";
}
/** Individual comic issues are serially published as part of a larger series. For the sake of consistency, even one-shot issues belong to a series comprised of a single issue. All comic issues can be uniquely identified by: the combination of the name and volume number of the series to which the issue belongs; the issue number; and the variant description of the issue (if any). */
export type ComicIssue = ComicIssueLeaf;

interface ComicSeriesLeaf extends CreativeWorkSeriesBase {
    "@type": "schema:ComicSeries";
}
/** A sequential publication of comic stories under a unifying title, for example "The Amazing Spider-Man" or "Groo the Wanderer". */
export type ComicSeries = ComicSeriesLeaf;

interface ComicStoryBase extends CreativeWorkBase {
    /** The primary artist for a work in a medium other than pencils or digital line art--for example, if the primary artwork is done in watercolors or digital paints. */
    "schema:artist"?: SchemaValue<Person | IdReference, "schema:artist">;
    /** The individual who adds color to inked drawings. */
    "schema:colorist"?: SchemaValue<Person | IdReference, "schema:colorist">;
    /** The individual who traces over the pencil drawings in ink after pencils are complete. */
    "schema:inker"?: SchemaValue<Person | IdReference, "schema:inker">;
    /** The individual who adds lettering, including speech balloons and sound effects, to artwork. */
    "schema:letterer"?: SchemaValue<Person | IdReference, "schema:letterer">;
    /** The individual who draws the primary narrative artwork. */
    "schema:penciler"?: SchemaValue<Person | IdReference, "schema:penciler">;
}
interface ComicStoryLeaf extends ComicStoryBase {
    "@type": "schema:ComicStory";
}
/** The term "story" is any indivisible, re-printable unit of a comic, including the interior stories, covers, and backmatter. Most comics have at least two stories: a cover (ComicCoverArt) and an interior story. */
export type ComicStory = ComicStoryLeaf | ComicCoverArt;

interface CommentBase extends CreativeWorkBase {
    /** The number of downvotes this question, answer or comment has received from the community. */
    "schema:downvoteCount"?: SchemaValue<Integer, "schema:downvoteCount">;
    /** The parent of a question, answer or item in general. */
    "schema:parentItem"?: SchemaValue<Comment | IdReference, "schema:parentItem">;
    /** The number of upvotes this question, answer or comment has received from the community. */
    "schema:upvoteCount"?: SchemaValue<Integer, "schema:upvoteCount">;
}
interface CommentLeaf extends CommentBase {
    "@type": "schema:Comment";
}
/** A comment on an item - for example, a comment on a blog post. The comment's content is expressed via the {@link https://schema.org/text text} property, and its topic via {@link https://schema.org/about about}, properties shared with all CreativeWorks. */
export type Comment = CommentLeaf | Answer | CorrectionComment | Question;

interface CommentActionBase extends CommunicateActionBase {
    /** A sub property of result. The Comment created or sent as a result of this action. */
    "schema:resultComment"?: SchemaValue<Comment | IdReference, "schema:resultComment">;
}
interface CommentActionLeaf extends CommentActionBase {
    "@type": "schema:CommentAction";
}
/** The act of generating a comment about a subject. */
export type CommentAction = CommentActionLeaf | UICommentAction;

interface CommunicateActionBase extends ActionBase {
    /** The subject matter of the content. */
    "schema:about"?: SchemaValue<Thing | IdReference, "schema:about">;
    /** The language of the content or performance or used in an action. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/availableLanguage availableLanguage}. */
    "schema:inLanguage"?: SchemaValue<Language | Text | IdReference, "schema:inLanguage">;
    /**
     * A sub property of instrument. The language used on this action.
     *
     * @deprecated Consider using https://schema.org/inLanguage instead.
     */
    "schema:language"?: SchemaValue<Language | IdReference, "schema:language">;
    /** A sub property of participant. The participant who is at the receiving end of the action. */
    "schema:recipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:recipient">;
}
interface CommunicateActionLeaf extends CommunicateActionBase {
    "@type": "schema:CommunicateAction";
}
/** The act of conveying information to another person via a communication medium (instrument) such as speech, email, or telephone conversation. */
export type CommunicateAction = CommunicateActionLeaf | AskAction | CheckInAction | CheckOutAction | CommentAction | InformAction | InviteAction | ReplyAction | ShareAction | UICommunicateAction;

interface CommunityHealthLeaf extends LocalBusinessBase {
    "@type": "schema:CommunityHealth";
}
/** A field of public health focusing on improving health characteristics of a defined population in relation with their geographical or environment areas. */
export type CommunityHealth = CommunityHealthLeaf | string;

interface CompleteDataFeedLeaf extends DataFeedBase {
    "@type": "schema:CompleteDataFeed";
}
/**
 * A {@link https://schema.org/CompleteDataFeed CompleteDataFeed} is a {@link https://schema.org/DataFeed DataFeed} whose standard representation includes content for every item currently in the feed.
 *
 * This is the equivalent of Atom's element as defined in Feed Paging and Archiving {@link https://tools.ietf.org/html/rfc5005 RFC 5005}, For example (and as defined for Atom), when using data from a feed that represents a collection of items that varies over time (e.g. "Top Twenty Records") there is no need to have newer entries mixed in alongside older, obsolete entries. By marking this feed as a CompleteDataFeed, old entries can be safely discarded when the feed is refreshed, since we can assume the feed has provided descriptions for all current items.
 */
export type CompleteDataFeed = CompleteDataFeedLeaf;

interface CompoundPriceSpecificationBase extends PriceSpecificationBase {
    /** This property links to all {@link https://schema.org/UnitPriceSpecification UnitPriceSpecification} nodes that apply in parallel for the {@link https://schema.org/CompoundPriceSpecification CompoundPriceSpecification} node. */
    "schema:priceComponent"?: SchemaValue<UnitPriceSpecification | IdReference, "schema:priceComponent">;
    /** Defines the type of a price specified for an offered product, for example a list price, a (temporary) sale price or a manufacturer suggested retail price. If multiple prices are specified for an offer the {@link https://schema.org/priceType priceType} property can be used to identify the type of each such specified price. The value of priceType can be specified as a value from enumeration PriceTypeEnumeration or as a free form text string for price types that are not already predefined in PriceTypeEnumeration. */
    "schema:priceType"?: SchemaValue<PriceTypeEnumeration | Text | IdReference, "schema:priceType">;
}
interface CompoundPriceSpecificationLeaf extends CompoundPriceSpecificationBase {
    "@type": "schema:CompoundPriceSpecification";
}
/** A compound price specification is one that bundles multiple prices that all apply in combination for different dimensions of consumption. Use the name property of the attached unit price specification for indicating the dimension of a price component (e.g. "electricity" or "final cleaning"). */
export type CompoundPriceSpecification = CompoundPriceSpecificationLeaf;

interface ComputerLanguageLeaf extends ThingBase {
    "@type": "schema:ComputerLanguage";
}
/** This type covers computer programming languages such as Scheme and Lisp, as well as other language-like computer representations. Natural languages are best represented with the {@link https://schema.org/Language Language} type. */
export type ComputerLanguage = ComputerLanguageLeaf;

interface ComputerStoreLeaf extends LocalBusinessBase {
    "@type": "schema:ComputerStore";
}
/** A computer store. */
export type ComputerStore = ComputerStoreLeaf | string;

interface ConfirmActionLeaf extends InformActionBase {
    "@type": "schema:ConfirmAction";
}
/**
 * The act of notifying someone that a future event/action is going to happen as expected.
 *
 * Related actions:
 * - {@link https://schema.org/CancelAction CancelAction}: The antonym of ConfirmAction.
 */
export type ConfirmAction = ConfirmActionLeaf | UIConfirmAction;

interface ConsortiumLeaf extends OrganizationBase {
    "@type": "schema:Consortium";
}
/** A Consortium is a membership {@link https://schema.org/Organization Organization} whose members are typically Organizations. */
export type Consortium = ConsortiumLeaf | string;

interface ConstraintLeaf extends ElementBase {
    "@type": "uxi:Constraint";
}
/** Constraints are Structural Elements that limit the movement, or restrict in other ways other UI Elements. E.g. centering, aligning, cutting off text etc. are all examples of constraints. A good balance between dynamic and fixed constraints can make responsive designs flexible but calm. */
export type Constraint = ConstraintLeaf;

interface ConsumeActionBase extends ActionBase {
    /** A set of requirements that a must be fulfilled in order to perform an Action. If more than one value is specied, fulfilling one set of requirements will allow the Action to be performed. */
    "schema:actionAccessibilityRequirement"?: SchemaValue<ActionAccessSpecification | IdReference, "schema:actionAccessibilityRequirement">;
    /** An Offer which must be accepted before the user can perform the Action. For example, the user may need to buy a movie before being able to watch it. */
    "schema:expectsAcceptanceOf"?: SchemaValue<Offer | IdReference, "schema:expectsAcceptanceOf">;
}
interface ConsumeActionLeaf extends ConsumeActionBase {
    "@type": "schema:ConsumeAction";
}
/** The act of ingesting information/resources/food. */
export type ConsumeAction = ConsumeActionLeaf | DrinkAction | EatAction | InstallAction | ListenAction | ReadAction | UseAction | ViewAction | WatchAction;

interface ContactPageLeaf extends WebPageBase {
    "@type": "schema:ContactPage";
}
/** Web page type: Contact page. */
export type ContactPage = ContactPageLeaf;

interface ContactPointBase extends ThingBase {
    /** The geographic area where a service or offered item is provided. */
    "schema:areaServed"?: SchemaValue<AdministrativeArea | GeoShape | Place | Text | IdReference, "schema:areaServed">;
    /** A language someone may use with or at the item, service or place. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/inLanguage inLanguage} */
    "schema:availableLanguage"?: SchemaValue<Language | Text | IdReference, "schema:availableLanguage">;
    /** An option available on this contact point (e.g. a toll-free number or support for hearing-impaired callers). */
    "schema:contactOption"?: SchemaValue<ContactPointOption | IdReference, "schema:contactOption">;
    /** A person or organization can have different contact points, for different purposes. For example, a sales contact point, a PR contact point and so on. This property is used to specify the kind of contact point. */
    "schema:contactType"?: SchemaValue<Text, "schema:contactType">;
    /** Email address. */
    "schema:email"?: SchemaValue<Text, "schema:email">;
    /** The fax number. */
    "schema:faxNumber"?: SchemaValue<Text, "schema:faxNumber">;
    /** The hours during which this service or contact is available. */
    "schema:hoursAvailable"?: SchemaValue<OpeningHoursSpecification | IdReference, "schema:hoursAvailable">;
    /** The product or service this support contact point is related to (such as product support for a particular product line). This can be a specific product or product line (e.g. "iPhone") or a general category of products or services (e.g. "smartphones"). */
    "schema:productSupported"?: SchemaValue<Product | Text | IdReference, "schema:productSupported">;
    /**
     * The geographic area where the service is provided.
     *
     * @deprecated Consider using https://schema.org/areaServed instead.
     */
    "schema:serviceArea"?: SchemaValue<AdministrativeArea | GeoShape | Place | IdReference, "schema:serviceArea">;
    /** The telephone number. */
    "schema:telephone"?: SchemaValue<Text, "schema:telephone">;
}
interface ContactPointLeaf extends ContactPointBase {
    "@type": "schema:ContactPoint";
}
/** A contact point—for example, a Customer Complaints department. */
export type ContactPoint = ContactPointLeaf | PostalAddress;

interface ContactPointOptionLeaf extends EnumerationBase {
    "@type": "schema:ContactPointOption";
}
/** Enumerated options related to a ContactPoint. */
export type ContactPointOption = "https://schema.org/HearingImpairedSupported" | "schema:HearingImpairedSupported" | "https://schema.org/TollFree" | "schema:TollFree" | ContactPointOptionLeaf;

interface ContainerBase extends ContainerUIElementBase {
    /** A slot is a space on a container for sub-elements */
    "uxi:slot"?: SchemaValue<UIElement | IdReference, "uxi:slot">;
}
interface ContainerLeaf extends ContainerBase {
    "@type": "uxi:Container";
}
/** A Container UI Element can hold other UI elements, and as such is a general class. Most of the time you'd want a more specialized container such as list, grid or table. */
export type Container = ContainerLeaf;

interface ContainerUIElementBase extends UIElementBase {
    /** A hierarchy flag to indicate if a Container UI Element should display its content with less space between elements, or smaller elements, smaller fonts sizes etc. This can be useful on different screen sizes, or when a mouse is available for more precise pointing. Power users often prefer a denser UI with less guidance. Lesser used control elements can be grouped like this as well, while keeping them on screen. */
    "uxi:isDense"?: SchemaValue<never, "uxi:isDense">;
    /** Menu is a property of a Container UI Element that tells the user that this part of the container is used as a way to control the rest of the container. */
    "uxi:menu"?: SchemaValue<UIElement | IdReference, "uxi:menu">;
    /** ordered slots of containers are places where UI elements can go in a particular order */
    "uxi:orderedSlots"?: SchemaValue<Element | IdReference, "uxi:orderedSlots">;
    /** Settings is a property of a Container UI Element that affect not only this container, but apply to similar parts of the application elsewhere. */
    "uxi:settings"?: SchemaValue<UIElement | IdReference, "uxi:settings">;
    /** unordered slots of containers are places where UI elements can go without a particular order */
    "uxi:unorderedSlots"?: SchemaValue<Element | IdReference, "uxi:unorderedSlots">;
}
interface ContainerUIElementLeaf extends ContainerUIElementBase {
    "@type": "uxi:ContainerUIElement";
}
/** A container is a UI element which contains sub-elements */
export type ContainerUIElement = ContainerUIElementLeaf | ColumnHeader | Container | DirectoryStructure | Grid | List | MultiSelection | SingleSelection | Tabs | TreeView | UITable;

interface ContextLeaf extends ElementBase {
    "@type": "uxi:Context";
}
/** Contexts are Structural Elements that define the environment in which other UI Elements exist. Switching between dark and light themes is often achieved with context. E.g. not showing all streamable movies at your travel destination is a result of a location context. */
export type Context = ContextLeaf;

interface ContinentLeaf extends PlaceBase {
    "@type": "schema:Continent";
}
/** One of the continents (for example, Europe or Africa). */
export type Continent = ContinentLeaf | string;

interface ControlActionLeaf extends ActionBase {
    "@type": "schema:ControlAction";
}
/** An agent controls a device or application. */
export type ControlAction = ControlActionLeaf | ActivateAction | DeactivateAction | ResumeAction | SuspendAction;

interface ConvenienceStoreLeaf extends LocalBusinessBase {
    "@type": "schema:ConvenienceStore";
}
/** A convenience store. */
export type ConvenienceStore = ConvenienceStoreLeaf | string;

interface ConversationLeaf extends CreativeWorkBase {
    "@type": "schema:Conversation";
}
/** One or more messages between organizations or people on a particular topic. Individual messages can be linked to the conversation with isPartOf or hasPart properties. */
export type Conversation = ConversationLeaf;

interface ConverterBase extends ElementBase {
    /** The input range defines the type(s) of data which a uxi:UIElement can consume. This can be used to choose UIElements automatically. E.g. in the case of a date picker this could be https://schema.org/Date or https://schema.org/DateTime. For the (sub-)uxi:UIElement for selecting a year inside that date picker, a uxi:UIPropertyValueSpecification could be used to narrow down the selection. Also useful for converting, sending or receiving data. */
    "uxi:inputRange"?: SchemaValue<Thing | UIDataType | IdReference, "uxi:inputRange">;
    /** A result is an outcome property that's immediately evaluated. It can be used to tell the user what consequences their actions will have. E.g. the result in a currency calculator app, completed user profile data as a result of editing, or a fulfilled workflow after performing a sequence of tasks (before submitting). Technically, results should be treated as immediate/synchronous outcomes, compare with uxi:output for side-effects/asynchronous handling. */
    "uxi:result"?: SchemaValue<Thing | UIDataType | IdReference, "uxi:result">;
}
interface ConverterLeaf extends ConverterBase {
    "@type": "uxi:Converter";
}
/** The root class for all technical components that convert from one data type to another */
export type Converter = ConverterLeaf;

interface CookActionBase extends ActionBase {
    /** A sub property of location. The specific food establishment where the action occurred. */
    "schema:foodEstablishment"?: SchemaValue<FoodEstablishment | Place | IdReference, "schema:foodEstablishment">;
    /** A sub property of location. The specific food event where the action occurred. */
    "schema:foodEvent"?: SchemaValue<FoodEvent | IdReference, "schema:foodEvent">;
    /** A sub property of instrument. The recipe/instructions used to perform the action. */
    "schema:recipe"?: SchemaValue<Recipe | IdReference, "schema:recipe">;
}
interface CookActionLeaf extends CookActionBase {
    "@type": "schema:CookAction";
}
/** The act of producing/preparing food. */
export type CookAction = CookActionLeaf;

interface CorporationBase extends OrganizationBase {
    /** The exchange traded instrument associated with a Corporation object. The tickerSymbol is expressed as an exchange and an instrument name separated by a space character. For the exchange component of the tickerSymbol attribute, we recommend using the controlled vocabulary of Market Identifier Codes (MIC) specified in ISO15022. */
    "schema:tickerSymbol"?: SchemaValue<Text, "schema:tickerSymbol">;
}
interface CorporationLeaf extends CorporationBase {
    "@type": "schema:Corporation";
}
/** Organization: A business corporation. */
export type Corporation = CorporationLeaf | string;

interface CorrectionCommentLeaf extends CommentBase {
    "@type": "schema:CorrectionComment";
}
/** A {@link https://schema.org/comment comment} that corrects {@link https://schema.org/CreativeWork CreativeWork}. */
export type CorrectionComment = CorrectionCommentLeaf;

interface CountryLeaf extends PlaceBase {
    "@type": "schema:Country";
}
/** A country. */
export type Country = CountryLeaf | string;

interface CourseBase extends CreativeWorkBase, LearningResourceBase {
    /** The identifier for the {@link https://schema.org/Course Course} used by the course {@link https://schema.org/provider provider} (e.g. CS101 or 6.001). */
    "schema:courseCode"?: SchemaValue<Text, "schema:courseCode">;
    /** Requirements for taking the Course. May be completion of another {@link https://schema.org/Course Course} or a textual description like "permission of instructor". Requirements may be a pre-requisite competency, referenced using {@link https://schema.org/AlignmentObject AlignmentObject}. */
    "schema:coursePrerequisites"?: SchemaValue<AlignmentObject | Course | Text | IdReference, "schema:coursePrerequisites">;
    /** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
    "schema:educationalCredentialAwarded"?: SchemaValue<EducationalOccupationalCredential | Text | URL | IdReference, "schema:educationalCredentialAwarded">;
    /** An offering of the course at a specific time and place or through specific media or mode of study or to a specific section of students. */
    "schema:hasCourseInstance"?: SchemaValue<CourseInstance | IdReference, "schema:hasCourseInstance">;
    /** The number of credits or units awarded by a Course or required to complete an EducationalOccupationalProgram. */
    "schema:numberOfCredits"?: SchemaValue<Integer | StructuredValue | IdReference, "schema:numberOfCredits">;
    /** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
    "schema:occupationalCredentialAwarded"?: SchemaValue<EducationalOccupationalCredential | Text | URL | IdReference, "schema:occupationalCredentialAwarded">;
}
interface CourseLeaf extends CourseBase {
    "@type": "schema:Course";
}
/** A description of an educational course which may be offered as distinct instances at which take place at different times or take place at different locations, or be offered through different media or modes of study. An educational course is a sequence of one or more educational events and/or creative works which aims to build knowledge, competence or ability of learners. */
export type Course = CourseLeaf;

interface CourseInstanceBase extends EventBase {
    /** The medium or means of delivery of the course instance or the mode of study, either as a text label (e.g. "online", "onsite" or "blended"; "synchronous" or "asynchronous"; "full-time" or "part-time") or as a URL reference to a term from a controlled vocabulary (e.g. https://ceds.ed.gov/element/001311#Asynchronous ). */
    "schema:courseMode"?: SchemaValue<Text | URL, "schema:courseMode">;
    /** The amount of work expected of students taking the course, often provided as a figure per week or per month, and may be broken down by type. For example, "2 hours of lectures, 1 hour of lab work and 3 hours of independent study per week". */
    "schema:courseWorkload"?: SchemaValue<Text, "schema:courseWorkload">;
    /** A person assigned to instruct or provide instructional assistance for the {@link https://schema.org/CourseInstance CourseInstance}. */
    "schema:instructor"?: SchemaValue<Person | IdReference, "schema:instructor">;
}
interface CourseInstanceLeaf extends CourseInstanceBase {
    "@type": "schema:CourseInstance";
}
/** An instance of a {@link https://schema.org/Course Course} which is distinct from other instances because it is offered at a different time or location or through different media or modes of study or to a specific section of students. */
export type CourseInstance = CourseInstanceLeaf;

interface CourthouseLeaf extends CivicStructureBase {
    "@type": "schema:Courthouse";
}
/** A courthouse. */
export type Courthouse = CourthouseLeaf | string;

interface CoverArtLeaf extends VisualArtworkBase {
    "@type": "schema:CoverArt";
}
/** The artwork on the outer surface of a CreativeWork. */
export type CoverArt = CoverArtLeaf | ComicCoverArt;

interface CovidTestingFacilityLeaf extends MedicalClinicBase {
    "@type": "schema:CovidTestingFacility";
}
/** A CovidTestingFacility is a {@link https://schema.org/MedicalClinic MedicalClinic} where testing for the COVID-19 Coronavirus disease is available. If the facility is being made available from an established {@link https://schema.org/Pharmacy Pharmacy}, {@link https://schema.org/Hotel Hotel}, or other non-medical organization, multiple types can be listed. This makes it easier to re-use existing schema.org information about that place e.g. contact info, address, opening hours. Note that in an emergency, such information may not always be reliable. */
export type CovidTestingFacility = CovidTestingFacilityLeaf | string;

interface CreateActionLeaf extends ActionBase {
    "@type": "schema:CreateAction";
}
/** The act of deliberately creating/producing/generating/building a result out of the agent. */
export type CreateAction = CreateActionLeaf | CookAction | DrawAction | FilmAction | PaintAction | PhotographAction | WriteAction;

interface CreativeWorkBase extends ThingBase {
    /** The subject matter of the content. */
    "schema:about"?: SchemaValue<Thing | IdReference, "schema:about">;
    /** An abstract is a short description that summarizes a {@link https://schema.org/CreativeWork CreativeWork}. */
    "schema:abstract"?: SchemaValue<Text, "schema:abstract">;
    /** Indicates that the resource is compatible with the referenced accessibility API ({@link http://www.w3.org/wiki/WebSchemas/Accessibility WebSchemas wiki lists possible values}). */
    "schema:accessibilityAPI"?: SchemaValue<Text, "schema:accessibilityAPI">;
    /** Identifies input methods that are sufficient to fully control the described resource ({@link http://www.w3.org/wiki/WebSchemas/Accessibility WebSchemas wiki lists possible values}). */
    "schema:accessibilityControl"?: SchemaValue<Text, "schema:accessibilityControl">;
    /** Content features of the resource, such as accessible media, alternatives and supported enhancements for accessibility ({@link http://www.w3.org/wiki/WebSchemas/Accessibility WebSchemas wiki lists possible values}). */
    "schema:accessibilityFeature"?: SchemaValue<Text, "schema:accessibilityFeature">;
    /** A characteristic of the described resource that is physiologically dangerous to some users. Related to WCAG 2.0 guideline 2.3 ({@link http://www.w3.org/wiki/WebSchemas/Accessibility WebSchemas wiki lists possible values}). */
    "schema:accessibilityHazard"?: SchemaValue<Text, "schema:accessibilityHazard">;
    /** A human-readable summary of specific accessibility features or deficiencies, consistent with the other accessibility metadata but expressing subtleties such as "short descriptions are present but long descriptions will be needed for non-visual users" or "short descriptions are present and no long descriptions are needed." */
    "schema:accessibilitySummary"?: SchemaValue<Text, "schema:accessibilitySummary">;
    /** The human sensory perceptual system or cognitive faculty through which a person may process or perceive information. Expected values include: auditory, tactile, textual, visual, colorDependent, chartOnVisual, chemOnVisual, diagramOnVisual, mathOnVisual, musicOnVisual, textOnVisual. */
    "schema:accessMode"?: SchemaValue<Text, "schema:accessMode">;
    /** A list of single or combined accessModes that are sufficient to understand all the intellectual content of a resource. Expected values include: auditory, tactile, textual, visual. */
    "schema:accessModeSufficient"?: SchemaValue<ItemList | IdReference, "schema:accessModeSufficient">;
    /** Specifies the Person that is legally accountable for the CreativeWork. */
    "schema:accountablePerson"?: SchemaValue<Person | IdReference, "schema:accountablePerson">;
    /** Indicates a page documenting how licenses can be purchased or otherwise acquired, for the current item. */
    "schema:acquireLicensePage"?: SchemaValue<CreativeWork | URL | IdReference, "schema:acquireLicensePage">;
    /** The overall rating, based on a collection of reviews or ratings, of the item. */
    "schema:aggregateRating"?: SchemaValue<AggregateRating | IdReference, "schema:aggregateRating">;
    /** A secondary title of the CreativeWork. */
    "schema:alternativeHeadline"?: SchemaValue<Text, "schema:alternativeHeadline">;
    /** Indicates a page or other link involved in archival of a {@link https://schema.org/CreativeWork CreativeWork}. In the case of {@link https://schema.org/MediaReview MediaReview}, the items in a {@link https://schema.org/MediaReviewItem MediaReviewItem} may often become inaccessible, but be archived by archival, journalistic, activist, or law enforcement organizations. In such cases, the referenced page may not directly publish the content. */
    "schema:archivedAt"?: SchemaValue<URL | WebPage | IdReference, "schema:archivedAt">;
    /** The item being described is intended to assess the competency or learning outcome defined by the referenced term. */
    "schema:assesses"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:assesses">;
    /** A media object that encodes this CreativeWork. This property is a synonym for encoding. */
    "schema:associatedMedia"?: SchemaValue<MediaObject | IdReference, "schema:associatedMedia">;
    /** An intended audience, i.e. a group for whom something was created. */
    "schema:audience"?: SchemaValue<Audience | IdReference, "schema:audience">;
    /** An embedded audio object. */
    "schema:audio"?: SchemaValue<AudioObject | Clip | MusicRecording | IdReference, "schema:audio">;
    /** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably. */
    "schema:author"?: SchemaValue<Organization | Person | IdReference, "schema:author">;
    /** An award won by or for this item. */
    "schema:award"?: SchemaValue<Text, "schema:award">;
    /**
     * Awards won by or for this item.
     *
     * @deprecated Consider using https://schema.org/award instead.
     */
    "schema:awards"?: SchemaValue<Text, "schema:awards">;
    /** Fictional person connected with a creative work. */
    "schema:character"?: SchemaValue<Person | IdReference, "schema:character">;
    /** A citation or reference to another creative work, such as another publication, web page, scholarly article, etc. */
    "schema:citation"?: SchemaValue<CreativeWork | Text | IdReference, "schema:citation">;
    /** Comments, typically from users. */
    "schema:comment"?: SchemaValue<Comment | IdReference, "schema:comment">;
    /** The number of comments this CreativeWork (e.g. Article, Question or Answer) has received. This is most applicable to works published in Web sites with commenting system; additional comments may exist elsewhere. */
    "schema:commentCount"?: SchemaValue<Integer, "schema:commentCount">;
    /**
     * Conditions that affect the availability of, or method(s) of access to, an item. Typically used for real world items such as an {@link https://schema.org/ArchiveComponent ArchiveComponent} held by an {@link https://schema.org/ArchiveOrganization ArchiveOrganization}. This property is not suitable for use as a general Web access control mechanism. It is expressed only in natural language.
     *
     * For example "Available by appointment from the Reading Room" or "Accessible only from logged-in accounts ".
     */
    "schema:conditionsOfAccess"?: SchemaValue<Text, "schema:conditionsOfAccess">;
    /** The location depicted or described in the content. For example, the location in a photograph or painting. */
    "schema:contentLocation"?: SchemaValue<Place | IdReference, "schema:contentLocation">;
    /** Official rating of a piece of content—for example,'MPAA PG-13'. */
    "schema:contentRating"?: SchemaValue<Rating | Text | IdReference, "schema:contentRating">;
    /** The specific time described by a creative work, for works (e.g. articles, video objects etc.) that emphasise a particular moment within an Event. */
    "schema:contentReferenceTime"?: SchemaValue<DateTime, "schema:contentReferenceTime">;
    /** A secondary contributor to the CreativeWork or Event. */
    "schema:contributor"?: SchemaValue<Organization | Person | IdReference, "schema:contributor">;
    /** The party holding the legal copyright to the CreativeWork. */
    "schema:copyrightHolder"?: SchemaValue<Organization | Person | IdReference, "schema:copyrightHolder">;
    /** Text of a notice appropriate for describing the copyright aspects of this Creative Work, ideally indicating the owner of the copyright for the Work. */
    "schema:copyrightNotice"?: SchemaValue<Text, "schema:copyrightNotice">;
    /** The year during which the claimed copyright for the CreativeWork was first asserted. */
    "schema:copyrightYear"?: SchemaValue<Number, "schema:copyrightYear">;
    /** Indicates a correction to a {@link https://schema.org/CreativeWork CreativeWork}, either via a {@link https://schema.org/CorrectionComment CorrectionComment}, textually or in another document. */
    "schema:correction"?: SchemaValue<CorrectionComment | Text | URL | IdReference, "schema:correction">;
    /**
     * The country of origin of something, including products as well as creative works such as movie and TV content.
     *
     * In the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of {@link https://schema.org/CreativeWork CreativeWork} it is difficult to provide fully general guidance, and properties such as {@link https://schema.org/contentLocation contentLocation} and {@link https://schema.org/locationCreated locationCreated} may be more applicable.
     *
     * In the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot be fully enumerated here.
     */
    "schema:countryOfOrigin"?: SchemaValue<Country | IdReference, "schema:countryOfOrigin">;
    /** The status of a creative work in terms of its stage in a lifecycle. Example terms include Incomplete, Draft, Published, Obsolete. Some organizations define a set of terms for the stages of their publication lifecycle. */
    "schema:creativeWorkStatus"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:creativeWorkStatus">;
    /** The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. */
    "schema:creator"?: SchemaValue<Organization | Person | IdReference, "schema:creator">;
    /** Text that can be used to credit person(s) and/or organization(s) associated with a published Creative Work. */
    "schema:creditText"?: SchemaValue<Text, "schema:creditText">;
    /** The date on which the CreativeWork was created or the item was added to a DataFeed. */
    "schema:dateCreated"?: SchemaValue<Date | DateTime, "schema:dateCreated">;
    /** The date on which the CreativeWork was most recently modified or when the item's entry was modified within a DataFeed. */
    "schema:dateModified"?: SchemaValue<Date | DateTime, "schema:dateModified">;
    /** Date of first broadcast/publication. */
    "schema:datePublished"?: SchemaValue<Date | DateTime, "schema:datePublished">;
    /** A link to the page containing the comments of the CreativeWork. */
    "schema:discussionUrl"?: SchemaValue<URL, "schema:discussionUrl">;
    /**
     * An {@link https://eidr.org/ EIDR} (Entertainment Identifier Registry) {@link https://schema.org/identifier identifier} representing a specific edit / edition for a work of film or television.
     *
     * For example, the motion picture known as "Ghostbusters" whose {@link https://schema.org/titleEIDR titleEIDR} is "10.5240/7EC7-228A-510A-053E-CBB8-J", has several edits e.g. "10.5240/1F2A-E1C5-680A-14C6-E76B-I" and "10.5240/8A35-3BEE-6497-5D12-9E4F-3".
     *
     * Since schema.org types like {@link https://schema.org/Movie Movie} and {@link https://schema.org/TVEpisode TVEpisode} can be used for both works and their multiple expressions, it is possible to use {@link https://schema.org/titleEIDR titleEIDR} alone (for a general description), or alongside {@link https://schema.org/editEIDR editEIDR} for a more edit-specific description.
     */
    "schema:editEIDR"?: SchemaValue<Text | URL, "schema:editEIDR">;
    /** Specifies the Person who edited the CreativeWork. */
    "schema:editor"?: SchemaValue<Person | IdReference, "schema:editor">;
    /**
     * An alignment to an established educational framework.
     *
     * This property should not be used where the nature of the alignment can be described using a simple property, for example to express that a resource {@link https://schema.org/teaches teaches} or {@link https://schema.org/assesses assesses} a competency.
     */
    "schema:educationalAlignment"?: SchemaValue<AlignmentObject | IdReference, "schema:educationalAlignment">;
    /** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
    "schema:educationalLevel"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:educationalLevel">;
    /** The purpose of a work in the context of education; for example, 'assignment', 'group work'. */
    "schema:educationalUse"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:educationalUse">;
    /** A media object that encodes this CreativeWork. This property is a synonym for associatedMedia. */
    "schema:encoding"?: SchemaValue<MediaObject | IdReference, "schema:encoding">;
    /**
     * Media type typically expressed using a MIME format (see {@link http://www.iana.org/assignments/media-types/media-types.xhtml IANA site} and {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types MDN reference}) e.g. application/zip for a SoftwareApplication binary, audio/mpeg for .mp3 etc.).
     *
     * In cases where a {@link https://schema.org/CreativeWork CreativeWork} has several media type representations, {@link https://schema.org/encoding encoding} can be used to indicate each {@link https://schema.org/MediaObject MediaObject} alongside particular {@link https://schema.org/encodingFormat encodingFormat} information.
     *
     * Unregistered or niche encoding and file formats can be indicated instead via the most appropriate URL, e.g. defining Web page or a Wikipedia/Wikidata entry.
     */
    "schema:encodingFormat"?: SchemaValue<Text | URL, "schema:encodingFormat">;
    /**
     * A media object that encodes this CreativeWork.
     *
     * @deprecated Consider using https://schema.org/encoding instead.
     */
    "schema:encodings"?: SchemaValue<MediaObject | IdReference, "schema:encodings">;
    /** A creative work that this work is an example/instance/realization/derivation of. */
    "schema:exampleOfWork"?: SchemaValue<CreativeWork | IdReference, "schema:exampleOfWork">;
    /** Date the content expires and is no longer useful or available. For example a {@link https://schema.org/VideoObject VideoObject} or {@link https://schema.org/NewsArticle NewsArticle} whose availability or relevance is time-limited, or a {@link https://schema.org/ClaimReview ClaimReview} fact check whose publisher wants to indicate that it may no longer be relevant (or helpful to highlight) after some date. */
    "schema:expires"?: SchemaValue<Date, "schema:expires">;
    /**
     * Media type, typically MIME format (see {@link http://www.iana.org/assignments/media-types/media-types.xhtml IANA site}) of the content e.g. application/zip of a SoftwareApplication binary. In cases where a CreativeWork has several media type representations, 'encoding' can be used to indicate each MediaObject alongside particular fileFormat information. Unregistered or niche file formats can be indicated instead via the most appropriate URL, e.g. defining Web page or a Wikipedia entry.
     *
     * @deprecated Consider using https://schema.org/encodingFormat instead.
     */
    "schema:fileFormat"?: SchemaValue<Text | URL, "schema:fileFormat">;
    /** A person or organization that supports (sponsors) something through some kind of financial contribution. */
    "schema:funder"?: SchemaValue<Organization | Person | IdReference, "schema:funder">;
    /** Genre of the creative work, broadcast channel or group. */
    "schema:genre"?: SchemaValue<Text | URL, "schema:genre">;
    /** Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense). */
    "schema:hasPart"?: SchemaValue<CreativeWork | IdReference, "schema:hasPart">;
    /** Headline of the article. */
    "schema:headline"?: SchemaValue<Text, "schema:headline">;
    /** The language of the content or performance or used in an action. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/availableLanguage availableLanguage}. */
    "schema:inLanguage"?: SchemaValue<Language | Text | IdReference, "schema:inLanguage">;
    /** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. The most specific child type of InteractionCounter should be used. */
    "schema:interactionStatistic"?: SchemaValue<InteractionCounter | IdReference, "schema:interactionStatistic">;
    /** The predominant mode of learning supported by the learning resource. Acceptable values are 'active', 'expositive', or 'mixed'. */
    "schema:interactivityType"?: SchemaValue<Text, "schema:interactivityType">;
    /** Used to indicate a specific claim contained, implied, translated or refined from the content of a {@link https://schema.org/MediaObject MediaObject} or other {@link https://schema.org/CreativeWork CreativeWork}. The interpreting party can be indicated using {@link https://schema.org/claimInterpreter claimInterpreter}. */
    "schema:interpretedAsClaim"?: SchemaValue<Claim | IdReference, "schema:interpretedAsClaim">;
    /** A flag to signal that the item, event, or place is accessible for free. */
    "schema:isAccessibleForFree"?: SchemaValue<Boolean, "schema:isAccessibleForFree">;
    /** A resource from which this work is derived or from which it is a modification or adaption. */
    "schema:isBasedOn"?: SchemaValue<CreativeWork | Product | URL | IdReference, "schema:isBasedOn">;
    /**
     * A resource that was used in the creation of this resource. This term can be repeated for multiple sources. For example, http://example.com/great-multiplication-intro.html.
     *
     * @deprecated Consider using https://schema.org/isBasedOn instead.
     */
    "schema:isBasedOnUrl"?: SchemaValue<CreativeWork | Product | URL | IdReference, "schema:isBasedOnUrl">;
    /** Indicates whether this content is family friendly. */
    "schema:isFamilyFriendly"?: SchemaValue<Boolean, "schema:isFamilyFriendly">;
    /** Indicates an item or CreativeWork that this item, or CreativeWork (in some sense), is part of. */
    "schema:isPartOf"?: SchemaValue<CreativeWork | URL | IdReference, "schema:isPartOf">;
    /** Keywords or tags used to describe this content. Multiple entries in a keywords list are typically delimited by commas. */
    "schema:keywords"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:keywords">;
    /** The predominant type or kind characterizing the learning resource. For example, 'presentation', 'handout'. */
    "schema:learningResourceType"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:learningResourceType">;
    /** A license document that applies to this content, typically indicated by URL. */
    "schema:license"?: SchemaValue<CreativeWork | URL | IdReference, "schema:license">;
    /** The location where the CreativeWork was created, which may not be the same as the location depicted in the CreativeWork. */
    "schema:locationCreated"?: SchemaValue<Place | IdReference, "schema:locationCreated">;
    /** Indicates the primary entity described in some page or other CreativeWork. */
    "schema:mainEntity"?: SchemaValue<Thing | IdReference, "schema:mainEntity">;
    /** A maintainer of a {@link https://schema.org/Dataset Dataset}, software package ({@link https://schema.org/SoftwareApplication SoftwareApplication}), or other {@link https://schema.org/Project Project}. A maintainer is a {@link https://schema.org/Person Person} or {@link https://schema.org/Organization Organization} that manages contributions to, and/or publication of, some (typically complex) artifact. It is common for distributions of software and data to be based on "upstream" sources. When {@link https://schema.org/maintainer maintainer} is applied to a specific version of something e.g. a particular version or packaging of a {@link https://schema.org/Dataset Dataset}, it is always possible that the upstream source has a different maintainer. The {@link https://schema.org/isBasedOn isBasedOn} property can be used to indicate such relationships between datasets to make the different maintenance roles clear. Similarly in the case of software, a package may have dedicated maintainers working on integration into software distributions such as Ubuntu, as well as upstream maintainers of the underlying work. */
    "schema:maintainer"?: SchemaValue<Organization | Person | IdReference, "schema:maintainer">;
    /** A material that something is made from, e.g. leather, wool, cotton, paper. */
    "schema:material"?: SchemaValue<Product | Text | URL | IdReference, "schema:material">;
    /** The quantity of the materials being described or an expression of the physical space they occupy. */
    "schema:materialExtent"?: SchemaValue<QuantitativeValue | Text | IdReference, "schema:materialExtent">;
    /** Indicates that the CreativeWork contains a reference to, but is not necessarily about a concept. */
    "schema:mentions"?: SchemaValue<Thing | IdReference, "schema:mentions">;
    /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use {@link https://schema.org/businessFunction businessFunction} to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a {@link https://schema.org/Demand Demand}. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:offers"?: SchemaValue<Demand | Offer | IdReference, "schema:offers">;
    /** A pattern that something has, for example 'polka dot', 'striped', 'Canadian flag'. Values are typically expressed as text, although links to controlled value schemes are also supported. */
    "schema:pattern"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:pattern">;
    /** The position of an item in a series or sequence of items. */
    "schema:position"?: SchemaValue<Integer | Text, "schema:position">;
    /** The person or organization who produced the work (e.g. music album, movie, tv/radio series etc.). */
    "schema:producer"?: SchemaValue<Organization | Person | IdReference, "schema:producer">;
    /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
    "schema:provider"?: SchemaValue<Organization | Person | IdReference, "schema:provider">;
    /** A publication event associated with the item. */
    "schema:publication"?: SchemaValue<PublicationEvent | IdReference, "schema:publication">;
    /** The publisher of the creative work. */
    "schema:publisher"?: SchemaValue<Organization | Person | IdReference, "schema:publisher">;
    /** The publishing division which published the comic. */
    "schema:publisherImprint"?: SchemaValue<Organization | IdReference, "schema:publisherImprint">;
    /**
     * The publishingPrinciples property indicates (typically via {@link https://schema.org/URL URL}) a document describing the editorial principles of an {@link https://schema.org/Organization Organization} (or individual e.g. a {@link https://schema.org/Person Person} writing a blog) that relate to their activities as a publisher, e.g. ethics or diversity policies. When applied to a {@link https://schema.org/CreativeWork CreativeWork} (e.g. {@link https://schema.org/NewsArticle NewsArticle}) the principles are those of the party primarily responsible for the creation of the {@link https://schema.org/CreativeWork CreativeWork}.
     *
     * While such policies are most typically expressed in natural language, sometimes related information (e.g. indicating a {@link https://schema.org/funder funder}) can be expressed using schema.org terminology.
     */
    "schema:publishingPrinciples"?: SchemaValue<CreativeWork | URL | IdReference, "schema:publishingPrinciples">;
    /** The Event where the CreativeWork was recorded. The CreativeWork may capture all or part of the event. */
    "schema:recordedAt"?: SchemaValue<Event | IdReference, "schema:recordedAt">;
    /** The place and time the release was issued, expressed as a PublicationEvent. */
    "schema:releasedEvent"?: SchemaValue<PublicationEvent | IdReference, "schema:releasedEvent">;
    /** A review of the item. */
    "schema:review"?: SchemaValue<Review | IdReference, "schema:review">;
    /**
     * Review of the item.
     *
     * @deprecated Consider using https://schema.org/review instead.
     */
    "schema:reviews"?: SchemaValue<Review | IdReference, "schema:reviews">;
    /** Indicates (by URL or string) a particular version of a schema used in some CreativeWork. This property was created primarily to indicate the use of a specific schema.org release, e.g. `10.0` as a simple string, or more explicitly via URL, `https://schema.org/docs/releases.html#v10.0`. There may be situations in which other schemas might usefully be referenced this way, e.g. `http://dublincore.org/specifications/dublin-core/dces/1999-07-02/` but this has not been carefully explored in the community. */
    "schema:schemaVersion"?: SchemaValue<Text | URL, "schema:schemaVersion">;
    /** Indicates the date on which the current structured data was generated / published. Typically used alongside {@link https://schema.org/sdPublisher sdPublisher} */
    "schema:sdDatePublished"?: SchemaValue<Date, "schema:sdDatePublished">;
    /** A license document that applies to this structured data, typically indicated by URL. */
    "schema:sdLicense"?: SchemaValue<CreativeWork | URL | IdReference, "schema:sdLicense">;
    /** Indicates the party responsible for generating and publishing the current structured data markup, typically in cases where the structured data is derived automatically from existing published content but published on a different site. For example, student projects and open data initiatives often re-publish existing content with more explicitly structured metadata. The {@link https://schema.org/sdPublisher sdPublisher} property helps make such practices more explicit. */
    "schema:sdPublisher"?: SchemaValue<Organization | Person | IdReference, "schema:sdPublisher">;
    /** A standardized size of a product or creative work, specified either through a simple textual string (for example 'XL', '32Wx34L'), a QuantitativeValue with a unitCode, or a comprehensive and structured {@link https://schema.org/SizeSpecification SizeSpecification}; in other cases, the {@link https://schema.org/width width}, {@link https://schema.org/height height}, {@link https://schema.org/depth depth} and {@link https://schema.org/weight weight} properties may be more applicable. */
    "schema:size"?: SchemaValue<DefinedTerm | QuantitativeValue | SizeSpecification | Text | IdReference, "schema:size">;
    /** The Organization on whose behalf the creator was working. */
    "schema:sourceOrganization"?: SchemaValue<Organization | IdReference, "schema:sourceOrganization">;
    /** The "spatial" property can be used in cases when more specific properties (e.g. {@link https://schema.org/locationCreated locationCreated}, {@link https://schema.org/spatialCoverage spatialCoverage}, {@link https://schema.org/contentLocation contentLocation}) are not known to be appropriate. */
    "schema:spatial"?: SchemaValue<Place | IdReference, "schema:spatial">;
    /** The spatialCoverage of a CreativeWork indicates the place(s) which are the focus of the content. It is a subproperty of contentLocation intended primarily for more technical and detailed materials. For example with a Dataset, it indicates areas that the dataset describes: a dataset of New York weather would have spatialCoverage which was the place: the state of New York. */
    "schema:spatialCoverage"?: SchemaValue<Place | IdReference, "schema:spatialCoverage">;
    /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
    "schema:sponsor"?: SchemaValue<Organization | Person | IdReference, "schema:sponsor">;
    /** The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term. */
    "schema:teaches"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:teaches">;
    /** The "temporal" property can be used in cases where more specific properties (e.g. {@link https://schema.org/temporalCoverage temporalCoverage}, {@link https://schema.org/dateCreated dateCreated}, {@link https://schema.org/dateModified dateModified}, {@link https://schema.org/datePublished datePublished}) are not known to be appropriate. */
    "schema:temporal"?: SchemaValue<DateTime | Text, "schema:temporal">;
    /**
     * The temporalCoverage of a CreativeWork indicates the period that the content applies to, i.e. that it describes, either as a DateTime or as a textual string indicating a time period in {@link https://en.wikipedia.org/wiki/ISO_8601#Time_intervals ISO 8601 time interval format}. In the case of a Dataset it will typically indicate the relevant time period in a precise notation (e.g. for a 2011 census dataset, the year 2011 would be written "2011/2012"). Other forms of content e.g. ScholarlyArticle, Book, TVSeries or TVEpisode may indicate their temporalCoverage in broader terms - textually or via well-known URL. Written works such as books may sometimes have precise temporal coverage too, e.g. a work set in 1939 - 1945 can be indicated in ISO 8601 interval format format via "1939/1945".
     *
     * Open-ended date ranges can be written with ".." in place of the end date. For example, "2015-11/.." indicates a range beginning in November 2015 and with no specified final date. This is tentative and might be updated in future when ISO 8601 is officially updated.
     */
    "schema:temporalCoverage"?: SchemaValue<DateTime | Text | URL, "schema:temporalCoverage">;
    /** The textual content of this CreativeWork. */
    "schema:text"?: SchemaValue<Text, "schema:text">;
    /** A thumbnail image relevant to the Thing. */
    "schema:thumbnailUrl"?: SchemaValue<URL, "schema:thumbnailUrl">;
    /** Approximate or typical time it takes to work with or through this learning resource for the typical intended target audience, e.g. 'PT30M', 'PT1H25M'. */
    "schema:timeRequired"?: SchemaValue<Duration | IdReference, "schema:timeRequired">;
    /** The work that this work has been translated from. e.g. 物种起源 is a translationOf “On the Origin of Species” */
    "schema:translationOfWork"?: SchemaValue<CreativeWork | IdReference, "schema:translationOfWork">;
    /** Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event. */
    "schema:translator"?: SchemaValue<Organization | Person | IdReference, "schema:translator">;
    /** The typical expected age range, e.g. '7-9', '11-'. */
    "schema:typicalAgeRange"?: SchemaValue<Text, "schema:typicalAgeRange">;
    /**
     * The schema.org {@link https://schema.org/usageInfo usageInfo} property indicates further information about a {@link https://schema.org/CreativeWork CreativeWork}. This property is applicable both to works that are freely available and to those that require payment or other transactions. It can reference additional information e.g. community expectations on preferred linking and citation conventions, as well as purchasing details. For something that can be commercially licensed, usageInfo can provide detailed, resource-specific information about licensing options.
     *
     * This property can be used alongside the license property which indicates license(s) applicable to some piece of content. The usageInfo property can provide information about other licensing options, e.g. acquiring commercial usage rights for an image that is also available under non-commercial creative commons licenses.
     */
    "schema:usageInfo"?: SchemaValue<CreativeWork | URL | IdReference, "schema:usageInfo">;
    /** The version of the CreativeWork embodied by a specified resource. */
    "schema:version"?: SchemaValue<Number | Text, "schema:version">;
    /** An embedded video object. */
    "schema:video"?: SchemaValue<Clip | VideoObject | IdReference, "schema:video">;
    /** Example/instance/realization/derivation of the concept of this creative work. eg. The paperback edition, first edition, or eBook. */
    "schema:workExample"?: SchemaValue<CreativeWork | IdReference, "schema:workExample">;
    /** A work that is a translation of the content of this work. e.g. 西遊記 has an English workTranslation “Journey to the West”,a German workTranslation “Monkeys Pilgerfahrt” and a Vietnamese translation Tây du ký bình khảo. */
    "schema:workTranslation"?: SchemaValue<CreativeWork | IdReference, "schema:workTranslation">;
}
interface CreativeWorkLeaf extends CreativeWorkBase {
    "@type": "schema:CreativeWork";
}
/** The most generic kind of creative work, including books, movies, photographs, software programs, etc. */
export type CreativeWork = CreativeWorkLeaf | AmpStory | ArchiveComponent | Article | Atlas | Blog | Book | Chapter | Claim | Clip | Code | Collection | ComicStory | Comment | Conversation | Course | CreativeWorkSeason | CreativeWorkSeries | DataCatalog | Dataset | DefinedTermSet | Diet | DigitalDocument | Drawing | EducationalOccupationalCredential | Episode | ExercisePlan | Game | Guide | HowTo | HowToDirection | HowToSection | HowToStep | HowToTip | HyperToc | HyperTocEntry | LearningResource | Legislation | Manuscript | Map | MathSolver | MediaObject | MediaReviewItem | Menu | MenuSection | Message | Movie | MusicComposition | MusicPlaylist | MusicRecording | Painting | Photograph | Play | Poster | PublicationIssue | PublicationVolume | Quotation | Review | Sculpture | Season | SheetMusic | ShortStory | SoftwareApplication | SoftwareSourceCode | SpecialAnnouncement | Statement | Thesis | TVSeason | TVSeries | VisualArtwork | WebContent | WebPage | WebPageElement | WebSite;

interface CreativeWorkSeasonBase extends CreativeWorkBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:endDate"?: SchemaValue<Date | DateTime, "schema:endDate">;
    /** An episode of a tv, radio or game media within a series or season. */
    "schema:episode"?: SchemaValue<Episode | IdReference, "schema:episode">;
    /**
     * An episode of a TV/radio series or season.
     *
     * @deprecated Consider using https://schema.org/episode instead.
     */
    "schema:episodes"?: SchemaValue<Episode | IdReference, "schema:episodes">;
    /** The number of episodes in this season or series. */
    "schema:numberOfEpisodes"?: SchemaValue<Integer, "schema:numberOfEpisodes">;
    /** The series to which this episode or season belongs. */
    "schema:partOfSeries"?: SchemaValue<CreativeWorkSeries | IdReference, "schema:partOfSeries">;
    /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
    "schema:productionCompany"?: SchemaValue<Organization | IdReference, "schema:productionCompany">;
    /** Position of the season within an ordered group of seasons. */
    "schema:seasonNumber"?: SchemaValue<Integer | Text, "schema:seasonNumber">;
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:startDate"?: SchemaValue<Date | DateTime, "schema:startDate">;
    /** The trailer of a movie or tv/radio series, season, episode, etc. */
    "schema:trailer"?: SchemaValue<VideoObject | IdReference, "schema:trailer">;
}
interface CreativeWorkSeasonLeaf extends CreativeWorkSeasonBase {
    "@type": "schema:CreativeWorkSeason";
}
/** A media season e.g. tv, radio, video game etc. */
export type CreativeWorkSeason = CreativeWorkSeasonLeaf | PodcastSeason | RadioSeason | TVSeason;

interface CreativeWorkSeriesBase extends CreativeWorkBase, ThingBase {
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:endDate"?: SchemaValue<Date | DateTime, "schema:endDate">;
    /** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
    "schema:issn"?: SchemaValue<Text, "schema:issn">;
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:startDate"?: SchemaValue<Date | DateTime, "schema:startDate">;
}
interface CreativeWorkSeriesLeaf extends CreativeWorkSeriesBase {
    "@type": "schema:CreativeWorkSeries";
}
/**
 * A CreativeWorkSeries in schema.org is a group of related items, typically but not necessarily of the same kind. CreativeWorkSeries are usually organized into some order, often chronological. Unlike {@link https://schema.org/ItemList ItemList} which is a general purpose data structure for lists of things, the emphasis with CreativeWorkSeries is on published materials (written e.g. books and periodicals, or media such as tv, radio and games).
 *
 * Specific subtypes are available for describing {@link https://schema.org/TVSeries TVSeries}, {@link https://schema.org/RadioSeries RadioSeries}, {@link https://schema.org/MovieSeries MovieSeries}, {@link https://schema.org/BookSeries BookSeries}, {@link https://schema.org/Periodical Periodical} and {@link https://schema.org/VideoGameSeries VideoGameSeries}. In each case, the {@link https://schema.org/hasPart hasPart} / {@link https://schema.org/isPartOf isPartOf} properties can be used to relate the CreativeWorkSeries to its parts. The general CreativeWorkSeries type serves largely just to organize these more specific and practical subtypes.
 *
 * It is common for properties applicable to an item from the series to be usefully applied to the containing group. Schema.org attempts to anticipate some of these cases, but publishers should be free to apply properties of the series parts to the series as a whole wherever they seem appropriate.
 */
export type CreativeWorkSeries = CreativeWorkSeriesLeaf | BookSeries | MovieSeries | Periodical | PodcastSeries | RadioSeries | TVSeries | VideoGameSeries;

interface CreditCardBase extends PaymentCardBase, LoanOrCreditBase {
}
interface CreditCardLeaf extends CreditCardBase {
    "@type": "schema:CreditCard";
}
/**
 * A card payment method of a particular brand or name. Used to mark up a particular payment method and/or the financial product/service that supplies the card account.
 *
 * Commonly used values:
 * - http://purl.org/goodrelations/v1#AmericanExpress
 * - http://purl.org/goodrelations/v1#DinersClub
 * - http://purl.org/goodrelations/v1#Discover
 * - http://purl.org/goodrelations/v1#JCB
 * - http://purl.org/goodrelations/v1#MasterCard
 * - http://purl.org/goodrelations/v1#VISA
 */
export type CreditCard = CreditCardLeaf;

interface CrematoriumLeaf extends CivicStructureBase {
    "@type": "schema:Crematorium";
}
/** A crematorium. */
export type Crematorium = CrematoriumLeaf | string;

interface CriticReviewLeaf extends ReviewBase {
    "@type": "schema:CriticReview";
}
/** A {@link https://schema.org/CriticReview CriticReview} is a more specialized form of Review written or published by a source that is recognized for its reviewing activities. These can include online columns, travel and food guides, TV and radio shows, blogs and other independent Web sites. {@link https://schema.org/CriticReview CriticReview}s are typically more in-depth and professionally written. For simpler, casually written user/visitor/viewer/customer reviews, it is more appropriate to use the {@link https://schema.org/UserReview UserReview} type. Review aggregator sites such as Metacritic already separate out the site's user reviews from selected critic reviews that originate from third-party sources. */
export type CriticReview = CriticReviewLeaf | ReviewNewsArticle;

/** Text representing a CSS selector. */
export type CssSelectorType = string;

interface CurrencyConversionServiceLeaf extends FinancialProductBase {
    "@type": "schema:CurrencyConversionService";
}
/** A service to convert funds from one currency to another currency. */
export type CurrencyConversionService = CurrencyConversionServiceLeaf;

interface DanceEventLeaf extends EventBase {
    "@type": "schema:DanceEvent";
}
/** Event type: A social dance. */
export type DanceEvent = DanceEventLeaf;

interface DanceGroupLeaf extends OrganizationBase {
    "@type": "schema:DanceGroup";
}
/** A dance group—for example, the Alvin Ailey Dance Theater or Riverdance. */
export type DanceGroup = DanceGroupLeaf | string;

interface DataCatalogBase extends CreativeWorkBase {
    /** A dataset contained in this catalog. */
    "schema:dataset"?: SchemaValue<Dataset | IdReference, "schema:dataset">;
    /**
     * A technique or technology used in a {@link https://schema.org/Dataset Dataset} (or {@link https://schema.org/DataDownload DataDownload}, {@link https://schema.org/DataCatalog DataCatalog}), corresponding to the method used for measuring the corresponding variable(s) (described using {@link https://schema.org/variableMeasured variableMeasured}). This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but rather as a high level summary for dataset discovery.
     *
     * For example, if {@link https://schema.org/variableMeasured variableMeasured} is: molecule concentration, {@link https://schema.org/measurementTechnique measurementTechnique} could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence".
     *
     * If the {@link https://schema.org/variableMeasured variableMeasured} is "depression rating", the {@link https://schema.org/measurementTechnique measurementTechnique} could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".
     *
     * If there are several {@link https://schema.org/variableMeasured variableMeasured} properties recorded for some given data object, use a {@link https://schema.org/PropertyValue PropertyValue} for each {@link https://schema.org/variableMeasured variableMeasured} and attach the corresponding {@link https://schema.org/measurementTechnique measurementTechnique}.
     */
    "schema:measurementTechnique"?: SchemaValue<Text | URL, "schema:measurementTechnique">;
}
interface DataCatalogLeaf extends DataCatalogBase {
    "@type": "schema:DataCatalog";
}
/** A collection of datasets. */
export type DataCatalog = DataCatalogLeaf;

interface DataDownloadBase extends MediaObjectBase {
    /**
     * A technique or technology used in a {@link https://schema.org/Dataset Dataset} (or {@link https://schema.org/DataDownload DataDownload}, {@link https://schema.org/DataCatalog DataCatalog}), corresponding to the method used for measuring the corresponding variable(s) (described using {@link https://schema.org/variableMeasured variableMeasured}). This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but rather as a high level summary for dataset discovery.
     *
     * For example, if {@link https://schema.org/variableMeasured variableMeasured} is: molecule concentration, {@link https://schema.org/measurementTechnique measurementTechnique} could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence".
     *
     * If the {@link https://schema.org/variableMeasured variableMeasured} is "depression rating", the {@link https://schema.org/measurementTechnique measurementTechnique} could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".
     *
     * If there are several {@link https://schema.org/variableMeasured variableMeasured} properties recorded for some given data object, use a {@link https://schema.org/PropertyValue PropertyValue} for each {@link https://schema.org/variableMeasured variableMeasured} and attach the corresponding {@link https://schema.org/measurementTechnique measurementTechnique}.
     */
    "schema:measurementTechnique"?: SchemaValue<Text | URL, "schema:measurementTechnique">;
}
interface DataDownloadLeaf extends DataDownloadBase {
    "@type": "schema:DataDownload";
}
/** A dataset in downloadable form. */
export type DataDownload = DataDownloadLeaf;

interface DataFeedBase extends DatasetBase {
    /** An item within in a data feed. Data feeds may have many elements. */
    "schema:dataFeedElement"?: SchemaValue<DataFeedItem | Text | Thing | IdReference, "schema:dataFeedElement">;
}
interface DataFeedLeaf extends DataFeedBase {
    "@type": "schema:DataFeed";
}
/** A single feed providing structured information about one or more entities or topics. */
export type DataFeed = DataFeedLeaf | CompleteDataFeed;

interface DataFeedItemBase extends ThingBase {
    /** The date on which the CreativeWork was created or the item was added to a DataFeed. */
    "schema:dateCreated"?: SchemaValue<Date | DateTime, "schema:dateCreated">;
    /** The datetime the item was removed from the DataFeed. */
    "schema:dateDeleted"?: SchemaValue<Date | DateTime, "schema:dateDeleted">;
    /** The date on which the CreativeWork was most recently modified or when the item's entry was modified within a DataFeed. */
    "schema:dateModified"?: SchemaValue<Date | DateTime, "schema:dateModified">;
    /** An entity represented by an entry in a list or data feed (e.g. an 'artist' in a list of 'artists')’. */
    "schema:item"?: SchemaValue<Thing | IdReference, "schema:item">;
}
interface DataFeedItemLeaf extends DataFeedItemBase {
    "@type": "schema:DataFeedItem";
}
/** A single item within a larger data feed. */
export type DataFeedItem = DataFeedItemLeaf;

interface DatasetBase extends CreativeWorkBase {
    /**
     * A data catalog which contains this dataset.
     *
     * @deprecated Consider using https://schema.org/includedInDataCatalog instead.
     */
    "schema:catalog"?: SchemaValue<DataCatalog | IdReference, "schema:catalog">;
    /**
     * The range of temporal applicability of a dataset, e.g. for a 2011 census dataset, the year 2011 (in ISO 8601 time interval format).
     *
     * @deprecated Consider using https://schema.org/temporalCoverage instead.
     */
    "schema:datasetTimeInterval"?: SchemaValue<DateTime, "schema:datasetTimeInterval">;
    /** A downloadable form of this dataset, at a specific location, in a specific format. */
    "schema:distribution"?: SchemaValue<DataDownload | IdReference, "schema:distribution">;
    /**
     * A data catalog which contains this dataset (this property was previously 'catalog', preferred name is now 'includedInDataCatalog').
     *
     * @deprecated Consider using https://schema.org/includedInDataCatalog instead.
     */
    "schema:includedDataCatalog"?: SchemaValue<DataCatalog | IdReference, "schema:includedDataCatalog">;
    /** A data catalog which contains this dataset. */
    "schema:includedInDataCatalog"?: SchemaValue<DataCatalog | IdReference, "schema:includedInDataCatalog">;
    /** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
    "schema:issn"?: SchemaValue<Text, "schema:issn">;
    /**
     * A technique or technology used in a {@link https://schema.org/Dataset Dataset} (or {@link https://schema.org/DataDownload DataDownload}, {@link https://schema.org/DataCatalog DataCatalog}), corresponding to the method used for measuring the corresponding variable(s) (described using {@link https://schema.org/variableMeasured variableMeasured}). This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but rather as a high level summary for dataset discovery.
     *
     * For example, if {@link https://schema.org/variableMeasured variableMeasured} is: molecule concentration, {@link https://schema.org/measurementTechnique measurementTechnique} could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence".
     *
     * If the {@link https://schema.org/variableMeasured variableMeasured} is "depression rating", the {@link https://schema.org/measurementTechnique measurementTechnique} could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".
     *
     * If there are several {@link https://schema.org/variableMeasured variableMeasured} properties recorded for some given data object, use a {@link https://schema.org/PropertyValue PropertyValue} for each {@link https://schema.org/variableMeasured variableMeasured} and attach the corresponding {@link https://schema.org/measurementTechnique measurementTechnique}.
     */
    "schema:measurementTechnique"?: SchemaValue<Text | URL, "schema:measurementTechnique">;
    /** The variableMeasured property can indicate (repeated as necessary) the variables that are measured in some dataset, either described as text or as pairs of identifier and description using PropertyValue. */
    "schema:variableMeasured"?: SchemaValue<PropertyValue | Text | IdReference, "schema:variableMeasured">;
}
interface DatasetLeaf extends DatasetBase {
    "@type": "schema:Dataset";
}
/** A body of structured information describing some topic(s) of interest. */
export type Dataset = DatasetLeaf | DataFeed;

interface DatedMoneySpecificationBase extends ThingBase {
    /** The amount of money. */
    "schema:amount"?: SchemaValue<MonetaryAmount | Number | IdReference, "schema:amount">;
    /**
     * The currency in which the monetary amount is expressed.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:currency"?: SchemaValue<Text, "schema:currency">;
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:endDate"?: SchemaValue<Date | DateTime, "schema:endDate">;
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:startDate"?: SchemaValue<Date | DateTime, "schema:startDate">;
}
interface DatedMoneySpecificationLeaf extends DatedMoneySpecificationBase {
    "@type": "schema:DatedMoneySpecification";
}
/**
 * A DatedMoneySpecification represents monetary values with optional start and end dates. For example, this could represent an employee's salary over a specific period of time. __Note:__ This type has been superseded by {@link https://schema.org/MonetaryAmount MonetaryAmount} use of that type is recommended
 *
 * @deprecated Use MonetaryAmount instead.
 */
export type DatedMoneySpecification = DatedMoneySpecificationLeaf;

interface DatepickerLeaf extends UIElementBase {
    "@type": "uxi:Datepicker";
}
/** A Datepicker is a UI element which lets users select a date, often as part of a form, and often displaying a minimizedState with the current date pre-set. Clicking it opens a minimal interface to help select a different date. Consider different date formats and keyboard input as well, and using a Timepicker fo finer control. */
export type Datepicker = DatepickerLeaf;

interface DayOfWeekLeaf extends EnumerationBase {
    "@type": "schema:DayOfWeek";
}
/**
 * The day of the week, e.g. used to specify to which day the opening hours of an OpeningHoursSpecification refer.
 *
 * Originally, URLs from {@link http://purl.org/goodrelations/v1 GoodRelations} were used (for {@link https://schema.org/Monday Monday}, {@link https://schema.org/Tuesday Tuesday}, {@link https://schema.org/Wednesday Wednesday}, {@link https://schema.org/Thursday Thursday}, {@link https://schema.org/Friday Friday}, {@link https://schema.org/Saturday Saturday}, {@link https://schema.org/Sunday Sunday} plus a special entry for {@link https://schema.org/PublicHolidays PublicHolidays}); these have now been integrated directly into schema.org.
 */
export type DayOfWeek = "https://schema.org/Friday" | "schema:Friday" | "https://schema.org/Monday" | "schema:Monday" | "https://schema.org/PublicHolidays" | "schema:PublicHolidays" | "https://schema.org/Saturday" | "schema:Saturday" | "https://schema.org/Sunday" | "schema:Sunday" | "https://schema.org/Thursday" | "schema:Thursday" | "https://schema.org/Tuesday" | "schema:Tuesday" | "https://schema.org/Wednesday" | "schema:Wednesday" | DayOfWeekLeaf;

interface DaySpaLeaf extends LocalBusinessBase {
    "@type": "schema:DaySpa";
}
/** A day spa. */
export type DaySpa = DaySpaLeaf | string;

interface DDxElementBase extends MedicalEntityBase {
    /** One or more alternative conditions considered in the differential diagnosis process as output of a diagnosis process. */
    "schema:diagnosis"?: SchemaValue<MedicalCondition | IdReference, "schema:diagnosis">;
    /** One of a set of signs and symptoms that can be used to distinguish this diagnosis from others in the differential diagnosis. */
    "schema:distinguishingSign"?: SchemaValue<MedicalSignOrSymptom | IdReference, "schema:distinguishingSign">;
}
interface DDxElementLeaf extends DDxElementBase {
    "@type": "schema:DDxElement";
}
/** An alternative, closely-related condition typically considered later in the differential diagnosis process along with the signs that are used to distinguish it. */
export type DDxElement = DDxElementLeaf;

interface DeactivateActionLeaf extends ActionBase {
    "@type": "schema:DeactivateAction";
}
/** The act of stopping or deactivating a device or application (e.g. stopping a timer or turning off a flashlight). */
export type DeactivateAction = DeactivateActionLeaf;

interface DefaultLeaf extends ElementBase {
    "@type": "uxi:Default";
}
/** UI elements have default priority or importance when they add information that doesn't require a reaction, such as banners that point to new features */
export type Default = DefaultLeaf;

interface DefenceEstablishmentLeaf extends CivicStructureBase {
    "@type": "schema:DefenceEstablishment";
}
/** A defence establishment, such as an army or navy base. */
export type DefenceEstablishment = DefenceEstablishmentLeaf | string;

interface DefinedRegionBase extends ThingBase {
    /** The country. For example, USA. You can also provide the two-letter {@link http://en.wikipedia.org/wiki/ISO_3166-1 ISO 3166-1 alpha-2 country code}. */
    "schema:addressCountry"?: SchemaValue<Country | Text | IdReference, "schema:addressCountry">;
    /** The region in which the locality is, and which is in the country. For example, California or another appropriate first-level {@link https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country Administrative division} */
    "schema:addressRegion"?: SchemaValue<Text, "schema:addressRegion">;
    /** The postal code. For example, 94043. */
    "schema:postalCode"?: SchemaValue<Text, "schema:postalCode">;
    /** A defined range of postal codes indicated by a common textual prefix. Used for non-numeric systems such as UK. */
    "schema:postalCodePrefix"?: SchemaValue<Text, "schema:postalCodePrefix">;
    /** A defined range of postal codes. */
    "schema:postalCodeRange"?: SchemaValue<PostalCodeRangeSpecification | IdReference, "schema:postalCodeRange">;
}
interface DefinedRegionLeaf extends DefinedRegionBase {
    "@type": "schema:DefinedRegion";
}
/**
 * A DefinedRegion is a geographic area defined by potentially arbitrary (rather than political, administrative or natural geographical) criteria. Properties are provided for defining a region by reference to sets of postal codes.
 *
 * Examples: a delivery destination when shopping. Region where regional pricing is configured.
 *
 * Requirement 1: Country: US States: "NY", "CA"
 *
 * Requirement 2: Country: US PostalCode Set: { [94000-94585], [97000, 97999], [13000, 13599]} { [12345, 12345], [78945, 78945], } Region = state, canton, prefecture, autonomous community...
 */
export type DefinedRegion = DefinedRegionLeaf;

interface DefinedTermBase extends ThingBase {
    /** A {@link https://schema.org/DefinedTermSet DefinedTermSet} that contains this term. */
    "schema:inDefinedTermSet"?: SchemaValue<DefinedTermSet | URL | IdReference, "schema:inDefinedTermSet">;
    /** A code that identifies this {@link https://schema.org/DefinedTerm DefinedTerm} within a {@link https://schema.org/DefinedTermSet DefinedTermSet} */
    "schema:termCode"?: SchemaValue<Text, "schema:termCode">;
}
interface DefinedTermLeaf extends DefinedTermBase {
    "@type": "schema:DefinedTerm";
}
/** A word, name, acronym, phrase, etc. with a formal definition. Often used in the context of category or subject classification, glossaries or dictionaries, product or creative work types, etc. Use the name property for the term being defined, use termCode if the term has an alpha-numeric code allocated, use description to provide the definition of the term. */
export type DefinedTerm = DefinedTermLeaf | CategoryCode;

interface DefinedTermSetBase extends CreativeWorkBase {
    /** A Defined Term contained in this term set. */
    "schema:hasDefinedTerm"?: SchemaValue<DefinedTerm | IdReference, "schema:hasDefinedTerm">;
}
interface DefinedTermSetLeaf extends DefinedTermSetBase {
    "@type": "schema:DefinedTermSet";
}
/** A set of defined terms for example a set of categories or a classification scheme, a glossary, dictionary or enumeration. */
export type DefinedTermSet = DefinedTermSetLeaf | CategoryCodeSet;

interface DeleteActionLeaf extends UpdateActionBase {
    "@type": "schema:DeleteAction";
}
/** The act of editing a recipient by removing one of its objects. */
export type DeleteAction = DeleteActionLeaf | UIDeleteAction;

interface DeliveryChargeSpecificationBase extends PriceSpecificationBase {
    /** The delivery method(s) to which the delivery charge or payment charge specification applies. */
    "schema:appliesToDeliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:appliesToDeliveryMethod">;
    /** The geographic area where a service or offered item is provided. */
    "schema:areaServed"?: SchemaValue<AdministrativeArea | GeoShape | Place | Text | IdReference, "schema:areaServed">;
    /**
     * The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is valid.
     *
     * See also {@link https://schema.org/ineligibleRegion ineligibleRegion}.
     */
    "schema:eligibleRegion"?: SchemaValue<GeoShape | Place | Text | IdReference, "schema:eligibleRegion">;
    /**
     * The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.
     *
     * See also {@link https://schema.org/eligibleRegion eligibleRegion}.
     */
    "schema:ineligibleRegion"?: SchemaValue<GeoShape | Place | Text | IdReference, "schema:ineligibleRegion">;
}
interface DeliveryChargeSpecificationLeaf extends DeliveryChargeSpecificationBase {
    "@type": "schema:DeliveryChargeSpecification";
}
/** The price for the delivery of an offer using a particular delivery method. */
export type DeliveryChargeSpecification = DeliveryChargeSpecificationLeaf;

interface DeliveryEventBase extends EventBase {
    /** Password, PIN, or access code needed for delivery (e.g. from a locker). */
    "schema:accessCode"?: SchemaValue<Text, "schema:accessCode">;
    /** When the item is available for pickup from the store, locker, etc. */
    "schema:availableFrom"?: SchemaValue<DateTime, "schema:availableFrom">;
    /** After this date, the item will no longer be available for pickup. */
    "schema:availableThrough"?: SchemaValue<DateTime, "schema:availableThrough">;
    /** Method used for delivery or shipping. */
    "schema:hasDeliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:hasDeliveryMethod">;
}
interface DeliveryEventLeaf extends DeliveryEventBase {
    "@type": "schema:DeliveryEvent";
}
/** An event involving the delivery of an item. */
export type DeliveryEvent = DeliveryEventLeaf;

interface DeliveryMethodLeaf extends EnumerationBase {
    "@type": "schema:DeliveryMethod";
}
/**
 * A delivery method is a standardized procedure for transferring the product or service to the destination of fulfillment chosen by the customer. Delivery methods are characterized by the means of transportation used, and by the organization or group that is the contracting party for the sending organization or person.
 *
 * Commonly used values:
 * - http://purl.org/goodrelations/v1#DeliveryModeDirectDownload
 * - http://purl.org/goodrelations/v1#DeliveryModeFreight
 * - http://purl.org/goodrelations/v1#DeliveryModeMail
 * - http://purl.org/goodrelations/v1#DeliveryModeOwnFleet
 * - http://purl.org/goodrelations/v1#DeliveryModePickUp
 * - http://purl.org/goodrelations/v1#DHL
 * - http://purl.org/goodrelations/v1#FederalExpress
 * - http://purl.org/goodrelations/v1#UPS
 */
export type DeliveryMethod = "https://schema.org/LockerDelivery" | "schema:LockerDelivery" | "https://schema.org/OnSitePickup" | "schema:OnSitePickup" | "https://schema.org/ParcelService" | "schema:ParcelService" | DeliveryMethodLeaf;

interface DeliveryTimeSettingsBase extends ThingBase {
    /** The total delay between the receipt of the order and the goods reaching the final customer. */
    "schema:deliveryTime"?: SchemaValue<ShippingDeliveryTime | IdReference, "schema:deliveryTime">;
    /** This can be marked 'true' to indicate that some published {@link https://schema.org/DeliveryTimeSettings DeliveryTimeSettings} or {@link https://schema.org/ShippingRateSettings ShippingRateSettings} are intended to apply to all {@link https://schema.org/OfferShippingDetails OfferShippingDetails} published by the same merchant, when referenced by a {@link https://schema.org/shippingSettingsLink shippingSettingsLink} in those settings. It is not meaningful to use a 'true' value for this property alongside a transitTimeLabel (for {@link https://schema.org/DeliveryTimeSettings DeliveryTimeSettings}) or shippingLabel (for {@link https://schema.org/ShippingRateSettings ShippingRateSettings}), since this property is for use with unlabelled settings. */
    "schema:isUnlabelledFallback"?: SchemaValue<Boolean, "schema:isUnlabelledFallback">;
    /** indicates (possibly multiple) shipping destinations. These can be defined in several ways e.g. postalCode ranges. */
    "schema:shippingDestination"?: SchemaValue<DefinedRegion | IdReference, "schema:shippingDestination">;
    /** Label to match an {@link https://schema.org/OfferShippingDetails OfferShippingDetails} with a {@link https://schema.org/DeliveryTimeSettings DeliveryTimeSettings} (within the context of a {@link https://schema.org/shippingSettingsLink shippingSettingsLink} cross-reference). */
    "schema:transitTimeLabel"?: SchemaValue<Text, "schema:transitTimeLabel">;
}
interface DeliveryTimeSettingsLeaf extends DeliveryTimeSettingsBase {
    "@type": "schema:DeliveryTimeSettings";
}
/** A DeliveryTimeSettings represents re-usable pieces of shipping information, relating to timing. It is designed for publication on an URL that may be referenced via the {@link https://schema.org/shippingSettingsLink shippingSettingsLink} property of a {@link https://schema.org/OfferShippingDetails OfferShippingDetails}. Several occurrences can be published, distinguished (and identified/referenced) by their different values for {@link https://schema.org/transitTimeLabel transitTimeLabel}. */
export type DeliveryTimeSettings = DeliveryTimeSettingsLeaf;

interface DemandBase extends ThingBase {
    /** The payment method(s) accepted by seller for this offer. */
    "schema:acceptedPaymentMethod"?: SchemaValue<LoanOrCredit | PaymentMethod | IdReference, "schema:acceptedPaymentMethod">;
    /** The amount of time that is required between accepting the offer and the actual usage of the resource or service. */
    "schema:advanceBookingRequirement"?: SchemaValue<QuantitativeValue | IdReference, "schema:advanceBookingRequirement">;
    /** The geographic area where a service or offered item is provided. */
    "schema:areaServed"?: SchemaValue<AdministrativeArea | GeoShape | Place | Text | IdReference, "schema:areaServed">;
    /** The availability of this item—for example In stock, Out of stock, Pre-order, etc. */
    "schema:availability"?: SchemaValue<ItemAvailability | IdReference, "schema:availability">;
    /** The end of the availability of the product or service included in the offer. */
    "schema:availabilityEnds"?: SchemaValue<Date | DateTime | Time, "schema:availabilityEnds">;
    /** The beginning of the availability of the product or service included in the offer. */
    "schema:availabilityStarts"?: SchemaValue<Date | DateTime | Time, "schema:availabilityStarts">;
    /** The place(s) from which the offer can be obtained (e.g. store locations). */
    "schema:availableAtOrFrom"?: SchemaValue<Place | IdReference, "schema:availableAtOrFrom">;
    /** The delivery method(s) available for this offer. */
    "schema:availableDeliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:availableDeliveryMethod">;
    /** The business function (e.g. sell, lease, repair, dispose) of the offer or component of a bundle (TypeAndQuantityNode). The default is http://purl.org/goodrelations/v1#Sell. */
    "schema:businessFunction"?: SchemaValue<BusinessFunction | IdReference, "schema:businessFunction">;
    /** The typical delay between the receipt of the order and the goods either leaving the warehouse or being prepared for pickup, in case the delivery method is on site pickup. */
    "schema:deliveryLeadTime"?: SchemaValue<QuantitativeValue | IdReference, "schema:deliveryLeadTime">;
    /** The type(s) of customers for which the given offer is valid. */
    "schema:eligibleCustomerType"?: SchemaValue<BusinessEntityType | IdReference, "schema:eligibleCustomerType">;
    /** The duration for which the given offer is valid. */
    "schema:eligibleDuration"?: SchemaValue<QuantitativeValue | IdReference, "schema:eligibleDuration">;
    /** The interval and unit of measurement of ordering quantities for which the offer or price specification is valid. This allows e.g. specifying that a certain freight charge is valid only for a certain quantity. */
    "schema:eligibleQuantity"?: SchemaValue<QuantitativeValue | IdReference, "schema:eligibleQuantity">;
    /**
     * The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is valid.
     *
     * See also {@link https://schema.org/ineligibleRegion ineligibleRegion}.
     */
    "schema:eligibleRegion"?: SchemaValue<GeoShape | Place | Text | IdReference, "schema:eligibleRegion">;
    /** The transaction volume, in a monetary unit, for which the offer or price specification is valid, e.g. for indicating a minimal purchasing volume, to express free shipping above a certain order volume, or to limit the acceptance of credit cards to purchases to a certain minimal amount. */
    "schema:eligibleTransactionVolume"?: SchemaValue<PriceSpecification | IdReference, "schema:eligibleTransactionVolume">;
    /** A Global Trade Item Number ({@link https://www.gs1.org/standards/id-keys/gtin GTIN}). GTINs identify trade items, including products and services, using numeric identification codes. The {@link https://schema.org/gtin gtin} property generalizes the earlier {@link https://schema.org/gtin8 gtin8}, {@link https://schema.org/gtin12 gtin12}, {@link https://schema.org/gtin13 gtin13}, and {@link https://schema.org/gtin14 gtin14} properties. The GS1 {@link https://www.gs1.org/standards/Digital-Link/ digital link specifications} express GTINs as URLs. A correct {@link https://schema.org/gtin gtin} value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a {@link https://www.gs1.org/services/check-digit-calculator valid GS1 check digit} and meet the other rules for valid GTINs. See also {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1's GTIN Summary} and {@link https://en.wikipedia.org/wiki/Global_Trade_Item_Number Wikipedia} for more details. Left-padding of the gtin values is not required or encouraged. */
    "schema:gtin"?: SchemaValue<Text, "schema:gtin">;
    /** The GTIN-12 code of the product, or the product to which the offer refers. The GTIN-12 is the 12-digit GS1 Identification Key composed of a U.P.C. Company Prefix, Item Reference, and Check Digit used to identify trade items. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin12"?: SchemaValue<Text, "schema:gtin12">;
    /** The GTIN-13 code of the product, or the product to which the offer refers. This is equivalent to 13-digit ISBN codes and EAN UCC-13. Former 12-digit UPC codes can be converted into a GTIN-13 code by simply adding a preceding zero. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin13"?: SchemaValue<Text, "schema:gtin13">;
    /** The GTIN-14 code of the product, or the product to which the offer refers. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin14"?: SchemaValue<Text, "schema:gtin14">;
    /** The GTIN-8 code of the product, or the product to which the offer refers. This code is also known as EAN/UCC-8 or 8-digit EAN. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin8"?: SchemaValue<Text, "schema:gtin8">;
    /** This links to a node or nodes indicating the exact quantity of the products included in an {@link https://schema.org/Offer Offer} or {@link https://schema.org/ProductCollection ProductCollection}. */
    "schema:includesObject"?: SchemaValue<TypeAndQuantityNode | IdReference, "schema:includesObject">;
    /**
     * The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.
     *
     * See also {@link https://schema.org/eligibleRegion eligibleRegion}.
     */
    "schema:ineligibleRegion"?: SchemaValue<GeoShape | Place | Text | IdReference, "schema:ineligibleRegion">;
    /** The current approximate inventory level for the item or items. */
    "schema:inventoryLevel"?: SchemaValue<QuantitativeValue | IdReference, "schema:inventoryLevel">;
    /** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
    "schema:itemCondition"?: SchemaValue<OfferItemCondition | IdReference, "schema:itemCondition">;
    /** An item being offered (or demanded). The transactional nature of the offer or demand is documented using {@link https://schema.org/businessFunction businessFunction}, e.g. sell, lease etc. While several common expected types are listed explicitly in this definition, others can be used. Using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:itemOffered"?: SchemaValue<AggregateOffer | CreativeWork | Event | MenuItem | Product | Service | Trip | IdReference, "schema:itemOffered">;
    /** The Manufacturer Part Number (MPN) of the product, or the product to which the offer refers. */
    "schema:mpn"?: SchemaValue<Text, "schema:mpn">;
    /** One or more detailed price specifications, indicating the unit price and delivery or payment charges. */
    "schema:priceSpecification"?: SchemaValue<PriceSpecification | IdReference, "schema:priceSpecification">;
    /** An entity which offers (sells / leases / lends / loans) the services / goods. A seller may also be a provider. */
    "schema:seller"?: SchemaValue<Organization | Person | IdReference, "schema:seller">;
    /** The serial number or any alphanumeric identifier of a particular product. When attached to an offer, it is a shortcut for the serial number of the product included in the offer. */
    "schema:serialNumber"?: SchemaValue<Text, "schema:serialNumber">;
    /** The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service, or the product to which the offer refers. */
    "schema:sku"?: SchemaValue<Text, "schema:sku">;
    /** The date when the item becomes valid. */
    "schema:validFrom"?: SchemaValue<Date | DateTime, "schema:validFrom">;
    /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
    "schema:validThrough"?: SchemaValue<Date | DateTime, "schema:validThrough">;
    /** The warranty promise(s) included in the offer. */
    "schema:warranty"?: SchemaValue<WarrantyPromise | IdReference, "schema:warranty">;
}
interface DemandLeaf extends DemandBase {
    "@type": "schema:Demand";
}
/** A demand entity represents the public, not necessarily binding, not necessarily exclusive, announcement by an organization or person to seek a certain type of goods or services. For describing demand using this type, the very same properties used for Offer apply. */
export type Demand = DemandLeaf;

interface DentistBase extends LocalBusinessBase, MedicalOrganizationBase, LocalBusinessBase {
}
interface DentistLeaf extends DentistBase {
    "@type": "schema:Dentist";
}
/** A dentist. */
export type Dentist = DentistLeaf | string;

interface DepartActionLeaf extends MoveActionBase {
    "@type": "schema:DepartAction";
}
/** The act of departing from a place. An agent departs from an fromLocation for a destination, optionally with participants. */
export type DepartAction = DepartActionLeaf;

interface DepartmentStoreLeaf extends LocalBusinessBase {
    "@type": "schema:DepartmentStore";
}
/** A department store. */
export type DepartmentStore = DepartmentStoreLeaf | string;

interface DepositAccountBase extends BankAccountBase, InvestmentOrDepositBase {
}
interface DepositAccountLeaf extends DepositAccountBase {
    "@type": "schema:DepositAccount";
}
/** A type of Bank Account with a main purpose of depositing funds to gain interest or other benefits. */
export type DepositAccount = DepositAccountLeaf;

interface DermatologyLeaf extends LocalBusinessBase {
    "@type": "schema:Dermatology";
}
/** A specific branch of medical science that pertains to diagnosis and treatment of disorders of skin. */
export type Dermatology = DermatologyLeaf | string;

interface DetailActionLeaf extends UIActionBase {
    "@type": "uxi:DetailAction";
}
/** A user action to get more details about an element. Can mean navigating to a detailed screen, or expanding a minified element on the same page */
export type DetailAction = DetailActionLeaf;

interface DeviceSpecificActionLeaf extends UIActionBase {
    "@type": "uxi:DeviceSpecificAction";
}
/** The root Action class for any interactions that are specific to the device type. E.g. KeyDownAction, ChangeOrientationAction */
export type DeviceSpecificAction = DeviceSpecificActionLeaf | ChangeOrientationAction | ClickAction | KeyDownAction | PointAction | SwipeAction | TouchDownAction;

interface DiagnosticLabBase extends MedicalOrganizationBase {
    /** A diagnostic test or procedure offered by this lab. */
    "schema:availableTest"?: SchemaValue<MedicalTest | IdReference, "schema:availableTest">;
}
interface DiagnosticLabLeaf extends DiagnosticLabBase {
    "@type": "schema:DiagnosticLab";
}
/** A medical laboratory that offers on-site or off-site diagnostic services. */
export type DiagnosticLab = DiagnosticLabLeaf | string;

interface DiagnosticProcedureLeaf extends MedicalProcedureBase {
    "@type": "schema:DiagnosticProcedure";
}
/** A medical procedure intended primarily for diagnostic, as opposed to therapeutic, purposes. */
export type DiagnosticProcedure = DiagnosticProcedureLeaf;

interface DialogLeaf extends UIElementBase {
    "@type": "uxi:Dialog";
}
/** A Dialog is a type of Molecule UI Element shown overlaying the rest of the application, calling for the users direct attention. It informs users about a task and can require decisions, or involve multiple tasks. If it isModal, the user has to interact before continuing to use the application. */
export type Dialog = DialogLeaf;

interface DietBase extends CreativeWorkBase, MedicalEntityBase {
    /** Nutritional information specific to the dietary plan. May include dietary recommendations on what foods to avoid, what foods to consume, and specific alterations/deviations from the USDA or other regulatory body's approved dietary guidelines. */
    "schema:dietFeatures"?: SchemaValue<Text, "schema:dietFeatures">;
    /** People or organizations that endorse the plan. */
    "schema:endorsers"?: SchemaValue<Organization | Person | IdReference, "schema:endorsers">;
    /** Medical expert advice related to the plan. */
    "schema:expertConsiderations"?: SchemaValue<Text, "schema:expertConsiderations">;
    /** Specific physiologic benefits associated to the plan. */
    "schema:physiologicalBenefits"?: SchemaValue<Text, "schema:physiologicalBenefits">;
    /** Specific physiologic risks associated to the diet plan. */
    "schema:risks"?: SchemaValue<Text, "schema:risks">;
}
interface DietLeaf extends DietBase {
    "@type": "schema:Diet";
}
/** A strategy of regulating the intake of food to achieve or maintain a specific health-related goal. */
export type Diet = DietLeaf;

interface DietarySupplementBase extends SubstanceBase {
    /** An active ingredient, typically chemical compounds and/or biologic substances. */
    "schema:activeIngredient"?: SchemaValue<Text, "schema:activeIngredient">;
    /** True if this item's name is a proprietary/brand name (vs. generic name). */
    "schema:isProprietary"?: SchemaValue<Boolean, "schema:isProprietary">;
    /** The drug or supplement's legal status, including any controlled substance schedules that apply. */
    "schema:legalStatus"?: SchemaValue<DrugLegalStatus | MedicalEnumeration | Text | IdReference, "schema:legalStatus">;
    /** The manufacturer of the product. */
    "schema:manufacturer"?: SchemaValue<Organization | IdReference, "schema:manufacturer">;
    /** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
    "schema:maximumIntake"?: SchemaValue<MaximumDoseSchedule | IdReference, "schema:maximumIntake">;
    /** The specific biochemical interaction through which this drug or supplement produces its pharmacological effect. */
    "schema:mechanismOfAction"?: SchemaValue<Text, "schema:mechanismOfAction">;
    /** The generic name of this drug or supplement. */
    "schema:nonProprietaryName"?: SchemaValue<Text, "schema:nonProprietaryName">;
    /** Proprietary name given to the diet plan, typically by its originator or creator. */
    "schema:proprietaryName"?: SchemaValue<Text, "schema:proprietaryName">;
    /** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
    "schema:recommendedIntake"?: SchemaValue<RecommendedDoseSchedule | IdReference, "schema:recommendedIntake">;
    /** Any potential safety concern associated with the supplement. May include interactions with other drugs and foods, pregnancy, breastfeeding, known adverse reactions, and documented efficacy of the supplement. */
    "schema:safetyConsideration"?: SchemaValue<Text, "schema:safetyConsideration">;
    /** Characteristics of the population for which this is intended, or which typically uses it, e.g. 'adults'. */
    "schema:targetPopulation"?: SchemaValue<Text, "schema:targetPopulation">;
}
interface DietarySupplementLeaf extends DietarySupplementBase {
    "@type": "schema:DietarySupplement";
}
/** A product taken by mouth that contains a dietary ingredient intended to supplement the diet. Dietary ingredients may include vitamins, minerals, herbs or other botanicals, amino acids, and substances such as enzymes, organ tissues, glandulars and metabolites. */
export type DietarySupplement = DietarySupplementLeaf;

interface DietNutritionLeaf extends LocalBusinessBase {
    "@type": "schema:DietNutrition";
}
/** Dietetic and nutrition as a medical specialty. */
export type DietNutrition = DietNutritionLeaf | string;

interface DigitalDocumentBase extends CreativeWorkBase {
    /** A permission related to the access to this document (e.g. permission to read or write an electronic document). For a public document, specify a grantee with an Audience with audienceType equal to "public". */
    "schema:hasDigitalDocumentPermission"?: SchemaValue<DigitalDocumentPermission | IdReference, "schema:hasDigitalDocumentPermission">;
}
interface DigitalDocumentLeaf extends DigitalDocumentBase {
    "@type": "schema:DigitalDocument";
}
/** An electronic file or document. */
export type DigitalDocument = DigitalDocumentLeaf | NoteDigitalDocument | PresentationDigitalDocument | SpreadsheetDigitalDocument | TextDigitalDocument;

interface DigitalDocumentPermissionBase extends ThingBase {
    /** The person, organization, contact point, or audience that has been granted this permission. */
    "schema:grantee"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:grantee">;
    /** The type of permission granted the person, organization, or audience. */
    "schema:permissionType"?: SchemaValue<DigitalDocumentPermissionType | IdReference, "schema:permissionType">;
}
interface DigitalDocumentPermissionLeaf extends DigitalDocumentPermissionBase {
    "@type": "schema:DigitalDocumentPermission";
}
/** A permission for a particular person or group to access a particular file. */
export type DigitalDocumentPermission = DigitalDocumentPermissionLeaf;

interface DigitalDocumentPermissionTypeLeaf extends EnumerationBase {
    "@type": "schema:DigitalDocumentPermissionType";
}
/** A type of permission which can be granted for accessing a digital document. */
export type DigitalDocumentPermissionType = "https://schema.org/CommentPermission" | "schema:CommentPermission" | "https://schema.org/ReadPermission" | "schema:ReadPermission" | "https://schema.org/WritePermission" | "schema:WritePermission" | DigitalDocumentPermissionTypeLeaf;

interface DirectoryStructureLeaf extends ContainerUIElementBase {
    "@type": "uxi:DirectoryStructure";
}
/** A Directory Structure or folder structure is a Container UI Element that shows an editable hierarchy of files and folders. Users often use it to categorize content, and create sub-folders. It's helpful to combine this with a quick navigation for frequently or recently visited items, since these structures can be deep. If it's displayed vertically, Users might expect drag and drop to work. */
export type DirectoryStructure = DirectoryStructureLeaf;

interface DisagreeActionLeaf extends ActionBase {
    "@type": "schema:DisagreeAction";
}
/** The act of expressing a difference of opinion with the object. An agent disagrees to/about an object (a proposition, topic or theme) with participants. */
export type DisagreeAction = DisagreeActionLeaf;

interface DiscoverActionLeaf extends ActionBase {
    "@type": "schema:DiscoverAction";
}
/** The act of discovering/finding an object. */
export type DiscoverAction = DiscoverActionLeaf;

interface DiscussionForumPostingLeaf extends SocialMediaPostingBase {
    "@type": "schema:DiscussionForumPosting";
}
/** A posting to a discussion forum. */
export type DiscussionForumPosting = DiscussionForumPostingLeaf;

interface DislikeActionLeaf extends ActionBase {
    "@type": "schema:DislikeAction";
}
/** The act of expressing a negative sentiment about the object. An agent dislikes an object (a proposition, topic or theme) with participants. */
export type DislikeAction = DislikeActionLeaf;

interface DismissActionLeaf extends UIActionBase {
    "@type": "uxi:DismissAction";
}
/** A user action to dismiss a prompt from the application. Can be used e.g. on modals, banners, notifications as the 'little x'-button or on a button with text next to the confirm action, or swiping to dismiss */
export type DismissAction = DismissActionLeaf;

interface DistanceLeaf extends ThingBase {
    "@type": "schema:Distance";
}
/** Properties that take Distances as values are of the form '<Number> <Length unit of measure>'. E.g., '7 ft'. */
export type Distance = DistanceLeaf | string;

interface DistilleryLeaf extends FoodEstablishmentBase {
    "@type": "schema:Distillery";
}
/** A distillery. */
export type Distillery = DistilleryLeaf | string;

interface DividerLeaf extends UIElementBase {
    "@type": "uxi:Divider";
}
/** A Divider is a type of Molecule UI Element which seperates content into clear groups. The simplest form is a horizontal line to split content, but more sophisticated dividers can include branding elements. Useful for creating scroll-to-bottom-of-section UX of a page. */
export type Divider = DividerLeaf;

interface DonateActionBase extends TradeActionBase {
    /** A sub property of participant. The participant who is at the receiving end of the action. */
    "schema:recipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:recipient">;
}
interface DonateActionLeaf extends DonateActionBase {
    "@type": "schema:DonateAction";
}
/** The act of providing goods, services, or money without compensation, often for philanthropic reasons. */
export type DonateAction = DonateActionLeaf;

interface DoseScheduleBase extends MedicalEntityBase {
    /** The unit of the dose, e.g. 'mg'. */
    "schema:doseUnit"?: SchemaValue<Text, "schema:doseUnit">;
    /** The value of the dose, e.g. 500. */
    "schema:doseValue"?: SchemaValue<Number | QualitativeValue | IdReference, "schema:doseValue">;
    /** How often the dose is taken, e.g. 'daily'. */
    "schema:frequency"?: SchemaValue<Text, "schema:frequency">;
    /** Characteristics of the population for which this is intended, or which typically uses it, e.g. 'adults'. */
    "schema:targetPopulation"?: SchemaValue<Text, "schema:targetPopulation">;
}
interface DoseScheduleLeaf extends DoseScheduleBase {
    "@type": "schema:DoseSchedule";
}
/** A specific dosing schedule for a drug or supplement. */
export type DoseSchedule = DoseScheduleLeaf | MaximumDoseSchedule | RecommendedDoseSchedule | ReportedDoseSchedule;

interface DownloadActionLeaf extends TransferActionBase {
    "@type": "schema:DownloadAction";
}
/** The act of downloading an object. */
export type DownloadAction = DownloadActionLeaf;

interface DragActionLeaf extends UIActionBase {
    "@type": "uxi:DragAction";
}
/** A user action to drag an element. Usually combined with a drop action on another element. Typically used to move, copy or link an element to (a group of) other elements. Also check 'DraggingState'. */
export type DragAction = DragActionLeaf;

interface DraggingStateLeaf extends ElementBase {
    "@type": "uxi:DraggingState";
}
/** When the user is dragging an interactive element, it enters the dragging state. For performance reasons it is often better to show a skeleton instead of the full element */
export type DraggingState = DraggingStateLeaf;

interface DrawActionLeaf extends ActionBase {
    "@type": "schema:DrawAction";
}
/** The act of producing a visual/graphical representation of an object, typically with a pen/pencil and paper as instruments. */
export type DrawAction = DrawActionLeaf;

interface DrawingLeaf extends CreativeWorkBase {
    "@type": "schema:Drawing";
}
/** A picture or diagram made with a pencil, pen, or crayon rather than paint. */
export type Drawing = DrawingLeaf;

interface DrinkActionLeaf extends ConsumeActionBase {
    "@type": "schema:DrinkAction";
}
/** The act of swallowing liquids. */
export type DrinkAction = DrinkActionLeaf;

interface DriveWheelConfigurationValueLeaf extends QualitativeValueBase {
    "@type": "schema:DriveWheelConfigurationValue";
}
/** A value indicating which roadwheels will receive torque. */
export type DriveWheelConfigurationValue = "https://schema.org/AllWheelDriveConfiguration" | "schema:AllWheelDriveConfiguration" | "https://schema.org/FourWheelDriveConfiguration" | "schema:FourWheelDriveConfiguration" | "https://schema.org/FrontWheelDriveConfiguration" | "schema:FrontWheelDriveConfiguration" | "https://schema.org/RearWheelDriveConfiguration" | "schema:RearWheelDriveConfiguration" | DriveWheelConfigurationValueLeaf;

interface DropActionLeaf extends UIActionBase {
    "@type": "uxi:DropAction";
}
/** A user action to drop an element. Usually combined with a drag action on another element, but sometimes used to drop the same element more than once on a number of other elements, e.g. a 'brush' of images in an image editor */
export type DropAction = DropActionLeaf;

interface DropdownBase extends UIElementBase {
    /** The technical position of the item that the user has selected */
    "uxi:selectedIndex"?: SchemaValue<Number, "uxi:selectedIndex">;
    /** A set to express that there are multiple selected items */
    "uxi:selectedSet"?: SchemaValue<Number, "uxi:selectedSet">;
    /** A set to express that some items are not selected */
    "uxi:unselectedSet"?: SchemaValue<Number, "uxi:unselectedSet">;
}
interface DropdownLeaf extends DropdownBase {
    "@type": "uxi:Dropdown";
}
/** A Dropdown is a type of Molecule UI Element which lets users select one item of a set, changing the selectedIndex-property. More sophisticated dropdowns allow selecting multipe items, changing the selectedSet. The type of items can range from text to thumbnails of images and more. */
export type Dropdown = DropdownLeaf;

interface DrugBase extends SubstanceBase {
    /** An active ingredient, typically chemical compounds and/or biologic substances. */
    "schema:activeIngredient"?: SchemaValue<Text, "schema:activeIngredient">;
    /** A route by which this drug may be administered, e.g. 'oral'. */
    "schema:administrationRoute"?: SchemaValue<Text, "schema:administrationRoute">;
    /** Any precaution, guidance, contraindication, etc. related to consumption of alcohol while taking this drug. */
    "schema:alcoholWarning"?: SchemaValue<Text, "schema:alcoholWarning">;
    /** An available dosage strength for the drug. */
    "schema:availableStrength"?: SchemaValue<DrugStrength | IdReference, "schema:availableStrength">;
    /** Any precaution, guidance, contraindication, etc. related to this drug's use by breastfeeding mothers. */
    "schema:breastfeedingWarning"?: SchemaValue<Text, "schema:breastfeedingWarning">;
    /**
     * Description of the absorption and elimination of drugs, including their concentration (pharmacokinetics, pK) and biological effects (pharmacodynamics, pD).
     *
     * @deprecated Consider using https://schema.org/clinicalPharmacology instead.
     */
    "schema:clincalPharmacology"?: SchemaValue<Text, "schema:clincalPharmacology">;
    /** Description of the absorption and elimination of drugs, including their concentration (pharmacokinetics, pK) and biological effects (pharmacodynamics, pD). */
    "schema:clinicalPharmacology"?: SchemaValue<Text, "schema:clinicalPharmacology">;
    /** A dosage form in which this drug/supplement is available, e.g. 'tablet', 'suspension', 'injection'. */
    "schema:dosageForm"?: SchemaValue<Text, "schema:dosageForm">;
    /** A dosing schedule for the drug for a given population, either observed, recommended, or maximum dose based on the type used. */
    "schema:doseSchedule"?: SchemaValue<DoseSchedule | IdReference, "schema:doseSchedule">;
    /** The class of drug this belongs to (e.g., statins). */
    "schema:drugClass"?: SchemaValue<DrugClass | IdReference, "schema:drugClass">;
    /** The unit in which the drug is measured, e.g. '5 mg tablet'. */
    "schema:drugUnit"?: SchemaValue<Text, "schema:drugUnit">;
    /** Any precaution, guidance, contraindication, etc. related to consumption of specific foods while taking this drug. */
    "schema:foodWarning"?: SchemaValue<Text, "schema:foodWarning">;
    /** The insurance plans that cover this drug. */
    "schema:includedInHealthInsurancePlan"?: SchemaValue<HealthInsurancePlan | IdReference, "schema:includedInHealthInsurancePlan">;
    /** Another drug that is known to interact with this drug in a way that impacts the effect of this drug or causes a risk to the patient. Note: disease interactions are typically captured as contraindications. */
    "schema:interactingDrug"?: SchemaValue<Drug | IdReference, "schema:interactingDrug">;
    /** True if the drug is available in a generic form (regardless of name). */
    "schema:isAvailableGenerically"?: SchemaValue<Boolean, "schema:isAvailableGenerically">;
    /** True if this item's name is a proprietary/brand name (vs. generic name). */
    "schema:isProprietary"?: SchemaValue<Boolean, "schema:isProprietary">;
    /** Link to the drug's label details. */
    "schema:labelDetails"?: SchemaValue<URL, "schema:labelDetails">;
    /** The drug or supplement's legal status, including any controlled substance schedules that apply. */
    "schema:legalStatus"?: SchemaValue<DrugLegalStatus | MedicalEnumeration | Text | IdReference, "schema:legalStatus">;
    /** The manufacturer of the product. */
    "schema:manufacturer"?: SchemaValue<Organization | IdReference, "schema:manufacturer">;
    /** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
    "schema:maximumIntake"?: SchemaValue<MaximumDoseSchedule | IdReference, "schema:maximumIntake">;
    /** The specific biochemical interaction through which this drug or supplement produces its pharmacological effect. */
    "schema:mechanismOfAction"?: SchemaValue<Text, "schema:mechanismOfAction">;
    /** The generic name of this drug or supplement. */
    "schema:nonProprietaryName"?: SchemaValue<Text, "schema:nonProprietaryName">;
    /** Any information related to overdose on a drug, including signs or symptoms, treatments, contact information for emergency response. */
    "schema:overdosage"?: SchemaValue<Text, "schema:overdosage">;
    /** Pregnancy category of this drug. */
    "schema:pregnancyCategory"?: SchemaValue<DrugPregnancyCategory | IdReference, "schema:pregnancyCategory">;
    /** Any precaution, guidance, contraindication, etc. related to this drug's use during pregnancy. */
    "schema:pregnancyWarning"?: SchemaValue<Text, "schema:pregnancyWarning">;
    /** Link to prescribing information for the drug. */
    "schema:prescribingInfo"?: SchemaValue<URL, "schema:prescribingInfo">;
    /** Indicates the status of drug prescription eg. local catalogs classifications or whether the drug is available by prescription or over-the-counter, etc. */
    "schema:prescriptionStatus"?: SchemaValue<DrugPrescriptionStatus | Text | IdReference, "schema:prescriptionStatus">;
    /** Proprietary name given to the diet plan, typically by its originator or creator. */
    "schema:proprietaryName"?: SchemaValue<Text, "schema:proprietaryName">;
    /** Any other drug related to this one, for example commonly-prescribed alternatives. */
    "schema:relatedDrug"?: SchemaValue<Drug | IdReference, "schema:relatedDrug">;
    /** The RxCUI drug identifier from RXNORM. */
    "schema:rxcui"?: SchemaValue<Text, "schema:rxcui">;
    /** Any FDA or other warnings about the drug (text or URL). */
    "schema:warning"?: SchemaValue<Text | URL, "schema:warning">;
}
interface DrugLeaf extends DrugBase {
    "@type": "schema:Drug";
}
/** A chemical or biologic substance, used as a medical therapy, that has a physiological effect on an organism. Here the term drug is used interchangeably with the term medicine although clinical knowledge make a clear difference between them. */
export type Drug = DrugLeaf;

interface DrugClassBase extends MedicalEntityBase {
    /** Specifying a drug or medicine used in a medication procedure. */
    "schema:drug"?: SchemaValue<Drug | IdReference, "schema:drug">;
}
interface DrugClassLeaf extends DrugClassBase {
    "@type": "schema:DrugClass";
}
/** A class of medical drugs, e.g., statins. Classes can represent general pharmacological class, common mechanisms of action, common physiological effects, etc. */
export type DrugClass = DrugClassLeaf;

interface DrugCostBase extends MedicalEntityBase {
    /** The location in which the status applies. */
    "schema:applicableLocation"?: SchemaValue<AdministrativeArea | IdReference, "schema:applicableLocation">;
    /** The category of cost, such as wholesale, retail, reimbursement cap, etc. */
    "schema:costCategory"?: SchemaValue<DrugCostCategory | IdReference, "schema:costCategory">;
    /** The currency (in 3-letter of the drug cost. See: http://en.wikipedia.org/wiki/ISO_4217. */
    "schema:costCurrency"?: SchemaValue<Text, "schema:costCurrency">;
    /** Additional details to capture the origin of the cost data. For example, 'Medicare Part B'. */
    "schema:costOrigin"?: SchemaValue<Text, "schema:costOrigin">;
    /** The cost per unit of the drug. */
    "schema:costPerUnit"?: SchemaValue<Number | QualitativeValue | Text | IdReference, "schema:costPerUnit">;
    /** The unit in which the drug is measured, e.g. '5 mg tablet'. */
    "schema:drugUnit"?: SchemaValue<Text, "schema:drugUnit">;
}
interface DrugCostLeaf extends DrugCostBase {
    "@type": "schema:DrugCost";
}
/** The cost per unit of a medical drug. Note that this type is not meant to represent the price in an offer of a drug for sale; see the Offer type for that. This type will typically be used to tag wholesale or average retail cost of a drug, or maximum reimbursable cost. Costs of medical drugs vary widely depending on how and where they are paid for, so while this type captures some of the variables, costs should be used with caution by consumers of this schema's markup. */
export type DrugCost = DrugCostLeaf;

interface DrugCostCategoryLeaf extends EnumerationBase {
    "@type": "schema:DrugCostCategory";
}
/** Enumerated categories of medical drug costs. */
export type DrugCostCategory = "https://schema.org/ReimbursementCap" | "schema:ReimbursementCap" | "https://schema.org/Retail" | "schema:Retail" | "https://schema.org/Wholesale" | "schema:Wholesale" | DrugCostCategoryLeaf;

interface DrugLegalStatusBase extends MedicalEntityBase {
    /** The location in which the status applies. */
    "schema:applicableLocation"?: SchemaValue<AdministrativeArea | IdReference, "schema:applicableLocation">;
}
interface DrugLegalStatusLeaf extends DrugLegalStatusBase {
    "@type": "schema:DrugLegalStatus";
}
/** The legal availability status of a medical drug. */
export type DrugLegalStatus = DrugLegalStatusLeaf;

interface DrugPregnancyCategoryLeaf extends EnumerationBase {
    "@type": "schema:DrugPregnancyCategory";
}
/** Categories that represent an assessment of the risk of fetal injury due to a drug or pharmaceutical used as directed by the mother during pregnancy. */
export type DrugPregnancyCategory = "https://schema.org/FDAcategoryA" | "schema:FDAcategoryA" | "https://schema.org/FDAcategoryB" | "schema:FDAcategoryB" | "https://schema.org/FDAcategoryC" | "schema:FDAcategoryC" | "https://schema.org/FDAcategoryD" | "schema:FDAcategoryD" | "https://schema.org/FDAcategoryX" | "schema:FDAcategoryX" | "https://schema.org/FDAnotEvaluated" | "schema:FDAnotEvaluated" | DrugPregnancyCategoryLeaf;

interface DrugPrescriptionStatusLeaf extends EnumerationBase {
    "@type": "schema:DrugPrescriptionStatus";
}
/** Indicates whether this drug is available by prescription or over-the-counter. */
export type DrugPrescriptionStatus = "https://schema.org/OTC" | "schema:OTC" | "https://schema.org/PrescriptionOnly" | "schema:PrescriptionOnly" | DrugPrescriptionStatusLeaf;

interface DrugStrengthBase extends MedicalEntityBase {
    /** An active ingredient, typically chemical compounds and/or biologic substances. */
    "schema:activeIngredient"?: SchemaValue<Text, "schema:activeIngredient">;
    /** The location in which the strength is available. */
    "schema:availableIn"?: SchemaValue<AdministrativeArea | IdReference, "schema:availableIn">;
    /** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
    "schema:maximumIntake"?: SchemaValue<MaximumDoseSchedule | IdReference, "schema:maximumIntake">;
    /** The units of an active ingredient's strength, e.g. mg. */
    "schema:strengthUnit"?: SchemaValue<Text, "schema:strengthUnit">;
    /** The value of an active ingredient's strength, e.g. 325. */
    "schema:strengthValue"?: SchemaValue<Number, "schema:strengthValue">;
}
interface DrugStrengthLeaf extends DrugStrengthBase {
    "@type": "schema:DrugStrength";
}
/** A specific strength in which a medical drug is available in a specific country. */
export type DrugStrength = DrugStrengthLeaf;

interface DryCleaningOrLaundryLeaf extends LocalBusinessBase {
    "@type": "schema:DryCleaningOrLaundry";
}
/** A dry-cleaning business. */
export type DryCleaningOrLaundry = DryCleaningOrLaundryLeaf | string;

interface DurationLeaf extends ThingBase {
    "@type": "schema:Duration";
}
/** Quantity: Duration (use {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 duration format}). */
export type Duration = DurationLeaf | string;

interface EatActionLeaf extends ConsumeActionBase {
    "@type": "schema:EatAction";
}
/** The act of swallowing solid objects. */
export type EatAction = EatActionLeaf;

interface EducationalAudienceBase extends AudienceBase {
    /** An educationalRole of an EducationalAudience. */
    "schema:educationalRole"?: SchemaValue<Text, "schema:educationalRole">;
}
interface EducationalAudienceLeaf extends EducationalAudienceBase {
    "@type": "schema:EducationalAudience";
}
/** An EducationalAudience. */
export type EducationalAudience = EducationalAudienceLeaf;

interface EducationalOccupationalCredentialBase extends CreativeWorkBase {
    /** Knowledge, skill, ability or personal attribute that must be demonstrated by a person or other entity in order to do something such as earn an Educational Occupational Credential or understand a LearningResource. */
    "schema:competencyRequired"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:competencyRequired">;
    /** The category or type of credential being described, for example "degree”, “certificate”, “badge”, or more specific term. */
    "schema:credentialCategory"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:credentialCategory">;
    /** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
    "schema:educationalLevel"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:educationalLevel">;
    /** An organization that acknowledges the validity, value or utility of a credential. Note: recognition may include a process of quality assurance or accreditation. */
    "schema:recognizedBy"?: SchemaValue<Organization | IdReference, "schema:recognizedBy">;
    /** The duration of validity of a permit or similar thing. */
    "schema:validFor"?: SchemaValue<Duration | IdReference, "schema:validFor">;
    /** The geographic area where a permit or similar thing is valid. */
    "schema:validIn"?: SchemaValue<AdministrativeArea | IdReference, "schema:validIn">;
}
interface EducationalOccupationalCredentialLeaf extends EducationalOccupationalCredentialBase {
    "@type": "schema:EducationalOccupationalCredential";
}
/** An educational or occupational credential. A diploma, academic degree, certification, qualification, badge, etc., that may be awarded to a person or other entity that meets the requirements defined by the credentialer. */
export type EducationalOccupationalCredential = EducationalOccupationalCredentialLeaf;

interface EducationalOccupationalProgramBase extends ThingBase {
    /** The date at which the program stops collecting applications for the next enrollment cycle. */
    "schema:applicationDeadline"?: SchemaValue<Date, "schema:applicationDeadline">;
    /** The date at which the program begins collecting applications for the next enrollment cycle. */
    "schema:applicationStartDate"?: SchemaValue<Date, "schema:applicationStartDate">;
    /** The day of the week for which these opening hours are valid. */
    "schema:dayOfWeek"?: SchemaValue<DayOfWeek | IdReference, "schema:dayOfWeek">;
    /** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
    "schema:educationalCredentialAwarded"?: SchemaValue<EducationalOccupationalCredential | Text | URL | IdReference, "schema:educationalCredentialAwarded">;
    /** Similar to courseMode, The medium or means of delivery of the program as a whole. The value may either be a text label (e.g. "online", "onsite" or "blended"; "synchronous" or "asynchronous"; "full-time" or "part-time") or a URL reference to a term from a controlled vocabulary (e.g. https://ceds.ed.gov/element/001311#Asynchronous ). */
    "schema:educationalProgramMode"?: SchemaValue<Text | URL, "schema:educationalProgramMode">;
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:endDate"?: SchemaValue<Date | DateTime, "schema:endDate">;
    /** A financial aid type or program which students may use to pay for tuition or fees associated with the program. */
    "schema:financialAidEligible"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:financialAidEligible">;
    /** A course or class that is one of the learning opportunities that constitute an educational / occupational program. No information is implied about whether the course is mandatory or optional; no guarantee is implied about whether the course will be available to everyone on the program. */
    "schema:hasCourse"?: SchemaValue<Course | IdReference, "schema:hasCourse">;
    /** The maximum number of students who may be enrolled in the program. */
    "schema:maximumEnrollment"?: SchemaValue<Integer, "schema:maximumEnrollment">;
    /** The number of credits or units awarded by a Course or required to complete an EducationalOccupationalProgram. */
    "schema:numberOfCredits"?: SchemaValue<Integer | StructuredValue | IdReference, "schema:numberOfCredits">;
    /**
     * A category describing the job, preferably using a term from a taxonomy such as {@link http://www.onetcenter.org/taxonomy.html BLS O*NET-SOC}, {@link https://www.ilo.org/public/english/bureau/stat/isco/isco08/ ISCO-08} or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.
     *
     * Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC.
     */
    "schema:occupationalCategory"?: SchemaValue<CategoryCode | Text | IdReference, "schema:occupationalCategory">;
    /** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
    "schema:occupationalCredentialAwarded"?: SchemaValue<EducationalOccupationalCredential | Text | URL | IdReference, "schema:occupationalCredentialAwarded">;
    /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use {@link https://schema.org/businessFunction businessFunction} to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a {@link https://schema.org/Demand Demand}. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:offers"?: SchemaValue<Demand | Offer | IdReference, "schema:offers">;
    /** Prerequisites for enrolling in the program. */
    "schema:programPrerequisites"?: SchemaValue<AlignmentObject | Course | EducationalOccupationalCredential | Text | IdReference, "schema:programPrerequisites">;
    /** The type of educational or occupational program. For example, classroom, internship, alternance, etc.. */
    "schema:programType"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:programType">;
    /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
    "schema:provider"?: SchemaValue<Organization | Person | IdReference, "schema:provider">;
    /** The expected salary upon completing the training. */
    "schema:salaryUponCompletion"?: SchemaValue<MonetaryAmountDistribution | IdReference, "schema:salaryUponCompletion">;
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:startDate"?: SchemaValue<Date | DateTime, "schema:startDate">;
    /** The amount of time in a term as defined by the institution. A term is a length of time where students take one or more classes. Semesters and quarters are common units for term. */
    "schema:termDuration"?: SchemaValue<Duration | IdReference, "schema:termDuration">;
    /** The number of times terms of study are offered per year. Semesters and quarters are common units for term. For example, if the student can only take 2 semesters for the program in one year, then termsPerYear should be 2. */
    "schema:termsPerYear"?: SchemaValue<Number, "schema:termsPerYear">;
    /** The time of day the program normally runs. For example, "evenings". */
    "schema:timeOfDay"?: SchemaValue<Text, "schema:timeOfDay">;
    /** The expected length of time to complete the program if attending full-time. */
    "schema:timeToComplete"?: SchemaValue<Duration | IdReference, "schema:timeToComplete">;
    /** The estimated salary earned while in the program. */
    "schema:trainingSalary"?: SchemaValue<MonetaryAmountDistribution | IdReference, "schema:trainingSalary">;
    /** The number of credits or units a full-time student would be expected to take in 1 term however 'term' is defined by the institution. */
    "schema:typicalCreditsPerTerm"?: SchemaValue<Integer | StructuredValue | IdReference, "schema:typicalCreditsPerTerm">;
}
interface EducationalOccupationalProgramLeaf extends EducationalOccupationalProgramBase {
    "@type": "schema:EducationalOccupationalProgram";
}
/** A program offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. This would define a discrete set of opportunities (e.g., job, courses) that together constitute a program with a clear start, end, set of requirements, and transition to a new occupational opportunity (e.g., a job), or sometimes a higher educational opportunity (e.g., an advanced degree). */
export type EducationalOccupationalProgram = EducationalOccupationalProgramLeaf | WorkBasedProgram;

interface EducationalOrganizationBase extends OrganizationBase, CivicStructureBase {
    /** Alumni of an organization. */
    "schema:alumni"?: SchemaValue<Person | IdReference, "schema:alumni">;
}
interface EducationalOrganizationLeaf extends EducationalOrganizationBase {
    "@type": "schema:EducationalOrganization";
}
/** An educational organization. */
export type EducationalOrganization = EducationalOrganizationLeaf | CollegeOrUniversity | ElementarySchool | HighSchool | MiddleSchool | Preschool | School | string;

interface EducationEventBase extends EventBase {
    /** The item being described is intended to assess the competency or learning outcome defined by the referenced term. */
    "schema:assesses"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:assesses">;
    /** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
    "schema:educationalLevel"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:educationalLevel">;
    /** The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term. */
    "schema:teaches"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:teaches">;
}
interface EducationEventLeaf extends EducationEventBase {
    "@type": "schema:EducationEvent";
}
/** Event type: Education event. */
export type EducationEvent = EducationEventLeaf;

interface ElectricianLeaf extends LocalBusinessBase {
    "@type": "schema:Electrician";
}
/** An electrician. */
export type Electrician = ElectricianLeaf | string;

interface ElectronicsStoreLeaf extends LocalBusinessBase {
    "@type": "schema:ElectronicsStore";
}
/** An electronics store. */
export type ElectronicsStore = ElectronicsStoreLeaf | string;

interface ElementBase extends ThingBase {
    /** Properties related to accessibility */
    "uxi:a11y"?: SchemaValue<Element | IdReference, "uxi:a11y">;
    /** A property that holds the context a UI element is in */
    "uxi:ContextProperty"?: SchemaValue<Element | IdReference, "uxi:ContextProperty">;
    /** Flags to express that a UI element describes something, e.g. isHelp, isContent, isProgress */
    "uxi:DescriptionFlag"?: SchemaValue<Element | IdReference, "uxi:DescriptionFlag">;
    /** Flags that express a hierarchical position on an element */
    "uxi:HierarchyFlag"?: SchemaValue<Boolean, "uxi:HierarchyFlag">;
    /** Input is the value/parameter/prop that gets passed to an element in the UX, and can be empty. This applies to visual as well as non-visual elements. */
    "uxi:input"?: SchemaValue<DataType | Thing | UIDataType | IdReference, "uxi:input">;
    /** When people collaboratively work, the property isInUseBy can be used to make an element non-editable until it is set free. Showing where other users are can also prevent conflicting edits. */
    "uxi:isInUseBy"?: SchemaValue<Group | Person | Role | User | IdReference, "uxi:isInUseBy">;
    /** To handle which User, Role or Group can use an Element of the UI, the property isUsableBy can be used to grey out parts of the interface, or hide them entirely. */
    "uxi:isUsableBy"?: SchemaValue<Group | Person | Role | User | IdReference, "uxi:isUsableBy">;
    /** A property that holds the navigation on a UI element, e.g. menu, settings */
    "uxi:NavigationProperty"?: SchemaValue<Element | IdReference, "uxi:NavigationProperty">;
    /** A property that holds a result, output or status */
    "uxi:OutcomeProperty"?: SchemaValue<Element | Thing | UIDataType | UIState | IdReference, "uxi:OutcomeProperty">;
}
interface ElementLeaf extends ElementBase {
    "@type": "uxi:Element";
}
/** The root for all Classes in the uxiverse ontology, both as part of the UI or not */
export type Element = ElementLeaf | Converter | Group | IssueSeverityType | SideEffectHandler | StructuralElement | UIAction | UIDataType | UIElement | UIPropertyValueSpecification | UIState | User | Validator;

interface ElementarySchoolLeaf extends EducationalOrganizationBase {
    "@type": "schema:ElementarySchool";
}
/** An elementary school. */
export type ElementarySchool = ElementarySchoolLeaf | string;

interface EllipseLeaf extends UIElementBase {
    "@type": "uxi:Ellipse";
}
/** An Ellipse is a type of Shape similar to a Circle, but squished. Easily confused with ellipsis, which are words in a sentence that are omitted, but would be needed for grammatical correctness. In CSS, ellipsis can be used for a text-overflow to create dots at the end of text that is cut by the layout. */
export type Ellipse = EllipseLeaf;

interface EmailMessageLeaf extends MessageBase {
    "@type": "schema:EmailMessage";
}
/** An email message. */
export type EmailMessage = EmailMessageLeaf;

interface EmbassyLeaf extends CivicStructureBase {
    "@type": "schema:Embassy";
}
/** An embassy. */
export type Embassy = EmbassyLeaf | string;

interface EmergencyLeaf extends LocalBusinessBase {
    "@type": "schema:Emergency";
}
/** A specific branch of medical science that deals with the evaluation and initial treatment of medical conditions caused by trauma or sudden illness. */
export type Emergency = EmergencyLeaf | string;

interface EmergencyServiceLeaf extends LocalBusinessBase {
    "@type": "schema:EmergencyService";
}
/** An emergency service, such as a fire station or ER. */
export type EmergencyService = EmergencyServiceLeaf | FireStation | Hospital | PoliceStation | string;

interface EmployerAggregateRatingLeaf extends AggregateRatingBase {
    "@type": "schema:EmployerAggregateRating";
}
/** An aggregate rating of an Organization related to its role as an employer. */
export type EmployerAggregateRating = EmployerAggregateRatingLeaf;

interface EmployerReviewLeaf extends ReviewBase {
    "@type": "schema:EmployerReview";
}
/** An {@link https://schema.org/EmployerReview EmployerReview} is a review of an {@link https://schema.org/Organization Organization} regarding its role as an employer, written by a current or former employee of that organization. */
export type EmployerReview = EmployerReviewLeaf;

interface EmploymentAgencyLeaf extends LocalBusinessBase {
    "@type": "schema:EmploymentAgency";
}
/** An employment agency. */
export type EmploymentAgency = EmploymentAgencyLeaf | string;

interface EmptyLeaf extends ElementBase {
    "@type": "uxi:Empty";
}
/** Issues coming from empty data are common, because new users or new features usually start with no data. This is an opportunity for onboarding and explaining features. Users can also remove data they've entered, leaving a UI element empty. E.g. A To-Do App can have different empty states: on first use and after finishing all To-Dos */
export type Empty = EmptyLeaf;

interface EndorseActionBase extends ActionBase {
    /** A sub property of participant. The person/organization being supported. */
    "schema:endorsee"?: SchemaValue<Organization | Person | IdReference, "schema:endorsee">;
}
interface EndorseActionLeaf extends EndorseActionBase {
    "@type": "schema:EndorseAction";
}
/** An agent approves/certifies/likes/supports/sanction an object. */
export type EndorseAction = EndorseActionLeaf;

interface EndorsementRatingLeaf extends RatingBase {
    "@type": "schema:EndorsementRating";
}
/**
 * An EndorsementRating is a rating that expresses some level of endorsement, for example inclusion in a "critic's pick" blog, a "Like" or "+1" on a social network. It can be considered the {@link https://schema.org/result result} of an {@link https://schema.org/EndorseAction EndorseAction} in which the {@link https://schema.org/object object} of the action is rated positively by some {@link https://schema.org/agent agent}. As is common elsewhere in schema.org, it is sometimes more useful to describe the results of such an action without explicitly describing the {@link https://schema.org/Action Action}.
 *
 * An {@link https://schema.org/EndorsementRating EndorsementRating} may be part of a numeric scale or organized system, but this is not required: having an explicit type for indicating a positive, endorsement rating is particularly useful in the absence of numeric scales as it helps consumers understand that the rating is broadly positive.
 */
export type EndorsementRating = EndorsementRatingLeaf;

interface EnergyLeaf extends ThingBase {
    "@type": "schema:Energy";
}
/** Properties that take Energy as values are of the form '<Number> <Energy unit of measure>'. */
export type Energy = EnergyLeaf | string;

interface EnergyConsumptionDetailsBase extends ThingBase {
    /** Specifies the most energy efficient class on the regulated EU energy consumption scale for the product category a product belongs to. For example, energy consumption for televisions placed on the market after January 1, 2020 is scaled from D to A+++. */
    "schema:energyEfficiencyScaleMax"?: SchemaValue<EUEnergyEfficiencyEnumeration | IdReference, "schema:energyEfficiencyScaleMax">;
    /** Specifies the least energy efficient class on the regulated EU energy consumption scale for the product category a product belongs to. For example, energy consumption for televisions placed on the market after January 1, 2020 is scaled from D to A+++. */
    "schema:energyEfficiencyScaleMin"?: SchemaValue<EUEnergyEfficiencyEnumeration | IdReference, "schema:energyEfficiencyScaleMin">;
    /** Defines the energy efficiency Category (which could be either a rating out of range of values or a yes/no certification) for a product according to an international energy efficiency standard. */
    "schema:hasEnergyEfficiencyCategory"?: SchemaValue<EnergyEfficiencyEnumeration | IdReference, "schema:hasEnergyEfficiencyCategory">;
}
interface EnergyConsumptionDetailsLeaf extends EnergyConsumptionDetailsBase {
    "@type": "schema:EnergyConsumptionDetails";
}
/** EnergyConsumptionDetails represents information related to the energy efficiency of a product that consumes energy. The information that can be provided is based on international regulations such as for example {@link https://eur-lex.europa.eu/eli/reg/2017/1369/oj EU directive 2017/1369} for energy labeling and the {@link https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/energy-water-use-labeling-consumer Energy labeling rule} under the Energy Policy and Conservation Act (EPCA) in the US. */
export type EnergyConsumptionDetails = EnergyConsumptionDetailsLeaf;

interface EnergyEfficiencyEnumerationLeaf extends EnumerationBase {
    "@type": "schema:EnergyEfficiencyEnumeration";
}
/** Enumerates energy efficiency levels (also known as "classes" or "ratings") and certifications that are part of several international energy efficiency standards. */
export type EnergyEfficiencyEnumeration = EnergyEfficiencyEnumerationLeaf | EnergyStarEnergyEfficiencyEnumeration | EUEnergyEfficiencyEnumeration;

interface EnergyStarEnergyEfficiencyEnumerationLeaf extends EnumerationBase {
    "@type": "schema:EnergyStarEnergyEfficiencyEnumeration";
}
/** Used to indicate whether a product is EnergyStar certified. */
export type EnergyStarEnergyEfficiencyEnumeration = "https://schema.org/EnergyStarCertified" | "schema:EnergyStarCertified" | EnergyStarEnergyEfficiencyEnumerationLeaf;

interface EngineSpecificationBase extends ThingBase {
    /**
     * The volume swept by all of the pistons inside the cylinders of an internal combustion engine in a single movement.
     *
     * Typical unit code(s): CMQ for cubic centimeter, LTR for liters, INQ for cubic inches
     * - Note 1: You can link to information about how the given value has been determined using the {@link https://schema.org/valueReference valueReference} property.
     * - Note 2: You can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:engineDisplacement"?: SchemaValue<QuantitativeValue | IdReference, "schema:engineDisplacement">;
    /**
     * The power of the vehicle's engine. Typical unit code(s): KWT for kilowatt, BHP for brake horsepower, N12 for metric horsepower (PS, with 1 PS = 735,49875 W)
     * - Note 1: There are many different ways of measuring an engine's power. For an overview, see {@link http://en.wikipedia.org/wiki/Horsepower#Engine_power_test_codes http://en.wikipedia.org/wiki/Horsepower#Engine_power_test_codes}.
     * - Note 2: You can link to information about how the given value has been determined using the {@link https://schema.org/valueReference valueReference} property.
     * - Note 3: You can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:enginePower"?: SchemaValue<QuantitativeValue | IdReference, "schema:enginePower">;
    /** The type of engine or engines powering the vehicle. */
    "schema:engineType"?: SchemaValue<QualitativeValue | Text | URL | IdReference, "schema:engineType">;
    /** The type of fuel suitable for the engine or engines of the vehicle. If the vehicle has only one engine, this property can be attached directly to the vehicle. */
    "schema:fuelType"?: SchemaValue<QualitativeValue | Text | URL | IdReference, "schema:fuelType">;
    /**
     * The torque (turning force) of the vehicle's engine.
     *
     * Typical unit code(s): NU for newton metre (N m), F17 for pound-force per foot, or F48 for pound-force per inch
     * - Note 1: You can link to information about how the given value has been determined (e.g. reference RPM) using the {@link https://schema.org/valueReference valueReference} property.
     * - Note 2: You can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:torque"?: SchemaValue<QuantitativeValue | IdReference, "schema:torque">;
}
interface EngineSpecificationLeaf extends EngineSpecificationBase {
    "@type": "schema:EngineSpecification";
}
/** Information about the engine of the vehicle. A vehicle can have multiple engines represented by multiple engine specification entities. */
export type EngineSpecification = EngineSpecificationLeaf;

interface EntertainmentBusinessLeaf extends LocalBusinessBase {
    "@type": "schema:EntertainmentBusiness";
}
/** A business providing entertainment. */
export type EntertainmentBusiness = EntertainmentBusinessLeaf | AdultEntertainment | AmusementPark | ArtGallery | Casino | ComedyClub | MovieTheater | NightClub | string;

interface EntryPointBase extends ThingBase {
    /** An application that can complete the request. */
    "schema:actionApplication"?: SchemaValue<SoftwareApplication | IdReference, "schema:actionApplication">;
    /** The high level platform(s) where the Action can be performed for the given URL. To specify a specific application or operating system instance, use actionApplication. */
    "schema:actionPlatform"?: SchemaValue<Text | URL, "schema:actionPlatform">;
    /**
     * An application that can complete the request.
     *
     * @deprecated Consider using https://schema.org/actionApplication instead.
     */
    "schema:application"?: SchemaValue<SoftwareApplication | IdReference, "schema:application">;
    /** The supported content type(s) for an EntryPoint response. */
    "schema:contentType"?: SchemaValue<Text, "schema:contentType">;
    /** The supported encoding type(s) for an EntryPoint request. */
    "schema:encodingType"?: SchemaValue<Text, "schema:encodingType">;
    /** An HTTP method that specifies the appropriate HTTP method for a request to an HTTP EntryPoint. Values are capitalized strings as used in HTTP. */
    "schema:httpMethod"?: SchemaValue<Text, "schema:httpMethod">;
    /** An url template (RFC6570) that will be used to construct the target of the execution of the action. */
    "schema:urlTemplate"?: SchemaValue<Text, "schema:urlTemplate">;
}
interface EntryPointLeaf extends EntryPointBase {
    "@type": "schema:EntryPoint";
}
/** An entry point, within some Web-based protocol. */
export type EntryPoint = EntryPointLeaf | string;

interface EnumerationBase extends ThingBase {
    /** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
    "schema:supersededBy"?: SchemaValue<Class | Enumeration | Property | IdReference, "schema:supersededBy">;
}
interface EnumerationLeaf extends EnumerationBase {
    "@type": "schema:Enumeration";
}
/** Lists or enumerations—for example, a list of cuisines or music genres, etc. */
export type Enumeration = EnumerationLeaf | BoardingPolicyType | BookFormatType | BusinessEntityType | BusinessFunction | CarUsageType | ContactPointOption | DayOfWeek | DeliveryMethod | DigitalDocumentPermissionType | EnergyEfficiencyEnumeration | EventAttendanceModeEnumeration | GamePlayMode | GenderType | GovernmentBenefitsType | HealthAspectEnumeration | ItemAvailability | ItemListOrderType | LegalValueLevel | MapCategoryType | MeasurementTypeEnumeration | MediaManipulationRatingEnumeration | MedicalEnumeration | MerchantReturnEnumeration | MusicAlbumProductionType | MusicAlbumReleaseType | MusicReleaseFormatType | NonprofitType | OfferItemCondition | PaymentMethod | PhysicalActivityCategory | PriceComponentTypeEnumeration | PriceTypeEnumeration | QualitativeValue | RefundTypeEnumeration | RestrictedDiet | ReturnFeesEnumeration | ReturnLabelSourceEnumeration | ReturnMethodEnumeration | RsvpResponseType | SizeGroupEnumeration | SizeSystemEnumeration | Specialty | StatusEnumeration | WarrantyScope;

interface EpisodeBase extends CreativeWorkBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /**
     * An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/actor instead.
     */
    "schema:actors"?: SchemaValue<Person | IdReference, "schema:actors">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /**
     * A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/director instead.
     */
    "schema:directors"?: SchemaValue<Person | IdReference, "schema:directors">;
    /** The duration of the item (movie, audio recording, event, etc.) in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    "schema:duration"?: SchemaValue<Duration | IdReference, "schema:duration">;
    /** Position of the episode within an ordered group of episodes. */
    "schema:episodeNumber"?: SchemaValue<Integer | Text, "schema:episodeNumber">;
    /** The composer of the soundtrack. */
    "schema:musicBy"?: SchemaValue<MusicGroup | Person | IdReference, "schema:musicBy">;
    /** The season to which this episode belongs. */
    "schema:partOfSeason"?: SchemaValue<CreativeWorkSeason | IdReference, "schema:partOfSeason">;
    /** The series to which this episode or season belongs. */
    "schema:partOfSeries"?: SchemaValue<CreativeWorkSeries | IdReference, "schema:partOfSeries">;
    /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
    "schema:productionCompany"?: SchemaValue<Organization | IdReference, "schema:productionCompany">;
    /** The trailer of a movie or tv/radio series, season, episode, etc. */
    "schema:trailer"?: SchemaValue<VideoObject | IdReference, "schema:trailer">;
}
interface EpisodeLeaf extends EpisodeBase {
    "@type": "schema:Episode";
}
/** A media episode (e.g. TV, radio, video game) which can be part of a series or season. */
export type Episode = EpisodeLeaf | PodcastEpisode | RadioEpisode | TVEpisode;

interface ErrorLeaf extends ElementBase {
    "@type": "uxi:Error";
}
/** Errors are events that stop part of an application to work as intended. Known errors can give users an option to intervene, similar to warnings. Another option can be to restart thtat part of the application */
export type Error = ErrorLeaf;

interface ErrorStateLeaf extends ElementBase {
    "@type": "uxi:ErrorState";
}
/** A UI element is in an error state when it received bad user input, data from the application or for technical reasons. Ideally the apllication should recover itself. If not, show options to the user */
export type ErrorState = ErrorStateLeaf;

interface EUEnergyEfficiencyEnumerationLeaf extends EnumerationBase {
    "@type": "schema:EUEnergyEfficiencyEnumeration";
}
/** Enumerates the EU energy efficiency classes A-G as well as A+, A++, and A+++ as defined in EU directive 2017/1369. */
export type EUEnergyEfficiencyEnumeration = "https://schema.org/EUEnergyEfficiencyCategoryA" | "schema:EUEnergyEfficiencyCategoryA" | "https://schema.org/EUEnergyEfficiencyCategoryA1Plus" | "schema:EUEnergyEfficiencyCategoryA1Plus" | "https://schema.org/EUEnergyEfficiencyCategoryA2Plus" | "schema:EUEnergyEfficiencyCategoryA2Plus" | "https://schema.org/EUEnergyEfficiencyCategoryA3Plus" | "schema:EUEnergyEfficiencyCategoryA3Plus" | "https://schema.org/EUEnergyEfficiencyCategoryB" | "schema:EUEnergyEfficiencyCategoryB" | "https://schema.org/EUEnergyEfficiencyCategoryC" | "schema:EUEnergyEfficiencyCategoryC" | "https://schema.org/EUEnergyEfficiencyCategoryD" | "schema:EUEnergyEfficiencyCategoryD" | "https://schema.org/EUEnergyEfficiencyCategoryE" | "schema:EUEnergyEfficiencyCategoryE" | "https://schema.org/EUEnergyEfficiencyCategoryF" | "schema:EUEnergyEfficiencyCategoryF" | "https://schema.org/EUEnergyEfficiencyCategoryG" | "schema:EUEnergyEfficiencyCategoryG" | EUEnergyEfficiencyEnumerationLeaf;

interface EventBase extends ThingBase {
    /** The subject matter of the content. */
    "schema:about"?: SchemaValue<Thing | IdReference, "schema:about">;
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /** The overall rating, based on a collection of reviews or ratings, of the item. */
    "schema:aggregateRating"?: SchemaValue<AggregateRating | IdReference, "schema:aggregateRating">;
    /** A person or organization attending the event. */
    "schema:attendee"?: SchemaValue<Organization | Person | IdReference, "schema:attendee">;
    /**
     * A person attending the event.
     *
     * @deprecated Consider using https://schema.org/attendee instead.
     */
    "schema:attendees"?: SchemaValue<Organization | Person | IdReference, "schema:attendees">;
    /** An intended audience, i.e. a group for whom something was created. */
    "schema:audience"?: SchemaValue<Audience | IdReference, "schema:audience">;
    /** The person or organization who wrote a composition, or who is the composer of a work performed at some event. */
    "schema:composer"?: SchemaValue<Organization | Person | IdReference, "schema:composer">;
    /** A secondary contributor to the CreativeWork or Event. */
    "schema:contributor"?: SchemaValue<Organization | Person | IdReference, "schema:contributor">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /** The time admission will commence. */
    "schema:doorTime"?: SchemaValue<DateTime | Time, "schema:doorTime">;
    /** The duration of the item (movie, audio recording, event, etc.) in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    "schema:duration"?: SchemaValue<Duration | IdReference, "schema:duration">;
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:endDate"?: SchemaValue<Date | DateTime, "schema:endDate">;
    /** The eventAttendanceMode of an event indicates whether it occurs online, offline, or a mix. */
    "schema:eventAttendanceMode"?: SchemaValue<EventAttendanceModeEnumeration | IdReference, "schema:eventAttendanceMode">;
    /** Associates an {@link https://schema.org/Event Event} with a {@link https://schema.org/Schedule Schedule}. There are circumstances where it is preferable to share a schedule for a series of repeating events rather than data on the individual events themselves. For example, a website or application might prefer to publish a schedule for a weekly gym class rather than provide data on every event. A schedule could be processed by applications to add forthcoming events to a calendar. An {@link https://schema.org/Event Event} that is associated with a {@link https://schema.org/Schedule Schedule} using this property should not have {@link https://schema.org/startDate startDate} or {@link https://schema.org/endDate endDate} properties. These are instead defined within the associated {@link https://schema.org/Schedule Schedule}, this avoids any ambiguity for clients using the data. The property might have repeated values to specify different schedules, e.g. for different months or seasons. */
    "schema:eventSchedule"?: SchemaValue<Schedule | IdReference, "schema:eventSchedule">;
    /** An eventStatus of an event represents its status; particularly useful when an event is cancelled or rescheduled. */
    "schema:eventStatus"?: SchemaValue<EventStatusType | IdReference, "schema:eventStatus">;
    /** A person or organization that supports (sponsors) something through some kind of financial contribution. */
    "schema:funder"?: SchemaValue<Organization | Person | IdReference, "schema:funder">;
    /** The language of the content or performance or used in an action. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/availableLanguage availableLanguage}. */
    "schema:inLanguage"?: SchemaValue<Language | Text | IdReference, "schema:inLanguage">;
    /** A flag to signal that the item, event, or place is accessible for free. */
    "schema:isAccessibleForFree"?: SchemaValue<Boolean, "schema:isAccessibleForFree">;
    /** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
    "schema:location"?: SchemaValue<Place | PostalAddress | Text | VirtualLocation | IdReference, "schema:location">;
    /** The total number of individuals that may attend an event or venue. */
    "schema:maximumAttendeeCapacity"?: SchemaValue<Integer, "schema:maximumAttendeeCapacity">;
    /** The maximum physical attendee capacity of an {@link https://schema.org/Event Event} whose {@link https://schema.org/eventAttendanceMode eventAttendanceMode} is {@link https://schema.org/OfflineEventAttendanceMode OfflineEventAttendanceMode} (or the offline aspects, in the case of a {@link https://schema.org/MixedEventAttendanceMode MixedEventAttendanceMode}). */
    "schema:maximumPhysicalAttendeeCapacity"?: SchemaValue<Integer, "schema:maximumPhysicalAttendeeCapacity">;
    /** The maximum physical attendee capacity of an {@link https://schema.org/Event Event} whose {@link https://schema.org/eventAttendanceMode eventAttendanceMode} is {@link https://schema.org/OnlineEventAttendanceMode OnlineEventAttendanceMode} (or the online aspects, in the case of a {@link https://schema.org/MixedEventAttendanceMode MixedEventAttendanceMode}). */
    "schema:maximumVirtualAttendeeCapacity"?: SchemaValue<Integer, "schema:maximumVirtualAttendeeCapacity">;
    /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use {@link https://schema.org/businessFunction businessFunction} to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a {@link https://schema.org/Demand Demand}. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:offers"?: SchemaValue<Demand | Offer | IdReference, "schema:offers">;
    /** An organizer of an Event. */
    "schema:organizer"?: SchemaValue<Organization | Person | IdReference, "schema:organizer">;
    /** A performer at the event—for example, a presenter, musician, musical group or actor. */
    "schema:performer"?: SchemaValue<Organization | Person | IdReference, "schema:performer">;
    /**
     * The main performer or performers of the event—for example, a presenter, musician, or actor.
     *
     * @deprecated Consider using https://schema.org/performer instead.
     */
    "schema:performers"?: SchemaValue<Organization | Person | IdReference, "schema:performers">;
    /** Used in conjunction with eventStatus for rescheduled or cancelled events. This property contains the previously scheduled start date. For rescheduled events, the startDate property should be used for the newly scheduled start date. In the (rare) case of an event that has been postponed and rescheduled multiple times, this field may be repeated. */
    "schema:previousStartDate"?: SchemaValue<Date, "schema:previousStartDate">;
    /** The CreativeWork that captured all or part of this Event. */
    "schema:recordedIn"?: SchemaValue<CreativeWork | IdReference, "schema:recordedIn">;
    /** The number of attendee places for an event that remain unallocated. */
    "schema:remainingAttendeeCapacity"?: SchemaValue<Integer, "schema:remainingAttendeeCapacity">;
    /** A review of the item. */
    "schema:review"?: SchemaValue<Review | IdReference, "schema:review">;
    /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
    "schema:sponsor"?: SchemaValue<Organization | Person | IdReference, "schema:sponsor">;
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:startDate"?: SchemaValue<Date | DateTime, "schema:startDate">;
    /** An Event that is part of this event. For example, a conference event includes many presentations, each of which is a subEvent of the conference. */
    "schema:subEvent"?: SchemaValue<Event | IdReference, "schema:subEvent">;
    /**
     * Events that are a part of this event. For example, a conference event includes many presentations, each subEvents of the conference.
     *
     * @deprecated Consider using https://schema.org/subEvent instead.
     */
    "schema:subEvents"?: SchemaValue<Event | IdReference, "schema:subEvents">;
    /** An event that this event is a part of. For example, a collection of individual music performances might each have a music festival as their superEvent. */
    "schema:superEvent"?: SchemaValue<Event | IdReference, "schema:superEvent">;
    /** Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event. */
    "schema:translator"?: SchemaValue<Organization | Person | IdReference, "schema:translator">;
    /** The typical expected age range, e.g. '7-9', '11-'. */
    "schema:typicalAgeRange"?: SchemaValue<Text, "schema:typicalAgeRange">;
    /** A work featured in some event, e.g. exhibited in an ExhibitionEvent. Specific subproperties are available for workPerformed (e.g. a play), or a workPresented (a Movie at a ScreeningEvent). */
    "schema:workFeatured"?: SchemaValue<CreativeWork | IdReference, "schema:workFeatured">;
    /** A work performed in some event, for example a play performed in a TheaterEvent. */
    "schema:workPerformed"?: SchemaValue<CreativeWork | IdReference, "schema:workPerformed">;
}
interface EventLeaf extends EventBase {
    "@type": "schema:Event";
}
/** An event happening at a certain time and location, such as a concert, lecture, or festival. Ticketing information may be added via the {@link https://schema.org/offers offers} property. Repeated events may be structured as separate Event objects. */
export type Event = EventLeaf | BusinessEvent | ChildrensEvent | ComedyEvent | CourseInstance | DanceEvent | DeliveryEvent | EducationEvent | EventSeries | ExhibitionEvent | Festival | FoodEvent | Hackathon | LiteraryEvent | MusicEvent | PublicationEvent | SaleEvent | ScreeningEvent | SocialEvent | SportsEvent | TheaterEvent | UserInteraction | VisualArtsEvent;

interface EventAttendanceModeEnumerationLeaf extends EnumerationBase {
    "@type": "schema:EventAttendanceModeEnumeration";
}
/** An EventAttendanceModeEnumeration value is one of potentially several modes of organising an event, relating to whether it is online or offline. */
export type EventAttendanceModeEnumeration = "https://schema.org/MixedEventAttendanceMode" | "schema:MixedEventAttendanceMode" | "https://schema.org/OfflineEventAttendanceMode" | "schema:OfflineEventAttendanceMode" | "https://schema.org/OnlineEventAttendanceMode" | "schema:OnlineEventAttendanceMode" | EventAttendanceModeEnumerationLeaf;

interface EventReservationLeaf extends ReservationBase {
    "@type": "schema:EventReservation";
}
/**
 * A reservation for an event like a concert, sporting event, or lecture.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use {@link https://schema.org/Offer Offer}.
 */
export type EventReservation = EventReservationLeaf;

interface EventSeriesBase extends EventBase, ThingBase {
}
interface EventSeriesLeaf extends EventSeriesBase {
    "@type": "schema:EventSeries";
}
/**
 * A series of {@link https://schema.org/Event Event}s. Included events can relate with the series using the {@link https://schema.org/superEvent superEvent} property.
 *
 * An EventSeries is a collection of events that share some unifying characteristic. For example, "The Olympic Games" is a series, which is repeated regularly. The "2012 London Olympics" can be presented both as an {@link https://schema.org/Event Event} in the series "Olympic Games", and as an {@link https://schema.org/EventSeries EventSeries} that included a number of sporting competitions as Events.
 *
 * The nature of the association between the events in an {@link https://schema.org/EventSeries EventSeries} can vary, but typical examples could include a thematic event series (e.g. topical meetups or classes), or a series of regular events that share a location, attendee group and/or organizers.
 *
 * EventSeries has been defined as a kind of Event to make it easy for publishers to use it in an Event context without worrying about which kinds of series are really event-like enough to call an Event. In general an EventSeries may seem more Event-like when the period of time is compact and when aspects such as location are fixed, but it may also sometimes prove useful to describe a longer-term series as an Event.
 */
export type EventSeries = EventSeriesLeaf;

interface EventStatusTypeLeaf extends EnumerationBase {
    "@type": "schema:EventStatusType";
}
/** EventStatusType is an enumeration type whose instances represent several states that an Event may be in. */
export type EventStatusType = "https://schema.org/EventCancelled" | "schema:EventCancelled" | "https://schema.org/EventMovedOnline" | "schema:EventMovedOnline" | "https://schema.org/EventPostponed" | "schema:EventPostponed" | "https://schema.org/EventRescheduled" | "schema:EventRescheduled" | "https://schema.org/EventScheduled" | "schema:EventScheduled" | EventStatusTypeLeaf;

interface EventVenueLeaf extends CivicStructureBase {
    "@type": "schema:EventVenue";
}
/** An event venue. */
export type EventVenue = EventVenueLeaf | string;

interface ExchangeRateSpecificationBase extends ThingBase {
    /**
     * The currency in which the monetary amount is expressed.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:currency"?: SchemaValue<Text, "schema:currency">;
    /** The current price of a currency. */
    "schema:currentExchangeRate"?: SchemaValue<UnitPriceSpecification | IdReference, "schema:currentExchangeRate">;
    /** The difference between the price at which a broker or other intermediary buys and sells foreign currency. */
    "schema:exchangeRateSpread"?: SchemaValue<MonetaryAmount | Number | IdReference, "schema:exchangeRateSpread">;
}
interface ExchangeRateSpecificationLeaf extends ExchangeRateSpecificationBase {
    "@type": "schema:ExchangeRateSpecification";
}
/** A structured value representing exchange rate. */
export type ExchangeRateSpecification = ExchangeRateSpecificationLeaf;

interface ExerciseActionBase extends PlayActionBase {
    /**
     * A sub property of location. The course where this action was taken.
     *
     * @deprecated Consider using https://schema.org/exerciseCourse instead.
     */
    "schema:course"?: SchemaValue<Place | IdReference, "schema:course">;
    /** A sub property of instrument. The diet used in this action. */
    "schema:diet"?: SchemaValue<Diet | IdReference, "schema:diet">;
    /** The distance travelled, e.g. exercising or travelling. */
    "schema:distance"?: SchemaValue<Distance | IdReference, "schema:distance">;
    /** A sub property of location. The course where this action was taken. */
    "schema:exerciseCourse"?: SchemaValue<Place | IdReference, "schema:exerciseCourse">;
    /** A sub property of instrument. The exercise plan used on this action. */
    "schema:exercisePlan"?: SchemaValue<ExercisePlan | IdReference, "schema:exercisePlan">;
    /** A sub property of instrument. The diet used in this action. */
    "schema:exerciseRelatedDiet"?: SchemaValue<Diet | IdReference, "schema:exerciseRelatedDiet">;
    /** Type(s) of exercise or activity, such as strength training, flexibility training, aerobics, cardiac rehabilitation, etc. */
    "schema:exerciseType"?: SchemaValue<Text, "schema:exerciseType">;
    /** A sub property of location. The original location of the object or the agent before the action. */
    "schema:fromLocation"?: SchemaValue<Place | IdReference, "schema:fromLocation">;
    /** A sub property of participant. The opponent on this action. */
    "schema:opponent"?: SchemaValue<Person | IdReference, "schema:opponent">;
    /** A sub property of location. The sports activity location where this action occurred. */
    "schema:sportsActivityLocation"?: SchemaValue<SportsActivityLocation | IdReference, "schema:sportsActivityLocation">;
    /** A sub property of location. The sports event where this action occurred. */
    "schema:sportsEvent"?: SchemaValue<SportsEvent | IdReference, "schema:sportsEvent">;
    /** A sub property of participant. The sports team that participated on this action. */
    "schema:sportsTeam"?: SchemaValue<SportsTeam | IdReference, "schema:sportsTeam">;
    /** A sub property of location. The final location of the object or the agent after the action. */
    "schema:toLocation"?: SchemaValue<Place | IdReference, "schema:toLocation">;
}
interface ExerciseActionLeaf extends ExerciseActionBase {
    "@type": "schema:ExerciseAction";
}
/** The act of participating in exertive activity for the purposes of improving health and fitness. */
export type ExerciseAction = ExerciseActionLeaf;

interface ExerciseGymLeaf extends LocalBusinessBase {
    "@type": "schema:ExerciseGym";
}
/** A gym. */
export type ExerciseGym = ExerciseGymLeaf | string;

interface ExercisePlanBase extends CreativeWorkBase, PhysicalActivityBase {
    /** Length of time to engage in the activity. */
    "schema:activityDuration"?: SchemaValue<Duration | QuantitativeValue | IdReference, "schema:activityDuration">;
    /** How often one should engage in the activity. */
    "schema:activityFrequency"?: SchemaValue<QuantitativeValue | Text | IdReference, "schema:activityFrequency">;
    /** Any additional component of the exercise prescription that may need to be articulated to the patient. This may include the order of exercises, the number of repetitions of movement, quantitative distance, progressions over time, etc. */
    "schema:additionalVariable"?: SchemaValue<Text, "schema:additionalVariable">;
    /** Type(s) of exercise or activity, such as strength training, flexibility training, aerobics, cardiac rehabilitation, etc. */
    "schema:exerciseType"?: SchemaValue<Text, "schema:exerciseType">;
    /** Quantitative measure gauging the degree of force involved in the exercise, for example, heartbeats per minute. May include the velocity of the movement. */
    "schema:intensity"?: SchemaValue<QuantitativeValue | Text | IdReference, "schema:intensity">;
    /** Number of times one should repeat the activity. */
    "schema:repetitions"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:repetitions">;
    /** How often one should break from the activity. */
    "schema:restPeriods"?: SchemaValue<QuantitativeValue | Text | IdReference, "schema:restPeriods">;
    /** Quantitative measure of the physiologic output of the exercise; also referred to as energy expenditure. */
    "schema:workload"?: SchemaValue<Energy | QuantitativeValue | IdReference, "schema:workload">;
}
interface ExercisePlanLeaf extends ExercisePlanBase {
    "@type": "schema:ExercisePlan";
}
/** Fitness-related activity designed for a specific health-related purpose, including defined exercise routines as well as activity prescribed by a clinician. */
export type ExercisePlan = ExercisePlanLeaf;

interface ExhibitionEventLeaf extends EventBase {
    "@type": "schema:ExhibitionEvent";
}
/** Event type: Exhibition event, e.g. at a museum, library, archive, tradeshow, ... */
export type ExhibitionEvent = ExhibitionEventLeaf;

interface ExpandedStateLeaf extends ElementBase {
    "@type": "uxi:ExpandedState";
}
/** A UI Element is in an expanded state when it is displayed in a size larger than its ideal display. For an accordeon menu, an open section would be in an expanded state rather than maximized state. */
export type ExpandedState = ExpandedStateLeaf;

interface FAQPageLeaf extends WebPageBase {
    "@type": "schema:FAQPage";
}
/** A {@link https://schema.org/FAQPage FAQPage} is a {@link https://schema.org/WebPage WebPage} presenting one or more "{@link https://en.wikipedia.org/wiki/FAQ Frequently asked questions}" (see also {@link https://schema.org/QAPage QAPage}). */
export type FAQPage = FAQPageLeaf;

interface FastFoodRestaurantLeaf extends FoodEstablishmentBase {
    "@type": "schema:FastFoodRestaurant";
}
/** A fast-food restaurant. */
export type FastFoodRestaurant = FastFoodRestaurantLeaf | string;

interface FavoriteActionLeaf extends UIActionBase {
    "@type": "uxi:FavoriteAction";
}
/** A user action to mark something as a favorite item. Often the intent is to easily access that item later on, e.g. through a quick-access menu */
export type FavoriteAction = FavoriteActionLeaf;

interface FestivalLeaf extends EventBase {
    "@type": "schema:Festival";
}
/** Event type: Festival. */
export type Festival = FestivalLeaf;

interface FilmActionLeaf extends ActionBase {
    "@type": "schema:FilmAction";
}
/** The act of capturing sound and moving images on film, video, or digitally. */
export type FilmAction = FilmActionLeaf;

interface FilteredStateLeaf extends ElementBase {
    "@type": "uxi:FilteredState";
}
/** A container in the filtered state shows only a subset of elements. Often a UI element outside the container controls the filtering. Useful when the number of elements in each filtered group is high */
export type FilteredState = FilteredStateLeaf;

interface FinancialProductBase extends ServiceBase {
    /** The annual rate that is charged for borrowing (or made by investing), expressed as a single percentage number that represents the actual yearly cost of funds over the term of a loan. This includes any fees or additional costs associated with the transaction. */
    "schema:annualPercentageRate"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:annualPercentageRate">;
    /** Description of fees, commissions, and other terms applied either to a class of financial product, or by a financial service organization. */
    "schema:feesAndCommissionsSpecification"?: SchemaValue<Text | URL, "schema:feesAndCommissionsSpecification">;
    /** The interest rate, charged or paid, applicable to the financial product. Note: This is different from the calculated annualPercentageRate. */
    "schema:interestRate"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:interestRate">;
}
interface FinancialProductLeaf extends FinancialProductBase {
    "@type": "schema:FinancialProduct";
}
/** A product provided to consumers and businesses by financial institutions such as banks, insurance companies, brokerage firms, consumer finance companies, and investment companies which comprise the financial services industry. */
export type FinancialProduct = FinancialProductLeaf | BankAccount | CurrencyConversionService | InvestmentOrDeposit | LoanOrCredit | PaymentCard | PaymentService;

interface FinancialServiceBase extends LocalBusinessBase {
    /** Description of fees, commissions, and other terms applied either to a class of financial product, or by a financial service organization. */
    "schema:feesAndCommissionsSpecification"?: SchemaValue<Text | URL, "schema:feesAndCommissionsSpecification">;
}
interface FinancialServiceLeaf extends FinancialServiceBase {
    "@type": "schema:FinancialService";
}
/** Financial services business. */
export type FinancialService = FinancialServiceLeaf | AccountingService | AutomatedTeller | BankOrCreditUnion | InsuranceAgency | string;

interface FindActionLeaf extends ActionBase {
    "@type": "schema:FindAction";
}
/**
 * The act of finding an object.
 *
 * Related actions:
 * - {@link https://schema.org/SearchAction SearchAction}: FindAction is generally lead by a SearchAction, but not necessarily.
 */
export type FindAction = FindActionLeaf | CheckAction | DiscoverAction | TrackAction;

interface FireStationBase extends CivicStructureBase, LocalBusinessBase {
}
interface FireStationLeaf extends FireStationBase {
    "@type": "schema:FireStation";
}
/** A fire station. With firemen. */
export type FireStation = FireStationLeaf | string;

interface FixedStateLeaf extends ElementBase {
    "@type": "uxi:FixedState";
}
/** A UI element is in a fixed state when it can't be moved, used to indicate the opposite of loose state. This is typically the default */
export type FixedState = FixedStateLeaf;

interface FlightBase extends TripBase {
    /** The kind of aircraft (e.g., "Boeing 747"). */
    "schema:aircraft"?: SchemaValue<Text | Vehicle | IdReference, "schema:aircraft">;
    /** The airport where the flight terminates. */
    "schema:arrivalAirport"?: SchemaValue<Airport | IdReference, "schema:arrivalAirport">;
    /** Identifier of the flight's arrival gate. */
    "schema:arrivalGate"?: SchemaValue<Text, "schema:arrivalGate">;
    /** Identifier of the flight's arrival terminal. */
    "schema:arrivalTerminal"?: SchemaValue<Text, "schema:arrivalTerminal">;
    /** The type of boarding policy used by the airline (e.g. zone-based or group-based). */
    "schema:boardingPolicy"?: SchemaValue<BoardingPolicyType | IdReference, "schema:boardingPolicy">;
    /**
     * 'carrier' is an out-dated term indicating the 'provider' for parcel delivery and flights.
     *
     * @deprecated Consider using https://schema.org/provider instead.
     */
    "schema:carrier"?: SchemaValue<Organization | IdReference, "schema:carrier">;
    /** The airport where the flight originates. */
    "schema:departureAirport"?: SchemaValue<Airport | IdReference, "schema:departureAirport">;
    /** Identifier of the flight's departure gate. */
    "schema:departureGate"?: SchemaValue<Text, "schema:departureGate">;
    /** Identifier of the flight's departure terminal. */
    "schema:departureTerminal"?: SchemaValue<Text, "schema:departureTerminal">;
    /** The estimated time the flight will take. */
    "schema:estimatedFlightDuration"?: SchemaValue<Duration | Text | IdReference, "schema:estimatedFlightDuration">;
    /** The distance of the flight. */
    "schema:flightDistance"?: SchemaValue<Distance | Text | IdReference, "schema:flightDistance">;
    /** The unique identifier for a flight including the airline IATA code. For example, if describing United flight 110, where the IATA code for United is 'UA', the flightNumber is 'UA110'. */
    "schema:flightNumber"?: SchemaValue<Text, "schema:flightNumber">;
    /** Description of the meals that will be provided or available for purchase. */
    "schema:mealService"?: SchemaValue<Text, "schema:mealService">;
    /** An entity which offers (sells / leases / lends / loans) the services / goods. A seller may also be a provider. */
    "schema:seller"?: SchemaValue<Organization | Person | IdReference, "schema:seller">;
    /** The time when a passenger can check into the flight online. */
    "schema:webCheckinTime"?: SchemaValue<DateTime, "schema:webCheckinTime">;
}
interface FlightLeaf extends FlightBase {
    "@type": "schema:Flight";
}
/** An airline flight. */
export type Flight = FlightLeaf;

interface FlightReservationBase extends ReservationBase {
    /** The airline-specific indicator of boarding order / preference. */
    "schema:boardingGroup"?: SchemaValue<Text, "schema:boardingGroup">;
    /** The priority status assigned to a passenger for security or boarding (e.g. FastTrack or Priority). */
    "schema:passengerPriorityStatus"?: SchemaValue<QualitativeValue | Text | IdReference, "schema:passengerPriorityStatus">;
    /** The passenger's sequence number as assigned by the airline. */
    "schema:passengerSequenceNumber"?: SchemaValue<Text, "schema:passengerSequenceNumber">;
    /** The type of security screening the passenger is subject to. */
    "schema:securityScreening"?: SchemaValue<Text, "schema:securityScreening">;
}
interface FlightReservationLeaf extends FlightReservationBase {
    "@type": "schema:FlightReservation";
}
/**
 * A reservation for air travel.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use {@link https://schema.org/Offer Offer}.
 */
export type FlightReservation = FlightReservationLeaf;

/** Data type: Floating number. */
export type Float = number | `${number}`;

interface FloatingStateLeaf extends ElementBase {
    "@type": "uxi:FloatingState";
}
/** A UI element is in a floating state when it is shown above all other elements. Typically used for the primary action of a screen on mobile devices */
export type FloatingState = FloatingStateLeaf;

interface FloorPlanBase extends ThingBase {
    /** An amenity feature (e.g. a characteristic or service) of the Accommodation. This generic property does not make a statement about whether the feature is included in an offer for the main accommodation or available at extra costs. */
    "schema:amenityFeature"?: SchemaValue<LocationFeatureSpecification | IdReference, "schema:amenityFeature">;
    /** The size of the accommodation, e.g. in square meter or squarefoot. Typical unit code(s): MTK for square meter, FTK for square foot, or YDK for square yard */
    "schema:floorSize"?: SchemaValue<QuantitativeValue | IdReference, "schema:floorSize">;
    /** Indicates some accommodation that this floor plan describes. */
    "schema:isPlanForApartment"?: SchemaValue<Accommodation | IdReference, "schema:isPlanForApartment">;
    /** A schematic image showing the floorplan layout. */
    "schema:layoutImage"?: SchemaValue<ImageObject | URL | IdReference, "schema:layoutImage">;
    /** Indicates the total (available plus unavailable) number of accommodation units in an {@link https://schema.org/ApartmentComplex ApartmentComplex}, or the number of accommodation units for a specific {@link https://schema.org/FloorPlan FloorPlan} (within its specific {@link https://schema.org/ApartmentComplex ApartmentComplex}). See also {@link https://schema.org/numberOfAvailableAccommodationUnits numberOfAvailableAccommodationUnits}. */
    "schema:numberOfAccommodationUnits"?: SchemaValue<QuantitativeValue | IdReference, "schema:numberOfAccommodationUnits">;
    /** Indicates the number of available accommodation units in an {@link https://schema.org/ApartmentComplex ApartmentComplex}, or the number of accommodation units for a specific {@link https://schema.org/FloorPlan FloorPlan} (within its specific {@link https://schema.org/ApartmentComplex ApartmentComplex}). See also {@link https://schema.org/numberOfAccommodationUnits numberOfAccommodationUnits}. */
    "schema:numberOfAvailableAccommodationUnits"?: SchemaValue<QuantitativeValue | IdReference, "schema:numberOfAvailableAccommodationUnits">;
    /** The total integer number of bathrooms in a some {@link https://schema.org/Accommodation Accommodation}, following real estate conventions as {@link https://ddwiki.reso.org/display/DDW17/BathroomsTotalInteger+Field documented in RESO}: "The simple sum of the number of bathrooms. For example for a property with two Full Bathrooms and one Half Bathroom, the Bathrooms Total Integer will be 3.". See also {@link https://schema.org/numberOfRooms numberOfRooms}. */
    "schema:numberOfBathroomsTotal"?: SchemaValue<Integer, "schema:numberOfBathroomsTotal">;
    /** The total integer number of bedrooms in a some {@link https://schema.org/Accommodation Accommodation}, {@link https://schema.org/ApartmentComplex ApartmentComplex} or {@link https://schema.org/FloorPlan FloorPlan}. */
    "schema:numberOfBedrooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfBedrooms">;
    /** Number of full bathrooms - The total number of full and ¾ bathrooms in an {@link https://schema.org/Accommodation Accommodation}. This corresponds to the {@link https://ddwiki.reso.org/display/DDW17/BathroomsFull+Field BathroomsFull field in RESO}. */
    "schema:numberOfFullBathrooms"?: SchemaValue<Number, "schema:numberOfFullBathrooms">;
    /** Number of partial bathrooms - The total number of half and ¼ bathrooms in an {@link https://schema.org/Accommodation Accommodation}. This corresponds to the {@link https://ddwiki.reso.org/display/DDW17/BathroomsPartial+Field BathroomsPartial field in RESO}. */
    "schema:numberOfPartialBathrooms"?: SchemaValue<Number, "schema:numberOfPartialBathrooms">;
    /** The number of rooms (excluding bathrooms and closets) of the accommodation or lodging business. Typical unit code(s): ROM for room or C62 for no unit. The type of room can be put in the unitText property of the QuantitativeValue. */
    "schema:numberOfRooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfRooms">;
    /** Indicates whether pets are allowed to enter the accommodation or lodging business. More detailed information can be put in a text value. */
    "schema:petsAllowed"?: SchemaValue<Boolean | Text, "schema:petsAllowed">;
}
interface FloorPlanLeaf extends FloorPlanBase {
    "@type": "schema:FloorPlan";
}
/** A FloorPlan is an explicit representation of a collection of similar accommodations, allowing the provision of common information (room counts, sizes, layout diagrams) and offers for rental or sale. In typical use, some {@link https://schema.org/ApartmentComplex ApartmentComplex} has an {@link https://schema.org/accommodationFloorPlan accommodationFloorPlan} which is a {@link https://schema.org/FloorPlan FloorPlan}. A FloorPlan is always in the context of a particular place, either a larger {@link https://schema.org/ApartmentComplex ApartmentComplex} or a single {@link https://schema.org/Apartment Apartment}. The visual/spatial aspects of a floor plan (i.e. room layout, {@link https://en.wikipedia.org/wiki/Floor_plan see wikipedia}) can be indicated using {@link https://schema.org/image image}. */
export type FloorPlan = FloorPlanLeaf;

interface FloristLeaf extends LocalBusinessBase {
    "@type": "schema:Florist";
}
/** A florist. */
export type Florist = FloristLeaf | string;

interface FMRadioChannelLeaf extends BroadcastChannelBase {
    "@type": "schema:FMRadioChannel";
}
/** A radio channel that uses FM. */
export type FMRadioChannel = FMRadioChannelLeaf;

interface FocusStateLeaf extends ElementBase {
    "@type": "uxi:FocusState";
}
/** When the user is focussing an interactive element, it enters the focus state. Can happen with a mouse, with the tabulator-key or in other ways */
export type FocusState = FocusStateLeaf;

interface FollowActionBase extends ActionBase {
    /** A sub property of object. The person or organization being followed. */
    "schema:followee"?: SchemaValue<Organization | Person | IdReference, "schema:followee">;
}
interface FollowActionLeaf extends FollowActionBase {
    "@type": "schema:FollowAction";
}
/**
 * The act of forming a personal connection with someone/something (object) unidirectionally/asymmetrically to get updates polled from.
 *
 * Related actions:
 * - {@link https://schema.org/BefriendAction BefriendAction}: Unlike BefriendAction, FollowAction implies that the connection is _not_ necessarily reciprocal.
 * - {@link https://schema.org/SubscribeAction SubscribeAction}: Unlike SubscribeAction, FollowAction implies that the follower acts as an active agent constantly/actively polling for updates.
 * - {@link https://schema.org/RegisterAction RegisterAction}: Unlike RegisterAction, FollowAction implies that the agent is interested in continuing receiving updates from the object.
 * - {@link https://schema.org/JoinAction JoinAction}: Unlike JoinAction, FollowAction implies that the agent is interested in getting updates from the object.
 * - {@link https://schema.org/TrackAction TrackAction}: Unlike TrackAction, FollowAction refers to the polling of updates of all aspects of animate objects rather than the location of inanimate objects (e.g. you track a package, but you don't follow it).
 */
export type FollowAction = FollowActionLeaf;

interface FoodEstablishmentBase extends LocalBusinessBase {
    /** Indicates whether a FoodEstablishment accepts reservations. Values can be Boolean, an URL at which reservations can be made or (for backwards compatibility) the strings `Yes` or `No`. */
    "schema:acceptsReservations"?: SchemaValue<Boolean | Text | URL, "schema:acceptsReservations">;
    /** Either the actual menu as a structured representation, as text, or a URL of the menu. */
    "schema:hasMenu"?: SchemaValue<Menu | Text | URL | IdReference, "schema:hasMenu">;
    /**
     * Either the actual menu as a structured representation, as text, or a URL of the menu.
     *
     * @deprecated Consider using https://schema.org/hasMenu instead.
     */
    "schema:menu"?: SchemaValue<Menu | Text | URL | IdReference, "schema:menu">;
    /** The cuisine of the restaurant. */
    "schema:servesCuisine"?: SchemaValue<Text, "schema:servesCuisine">;
    /** An official rating for a lodging business or food establishment, e.g. from national associations or standards bodies. Use the author property to indicate the rating organization, e.g. as an Organization with name such as (e.g. HOTREC, DEHOGA, WHR, or Hotelstars). */
    "schema:starRating"?: SchemaValue<Rating | IdReference, "schema:starRating">;
}
interface FoodEstablishmentLeaf extends FoodEstablishmentBase {
    "@type": "schema:FoodEstablishment";
}
/** A food-related business. */
export type FoodEstablishment = FoodEstablishmentLeaf | Bakery | BarOrPub | Brewery | CafeOrCoffeeShop | Distillery | FastFoodRestaurant | IceCreamShop | Restaurant | Winery | string;

interface FoodEstablishmentReservationBase extends ReservationBase {
    /**
     * The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. e.g. John wrote a book from January to _December_. For media, including audio and video, it's the time offset of the end of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:endTime"?: SchemaValue<DateTime | Time, "schema:endTime">;
    /** Number of people the reservation should accommodate. */
    "schema:partySize"?: SchemaValue<Integer | QuantitativeValue | IdReference, "schema:partySize">;
    /**
     * The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. e.g. John wrote a book from _January_ to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:startTime"?: SchemaValue<DateTime | Time, "schema:startTime">;
}
interface FoodEstablishmentReservationLeaf extends FoodEstablishmentReservationBase {
    "@type": "schema:FoodEstablishmentReservation";
}
/**
 * A reservation to dine at a food-related business.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations.
 */
export type FoodEstablishmentReservation = FoodEstablishmentReservationLeaf;

interface FoodEventLeaf extends EventBase {
    "@type": "schema:FoodEvent";
}
/** Event type: Food event. */
export type FoodEvent = FoodEventLeaf;

interface FoodServiceLeaf extends ServiceBase {
    "@type": "schema:FoodService";
}
/** A food service, like breakfast, lunch, or dinner. */
export type FoodService = FoodServiceLeaf;

interface FooterLeaf extends UIElementBase {
    "@type": "uxi:Footer";
}
/** A Footer is a type of Organism UI Element that contains UI elements for the least commonly used information, at the bottom of a page. Leaving it out is often not an option, because of legal requirements etc. Information such as imprint or contact info is so commonly found at the bottom that users who want to search for it directly scroll to the bottom. */
export type Footer = FooterLeaf;

interface FormLeaf extends ElementBase {
    "@type": "uxi:Form";
}
/** A Form is a Structural Element that users can use to submit information. The UI elements inside forms are often referred to as inputs or form controls. To aid the user, inputs and form controls can limit the selectable options or validate user input and display help. */
export type Form = FormLeaf;

interface FundingAgencyLeaf extends OrganizationBase {
    "@type": "schema:FundingAgency";
}
/**
 * A FundingAgency is an organization that implements one or more {@link https://schema.org/FundingScheme FundingScheme}s and manages the granting process (via {@link https://schema.org/Grant Grant}s, typically {@link https://schema.org/MonetaryGrant MonetaryGrant}s). A funding agency is not always required for grant funding, e.g. philanthropic giving, corporate sponsorship etc.
 *
 * Examples of funding agencies include ERC, REA, NIH, Bill and Melinda Gates Foundation...
 */
export type FundingAgency = FundingAgencyLeaf | string;

interface FundingSchemeLeaf extends OrganizationBase {
    "@type": "schema:FundingScheme";
}
/** A FundingScheme combines organizational, project and policy aspects of grant-based funding that sets guidelines, principles and mechanisms to support other kinds of projects and activities. Funding is typically organized via {@link https://schema.org/Grant Grant} funding. Examples of funding schemes: Swiss Priority Programmes (SPPs); EU Framework 7 (FP7); Horizon 2020; the NIH-R01 Grant Program; Wellcome institutional strategic support fund. For large scale public sector funding, the management and administration of grant awards is often handled by other, dedicated, organizations - {@link https://schema.org/FundingAgency FundingAgency}s such as ERC, REA, ... */
export type FundingScheme = FundingSchemeLeaf | string;

interface FurnitureStoreLeaf extends LocalBusinessBase {
    "@type": "schema:FurnitureStore";
}
/** A furniture store. */
export type FurnitureStore = FurnitureStoreLeaf | string;

interface GameBase extends CreativeWorkBase {
    /** A piece of data that represents a particular aspect of a fictional character (skill, power, character points, advantage, disadvantage). */
    "schema:characterAttribute"?: SchemaValue<Thing | IdReference, "schema:characterAttribute">;
    /** An item is an object within the game world that can be collected by a player or, occasionally, a non-player character. */
    "schema:gameItem"?: SchemaValue<Thing | IdReference, "schema:gameItem">;
    /** Real or fictional location of the game (or part of game). */
    "schema:gameLocation"?: SchemaValue<Place | PostalAddress | URL | IdReference, "schema:gameLocation">;
    /** Indicate how many people can play this game (minimum, maximum, or range). */
    "schema:numberOfPlayers"?: SchemaValue<QuantitativeValue | IdReference, "schema:numberOfPlayers">;
    /** The task that a player-controlled character, or group of characters may complete in order to gain a reward. */
    "schema:quest"?: SchemaValue<Thing | IdReference, "schema:quest">;
}
interface GameLeaf extends GameBase {
    "@type": "schema:Game";
}
/** The Game type represents things which are games. These are typically rule-governed recreational activities, e.g. role-playing games in which players assume the role of characters in a fictional setting. */
export type Game = GameLeaf | VideoGame;

interface GamePlayModeLeaf extends EnumerationBase {
    "@type": "schema:GamePlayMode";
}
/** Indicates whether this game is multi-player, co-op or single-player. */
export type GamePlayMode = "https://schema.org/CoOp" | "schema:CoOp" | "https://schema.org/MultiPlayer" | "schema:MultiPlayer" | "https://schema.org/SinglePlayer" | "schema:SinglePlayer" | GamePlayModeLeaf;

interface GameServerBase extends ThingBase {
    /** Video game which is played on this server. */
    "schema:game"?: SchemaValue<VideoGame | IdReference, "schema:game">;
    /** Number of players on the server. */
    "schema:playersOnline"?: SchemaValue<Integer, "schema:playersOnline">;
    /** Status of a game server. */
    "schema:serverStatus"?: SchemaValue<GameServerStatus | IdReference, "schema:serverStatus">;
}
interface GameServerLeaf extends GameServerBase {
    "@type": "schema:GameServer";
}
/** Server that provides game interaction in a multiplayer game. */
export type GameServer = GameServerLeaf;

interface GameServerStatusLeaf extends EnumerationBase {
    "@type": "schema:GameServerStatus";
}
/** Status of a game server. */
export type GameServerStatus = "https://schema.org/OfflinePermanently" | "schema:OfflinePermanently" | "https://schema.org/OfflineTemporarily" | "schema:OfflineTemporarily" | "https://schema.org/Online" | "schema:Online" | "https://schema.org/OnlineFull" | "schema:OnlineFull" | GameServerStatusLeaf;

interface GardenStoreLeaf extends LocalBusinessBase {
    "@type": "schema:GardenStore";
}
/** A garden store. */
export type GardenStore = GardenStoreLeaf | string;

interface GasStationLeaf extends LocalBusinessBase {
    "@type": "schema:GasStation";
}
/** A gas station. */
export type GasStation = GasStationLeaf | string;

interface GatedResidenceCommunityLeaf extends ResidenceBase {
    "@type": "schema:GatedResidenceCommunity";
}
/** Residence type: Gated community. */
export type GatedResidenceCommunity = GatedResidenceCommunityLeaf | string;

interface GenderTypeLeaf extends EnumerationBase {
    "@type": "schema:GenderType";
}
/** An enumeration of genders. */
export type GenderType = "https://schema.org/Female" | "schema:Female" | "https://schema.org/Male" | "schema:Male" | GenderTypeLeaf;

interface GeneBase extends BioChemEntityBase {
    /** Another gene which is a variation of this one. */
    "schema:alternativeOf"?: SchemaValue<Gene | IdReference, "schema:alternativeOf">;
    /** Another BioChemEntity encoded by this one. */
    "schema:encodesBioChemEntity"?: SchemaValue<BioChemEntity | IdReference, "schema:encodesBioChemEntity">;
    /** Tissue, organ, biological sample, etc in which activity of this gene has been observed experimentally. For example brain, digestive system. */
    "schema:expressedIn"?: SchemaValue<AnatomicalStructure | AnatomicalSystem | BioChemEntity | DefinedTerm | IdReference, "schema:expressedIn">;
    /** A symbolic representation of a BioChemEnity. For example, a nucleotide sequence of a Gene or an amino acid sequence of a Protein. */
    "schema:hasBioPolymerSequence"?: SchemaValue<Text, "schema:hasBioPolymerSequence">;
}
interface GeneLeaf extends GeneBase {
    "@type": "schema:Gene";
}
/** A discrete unit of inheritance which affects one or more biological traits (Source: {@link https://en.wikipedia.org/wiki/Gene https://en.wikipedia.org/wiki/Gene}). Examples include FOXP2 (Forkhead box protein P2), SCARNA21 (small Cajal body-specific RNA 21), A- (agouti genotype). */
export type Gene = GeneLeaf;

interface GeneralContractorLeaf extends LocalBusinessBase {
    "@type": "schema:GeneralContractor";
}
/** A general contractor. */
export type GeneralContractor = GeneralContractorLeaf | string;

interface GeoCircleBase extends GeoShapeBase {
    /** Indicates the GeoCoordinates at the centre of a GeoShape e.g. GeoCircle. */
    "schema:geoMidpoint"?: SchemaValue<GeoCoordinates | IdReference, "schema:geoMidpoint">;
    /** Indicates the approximate radius of a GeoCircle (metres unless indicated otherwise via Distance notation). */
    "schema:geoRadius"?: SchemaValue<Distance | Number | Text | IdReference, "schema:geoRadius">;
}
interface GeoCircleLeaf extends GeoCircleBase {
    "@type": "schema:GeoCircle";
}
/** A GeoCircle is a GeoShape representing a circular geographic area. As it is a GeoShape it provides the simple textual property 'circle', but also allows the combination of postalCode alongside geoRadius. The center of the circle can be indicated via the 'geoMidpoint' property, or more approximately using 'address', 'postalCode'. */
export type GeoCircle = GeoCircleLeaf;

interface GeoCoordinatesBase extends ThingBase {
    /** Physical address of the item. */
    "schema:address"?: SchemaValue<PostalAddress | Text | IdReference, "schema:address">;
    /** The country. For example, USA. You can also provide the two-letter {@link http://en.wikipedia.org/wiki/ISO_3166-1 ISO 3166-1 alpha-2 country code}. */
    "schema:addressCountry"?: SchemaValue<Country | Text | IdReference, "schema:addressCountry">;
    /** The elevation of a location ({@link https://en.wikipedia.org/wiki/World_Geodetic_System WGS 84}). Values may be of the form 'NUMBER UNIT_OF_MEASUREMENT' (e.g., '1,000 m', '3,200 ft') while numbers alone should be assumed to be a value in meters. */
    "schema:elevation"?: SchemaValue<Number | Text, "schema:elevation">;
    /** The latitude of a location. For example `37.42242` ({@link https://en.wikipedia.org/wiki/World_Geodetic_System WGS 84}). */
    "schema:latitude"?: SchemaValue<Number | Text, "schema:latitude">;
    /** The longitude of a location. For example `-122.08585` ({@link https://en.wikipedia.org/wiki/World_Geodetic_System WGS 84}). */
    "schema:longitude"?: SchemaValue<Number | Text, "schema:longitude">;
    /** The postal code. For example, 94043. */
    "schema:postalCode"?: SchemaValue<Text, "schema:postalCode">;
}
interface GeoCoordinatesLeaf extends GeoCoordinatesBase {
    "@type": "schema:GeoCoordinates";
}
/** The geographic coordinates of a place or event. */
export type GeoCoordinates = GeoCoordinatesLeaf;

interface GeoShapeBase extends ThingBase {
    /** Physical address of the item. */
    "schema:address"?: SchemaValue<PostalAddress | Text | IdReference, "schema:address">;
    /** The country. For example, USA. You can also provide the two-letter {@link http://en.wikipedia.org/wiki/ISO_3166-1 ISO 3166-1 alpha-2 country code}. */
    "schema:addressCountry"?: SchemaValue<Country | Text | IdReference, "schema:addressCountry">;
    /** A box is the area enclosed by the rectangle formed by two points. The first point is the lower corner, the second point is the upper corner. A box is expressed as two points separated by a space character. */
    "schema:box"?: SchemaValue<Text, "schema:box">;
    /** A circle is the circular region of a specified radius centered at a specified latitude and longitude. A circle is expressed as a pair followed by a radius in meters. */
    "schema:circle"?: SchemaValue<Text, "schema:circle">;
    /** The elevation of a location ({@link https://en.wikipedia.org/wiki/World_Geodetic_System WGS 84}). Values may be of the form 'NUMBER UNIT_OF_MEASUREMENT' (e.g., '1,000 m', '3,200 ft') while numbers alone should be assumed to be a value in meters. */
    "schema:elevation"?: SchemaValue<Number | Text, "schema:elevation">;
    /** A line is a point-to-point path consisting of two or more points. A line is expressed as a series of two or more point objects separated by space. */
    "schema:line"?: SchemaValue<Text, "schema:line">;
    /** A polygon is the area enclosed by a point-to-point path for which the starting and ending points are the same. A polygon is expressed as a series of four or more space delimited points where the first and final points are identical. */
    "schema:polygon"?: SchemaValue<Text, "schema:polygon">;
    /** The postal code. For example, 94043. */
    "schema:postalCode"?: SchemaValue<Text, "schema:postalCode">;
}
interface GeoShapeLeaf extends GeoShapeBase {
    "@type": "schema:GeoShape";
}
/** The geographic shape of a place. A GeoShape can be described using several properties whose values are based on latitude/longitude pairs. Either whitespace or commas can be used to separate latitude and longitude; whitespace should be used when writing a list of several such points. */
export type GeoShape = GeoShapeLeaf | GeoCircle;

interface GeospatialGeometryBase extends ThingBase {
    /** Represents a relationship between two geometries (or the places they represent), relating a containing geometry to a contained geometry. "a contains b iff no points of b lie in the exterior of a, and at least one point of the interior of b lies in the interior of a". As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoContains"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoContains">;
    /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that covers it. As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoCoveredBy"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoCoveredBy">;
    /** Represents a relationship between two geometries (or the places they represent), relating a covering geometry to a covered geometry. "Every point of b is a point of (the interior or boundary of) a". As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoCovers"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoCovers">;
    /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that crosses it: "a crosses b: they have some but not all interior points in common, and the dimension of the intersection is less than that of at least one of them". As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoCrosses"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoCrosses">;
    /** Represents spatial relations in which two geometries (or the places they represent) are topologically disjoint: they have no point in common. They form a set of disconnected geometries." (a symmetric relationship, as defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}) */
    "schema:geoDisjoint"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoDisjoint">;
    /** Represents spatial relations in which two geometries (or the places they represent) are topologically equal, as defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. "Two geometries are topologically equal if their interiors intersect and no part of the interior or boundary of one geometry intersects the exterior of the other" (a symmetric relationship) */
    "schema:geoEquals"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoEquals">;
    /** Represents spatial relations in which two geometries (or the places they represent) have at least one point in common. As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoIntersects"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoIntersects">;
    /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that geospatially overlaps it, i.e. they have some but not all points in common. As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoOverlaps"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoOverlaps">;
    /** Represents spatial relations in which two geometries (or the places they represent) touch: they have at least one boundary point in common, but no interior points." (a symmetric relationship, as defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM} ) */
    "schema:geoTouches"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoTouches">;
    /** Represents a relationship between two geometries (or the places they represent), relating a geometry to one that contains it, i.e. it is inside (i.e. within) its interior. As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoWithin"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoWithin">;
}
interface GeospatialGeometryLeaf extends GeospatialGeometryBase {
    "@type": "schema:GeospatialGeometry";
}
/** (Eventually to be defined as) a supertype of GeoShape designed to accommodate definitions from Geo-Spatial best practices. */
export type GeospatialGeometry = GeospatialGeometryLeaf;

interface GeriatricLeaf extends LocalBusinessBase {
    "@type": "schema:Geriatric";
}
/** A specific branch of medical science that is concerned with the diagnosis and treatment of diseases, debilities and provision of care to the aged. */
export type Geriatric = GeriatricLeaf | string;

interface GiveActionBase extends TransferActionBase {
    /** A sub property of participant. The participant who is at the receiving end of the action. */
    "schema:recipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:recipient">;
}
interface GiveActionLeaf extends GiveActionBase {
    "@type": "schema:GiveAction";
}
/**
 * The act of transferring ownership of an object to a destination. Reciprocal of TakeAction.
 *
 * Related actions:
 * - {@link https://schema.org/TakeAction TakeAction}: Reciprocal of GiveAction.
 * - {@link https://schema.org/SendAction SendAction}: Unlike SendAction, GiveAction implies that ownership is being transferred (e.g. I may send my laptop to you, but that doesn't mean I'm giving it to you).
 */
export type GiveAction = GiveActionLeaf;

interface GolfCourseLeaf extends LocalBusinessBase {
    "@type": "schema:GolfCourse";
}
/** A golf course. */
export type GolfCourse = GolfCourseLeaf | string;

interface GovernmentBenefitsTypeLeaf extends EnumerationBase {
    "@type": "schema:GovernmentBenefitsType";
}
/** GovernmentBenefitsType enumerates several kinds of government benefits to support the COVID-19 situation. Note that this structure may not capture all benefits offered. */
export type GovernmentBenefitsType = "https://schema.org/BasicIncome" | "schema:BasicIncome" | "https://schema.org/BusinessSupport" | "schema:BusinessSupport" | "https://schema.org/DisabilitySupport" | "schema:DisabilitySupport" | "https://schema.org/HealthCare" | "schema:HealthCare" | "https://schema.org/OneTimePayments" | "schema:OneTimePayments" | "https://schema.org/PaidLeave" | "schema:PaidLeave" | "https://schema.org/ParentalSupport" | "schema:ParentalSupport" | "https://schema.org/UnemploymentSupport" | "schema:UnemploymentSupport" | GovernmentBenefitsTypeLeaf;

interface GovernmentBuildingLeaf extends CivicStructureBase {
    "@type": "schema:GovernmentBuilding";
}
/** A government building. */
export type GovernmentBuilding = GovernmentBuildingLeaf | CityHall | Courthouse | DefenceEstablishment | Embassy | LegislativeBuilding | string;

interface GovernmentOfficeLeaf extends LocalBusinessBase {
    "@type": "schema:GovernmentOffice";
}
/** A government office—for example, an IRS or DMV office. */
export type GovernmentOffice = GovernmentOfficeLeaf | PostOffice | string;

interface GovernmentOrganizationLeaf extends OrganizationBase {
    "@type": "schema:GovernmentOrganization";
}
/** A governmental organization or agency. */
export type GovernmentOrganization = GovernmentOrganizationLeaf | string;

interface GovernmentPermitLeaf extends PermitBase {
    "@type": "schema:GovernmentPermit";
}
/** A permit issued by a government agency. */
export type GovernmentPermit = GovernmentPermitLeaf;

interface GovernmentServiceBase extends ServiceBase {
    /** Indicates a legal jurisdiction, e.g. of some legislation, or where some government service is based. */
    "schema:jurisdiction"?: SchemaValue<AdministrativeArea | Text | IdReference, "schema:jurisdiction">;
    /** The operating organization, if different from the provider. This enables the representation of services that are provided by an organization, but operated by another organization like a subcontractor. */
    "schema:serviceOperator"?: SchemaValue<Organization | IdReference, "schema:serviceOperator">;
}
interface GovernmentServiceLeaf extends GovernmentServiceBase {
    "@type": "schema:GovernmentService";
}
/** A service provided by a government organization, e.g. food stamps, veterans benefits, etc. */
export type GovernmentService = GovernmentServiceLeaf;

interface GrantBase extends ThingBase {
    /** Indicates an item funded or sponsored through a {@link https://schema.org/Grant Grant}. */
    "schema:fundedItem"?: SchemaValue<Thing | IdReference, "schema:fundedItem">;
    /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
    "schema:sponsor"?: SchemaValue<Organization | Person | IdReference, "schema:sponsor">;
}
interface GrantLeaf extends GrantBase {
    "@type": "schema:Grant";
}
/**
 * A grant, typically financial or otherwise quantifiable, of resources. Typically a {@link https://schema.org/funder funder} sponsors some {@link https://schema.org/MonetaryAmount MonetaryAmount} to an {@link https://schema.org/Organization Organization} or {@link https://schema.org/Person Person}, sometimes not necessarily via a dedicated or long-lived {@link https://schema.org/Project Project}, resulting in one or more outputs, or {@link https://schema.org/fundedItem fundedItem}s. For financial sponsorship, indicate the {@link https://schema.org/funder funder} of a {@link https://schema.org/MonetaryGrant MonetaryGrant}. For non-financial support, indicate {@link https://schema.org/sponsor sponsor} of {@link https://schema.org/Grant Grant}s of resources (e.g. office space).
 *
 * Grants support activities directed towards some agreed collective goals, often but not always organized as {@link https://schema.org/Project Project}s. Long-lived projects are sometimes sponsored by a variety of grants over time, but it is also common for a project to be associated with a single grant.
 *
 * The amount of a {@link https://schema.org/Grant Grant} is represented using {@link https://schema.org/amount amount} as a {@link https://schema.org/MonetaryAmount MonetaryAmount}.
 */
export type Grant = GrantLeaf | MonetaryGrant;

interface GridLeaf extends ContainerUIElementBase {
    "@type": "uxi:Grid";
}
/** A Grid is a container that shows other UI elements in rows and columns, independently of another. If the row and column-number have meaning, use a Table instead. */
export type Grid = GridLeaf;

interface GroceryStoreLeaf extends LocalBusinessBase {
    "@type": "schema:GroceryStore";
}
/** A grocery store. */
export type GroceryStore = GroceryStoreLeaf | string;

interface GroupLeaf extends ElementBase {
    "@type": "uxi:Group";
}
/** A group is used to refer to a number of users that share common features, and thus can be treated similarly. Users typically belong to a group for a longer time, so group-level permissions determine the basic UI a user sees. If the activity determines the permissions, user roles are a better way to handle UI access. */
export type Group = GroupLeaf;

interface GuideBase extends CreativeWorkBase {
    /** This Review or Rating is relevant to this part or facet of the itemReviewed. */
    "schema:reviewAspect"?: SchemaValue<Text, "schema:reviewAspect">;
}
interface GuideLeaf extends GuideBase {
    "@type": "schema:Guide";
}
/** {@link https://schema.org/Guide Guide} is a page or article that recommend specific products or services, or aspects of a thing for a user to consider. A {@link https://schema.org/Guide Guide} may represent a Buying Guide and detail aspects of products or services for a user to consider. A {@link https://schema.org/Guide Guide} may represent a Product Guide and recommend specific products or services. A {@link https://schema.org/Guide Guide} may represent a Ranked List and recommend specific products or services with ranking. */
export type Guide = GuideLeaf;

interface GynecologicLeaf extends LocalBusinessBase {
    "@type": "schema:Gynecologic";
}
/** A specific branch of medical science that pertains to the health care of women, particularly in the diagnosis and treatment of disorders affecting the female reproductive system. */
export type Gynecologic = GynecologicLeaf | string;

interface HackathonLeaf extends EventBase {
    "@type": "schema:Hackathon";
}
/** A {@link https://en.wikipedia.org/wiki/Hackathon hackathon} event. */
export type Hackathon = HackathonLeaf;

interface HairSalonLeaf extends LocalBusinessBase {
    "@type": "schema:HairSalon";
}
/** A hair salon. */
export type HairSalon = HairSalonLeaf | string;

interface HardwareStoreLeaf extends LocalBusinessBase {
    "@type": "schema:HardwareStore";
}
/** A hardware store. */
export type HardwareStore = HardwareStoreLeaf | string;

interface HeaderLeaf extends UIElementBase {
    "@type": "uxi:Header";
}
/** A Header is a type of Organism UI Element that contains UI Elements for the most common actions on a page, and is placed at the top. Beware that the term 'Header' or 'head' is also used for the invisible, technical part of documents which contain info like keywords (html), dates (photo taken) or login-info. */
export type Header = HeaderLeaf;

interface HeadingLeaf extends UIElementBase {
    "@type": "uxi:Heading";
}
/** A heading is a UI element that serves as the head of another UI element, usually setting it apart in typography, style or position. In HTML there are different heading sizes which can be used for visual and semantic hierarchy. Check out Subheading, Title and Subtitle as well */
export type Heading = HeadingLeaf;

interface HealthAndBeautyBusinessLeaf extends LocalBusinessBase {
    "@type": "schema:HealthAndBeautyBusiness";
}
/** Health and beauty. */
export type HealthAndBeautyBusiness = HealthAndBeautyBusinessLeaf | BeautySalon | DaySpa | HairSalon | HealthClub | NailSalon | TattooParlor | string;

interface HealthAspectEnumerationLeaf extends EnumerationBase {
    "@type": "schema:HealthAspectEnumeration";
}
/** HealthAspectEnumeration enumerates several aspects of health content online, each of which might be described using {@link https://schema.org/hasHealthAspect hasHealthAspect} and {@link https://schema.org/HealthTopicContent HealthTopicContent}. */
export type HealthAspectEnumeration = "https://schema.org/AllergiesHealthAspect" | "schema:AllergiesHealthAspect" | "https://schema.org/BenefitsHealthAspect" | "schema:BenefitsHealthAspect" | "https://schema.org/CausesHealthAspect" | "schema:CausesHealthAspect" | "https://schema.org/ContagiousnessHealthAspect" | "schema:ContagiousnessHealthAspect" | "https://schema.org/EffectivenessHealthAspect" | "schema:EffectivenessHealthAspect" | "https://schema.org/GettingAccessHealthAspect" | "schema:GettingAccessHealthAspect" | "https://schema.org/HowItWorksHealthAspect" | "schema:HowItWorksHealthAspect" | "https://schema.org/HowOrWhereHealthAspect" | "schema:HowOrWhereHealthAspect" | "https://schema.org/IngredientsHealthAspect" | "schema:IngredientsHealthAspect" | "https://schema.org/LivingWithHealthAspect" | "schema:LivingWithHealthAspect" | "https://schema.org/MayTreatHealthAspect" | "schema:MayTreatHealthAspect" | "https://schema.org/MisconceptionsHealthAspect" | "schema:MisconceptionsHealthAspect" | "https://schema.org/OverviewHealthAspect" | "schema:OverviewHealthAspect" | "https://schema.org/PatientExperienceHealthAspect" | "schema:PatientExperienceHealthAspect" | "https://schema.org/PregnancyHealthAspect" | "schema:PregnancyHealthAspect" | "https://schema.org/PreventionHealthAspect" | "schema:PreventionHealthAspect" | "https://schema.org/PrognosisHealthAspect" | "schema:PrognosisHealthAspect" | "https://schema.org/RelatedTopicsHealthAspect" | "schema:RelatedTopicsHealthAspect" | "https://schema.org/RisksOrComplicationsHealthAspect" | "schema:RisksOrComplicationsHealthAspect" | "https://schema.org/SafetyHealthAspect" | "schema:SafetyHealthAspect" | "https://schema.org/ScreeningHealthAspect" | "schema:ScreeningHealthAspect" | "https://schema.org/SeeDoctorHealthAspect" | "schema:SeeDoctorHealthAspect" | "https://schema.org/SelfCareHealthAspect" | "schema:SelfCareHealthAspect" | "https://schema.org/SideEffectsHealthAspect" | "schema:SideEffectsHealthAspect" | "https://schema.org/StagesHealthAspect" | "schema:StagesHealthAspect" | "https://schema.org/SymptomsHealthAspect" | "schema:SymptomsHealthAspect" | "https://schema.org/TreatmentsHealthAspect" | "schema:TreatmentsHealthAspect" | "https://schema.org/TypesHealthAspect" | "schema:TypesHealthAspect" | "https://schema.org/UsageOrScheduleHealthAspect" | "schema:UsageOrScheduleHealthAspect" | HealthAspectEnumerationLeaf;

interface HealthClubBase extends LocalBusinessBase, LocalBusinessBase {
}
interface HealthClubLeaf extends HealthClubBase {
    "@type": "schema:HealthClub";
}
/** A health club. */
export type HealthClub = HealthClubLeaf | string;

interface HealthInsurancePlanBase extends ThingBase {
    /** The URL that goes directly to the summary of benefits and coverage for the specific standard plan or plan variation. */
    "schema:benefitsSummaryUrl"?: SchemaValue<URL, "schema:benefitsSummaryUrl">;
    /** A contact point for a person or organization. */
    "schema:contactPoint"?: SchemaValue<ContactPoint | IdReference, "schema:contactPoint">;
    /** TODO. */
    "schema:healthPlanDrugOption"?: SchemaValue<Text, "schema:healthPlanDrugOption">;
    /** The tier(s) of drugs offered by this formulary or insurance plan. */
    "schema:healthPlanDrugTier"?: SchemaValue<Text, "schema:healthPlanDrugTier">;
    /** The 14-character, HIOS-generated Plan ID number. (Plan IDs must be unique, even across different markets.) */
    "schema:healthPlanId"?: SchemaValue<Text, "schema:healthPlanId">;
    /** The URL that goes directly to the plan brochure for the specific standard plan or plan variation. */
    "schema:healthPlanMarketingUrl"?: SchemaValue<URL, "schema:healthPlanMarketingUrl">;
    /** Formularies covered by this plan. */
    "schema:includesHealthPlanFormulary"?: SchemaValue<HealthPlanFormulary | IdReference, "schema:includesHealthPlanFormulary">;
    /** Networks covered by this plan. */
    "schema:includesHealthPlanNetwork"?: SchemaValue<HealthPlanNetwork | IdReference, "schema:includesHealthPlanNetwork">;
    /** The standard for interpreting thePlan ID. The preferred is "HIOS". See the Centers for Medicare & Medicaid Services for more details. */
    "schema:usesHealthPlanIdStandard"?: SchemaValue<Text | URL, "schema:usesHealthPlanIdStandard">;
}
interface HealthInsurancePlanLeaf extends HealthInsurancePlanBase {
    "@type": "schema:HealthInsurancePlan";
}
/** A US-style health insurance plan, including PPOs, EPOs, and HMOs. */
export type HealthInsurancePlan = HealthInsurancePlanLeaf;

interface HealthPlanCostSharingSpecificationBase extends ThingBase {
    /** Whether the coinsurance applies before or after deductible, etc. TODO: Is this a closed set? */
    "schema:healthPlanCoinsuranceOption"?: SchemaValue<Text, "schema:healthPlanCoinsuranceOption">;
    /** Whether The rate of coinsurance expressed as a number between 0.0 and 1.0. */
    "schema:healthPlanCoinsuranceRate"?: SchemaValue<Number, "schema:healthPlanCoinsuranceRate">;
    /** Whether The copay amount. */
    "schema:healthPlanCopay"?: SchemaValue<PriceSpecification | IdReference, "schema:healthPlanCopay">;
    /** Whether the copay is before or after deductible, etc. TODO: Is this a closed set? */
    "schema:healthPlanCopayOption"?: SchemaValue<Text, "schema:healthPlanCopayOption">;
    /** The category or type of pharmacy associated with this cost sharing. */
    "schema:healthPlanPharmacyCategory"?: SchemaValue<Text, "schema:healthPlanPharmacyCategory">;
}
interface HealthPlanCostSharingSpecificationLeaf extends HealthPlanCostSharingSpecificationBase {
    "@type": "schema:HealthPlanCostSharingSpecification";
}
/** A description of costs to the patient under a given network or formulary. */
export type HealthPlanCostSharingSpecification = HealthPlanCostSharingSpecificationLeaf;

interface HealthPlanFormularyBase extends ThingBase {
    /** Whether The costs to the patient for services under this network or formulary. */
    "schema:healthPlanCostSharing"?: SchemaValue<Boolean, "schema:healthPlanCostSharing">;
    /** The tier(s) of drugs offered by this formulary or insurance plan. */
    "schema:healthPlanDrugTier"?: SchemaValue<Text, "schema:healthPlanDrugTier">;
    /** Whether prescriptions can be delivered by mail. */
    "schema:offersPrescriptionByMail"?: SchemaValue<Boolean, "schema:offersPrescriptionByMail">;
}
interface HealthPlanFormularyLeaf extends HealthPlanFormularyBase {
    "@type": "schema:HealthPlanFormulary";
}
/** For a given health insurance plan, the specification for costs and coverage of prescription drugs. */
export type HealthPlanFormulary = HealthPlanFormularyLeaf;

interface HealthPlanNetworkBase extends ThingBase {
    /** Whether The costs to the patient for services under this network or formulary. */
    "schema:healthPlanCostSharing"?: SchemaValue<Boolean, "schema:healthPlanCostSharing">;
    /** Name or unique ID of network. (Networks are often reused across different insurance plans). */
    "schema:healthPlanNetworkId"?: SchemaValue<Text, "schema:healthPlanNetworkId">;
    /** The tier(s) for this network. */
    "schema:healthPlanNetworkTier"?: SchemaValue<Text, "schema:healthPlanNetworkTier">;
}
interface HealthPlanNetworkLeaf extends HealthPlanNetworkBase {
    "@type": "schema:HealthPlanNetwork";
}
/** A US-style health insurance plan network. */
export type HealthPlanNetwork = HealthPlanNetworkLeaf;

interface HealthTopicContentBase extends CreativeWorkBase {
    /** Indicates the aspect or aspects specifically addressed in some {@link https://schema.org/HealthTopicContent HealthTopicContent}. For example, that the content is an overview, or that it talks about treatment, self-care, treatments or their side-effects. */
    "schema:hasHealthAspect"?: SchemaValue<HealthAspectEnumeration | IdReference, "schema:hasHealthAspect">;
}
interface HealthTopicContentLeaf extends HealthTopicContentBase {
    "@type": "schema:HealthTopicContent";
}
/** {@link https://schema.org/HealthTopicContent HealthTopicContent} is {@link https://schema.org/WebContent WebContent} that is about some aspect of a health topic, e.g. a condition, its symptoms or treatments. Such content may be comprised of several parts or sections and use different types of media. Multiple instances of {@link https://schema.org/WebContent WebContent} (and hence {@link https://schema.org/HealthTopicContent HealthTopicContent}) can be related using {@link https://schema.org/hasPart hasPart} / {@link https://schema.org/isPartOf isPartOf} where there is some kind of content hierarchy, and their content described with {@link https://schema.org/about about} and {@link https://schema.org/mentions mentions} e.g. building upon the existing {@link https://schema.org/MedicalCondition MedicalCondition} vocabulary. */
export type HealthTopicContent = HealthTopicContentLeaf;

interface HighSchoolLeaf extends EducationalOrganizationBase {
    "@type": "schema:HighSchool";
}
/** A high school. */
export type HighSchool = HighSchoolLeaf | string;

interface HinduTempleLeaf extends CivicStructureBase {
    "@type": "schema:HinduTemple";
}
/** A Hindu temple. */
export type HinduTemple = HinduTempleLeaf | string;

interface HobbyShopLeaf extends LocalBusinessBase {
    "@type": "schema:HobbyShop";
}
/** A store that sells materials useful or necessary for various hobbies. */
export type HobbyShop = HobbyShopLeaf | string;

interface HomeAndConstructionBusinessLeaf extends LocalBusinessBase {
    "@type": "schema:HomeAndConstructionBusiness";
}
/**
 * A construction business.
 *
 * A HomeAndConstructionBusiness is a {@link https://schema.org/LocalBusiness LocalBusiness} that provides services around homes and buildings.
 *
 * As a {@link https://schema.org/LocalBusiness LocalBusiness} it can be described as a {@link https://schema.org/provider provider} of one or more {@link https://schema.org/Service Service}(s).
 */
export type HomeAndConstructionBusiness = HomeAndConstructionBusinessLeaf | Electrician | GeneralContractor | HousePainter | HVACBusiness | Locksmith | MovingCompany | Plumber | RoofingContractor | string;

interface HomeGoodsStoreLeaf extends LocalBusinessBase {
    "@type": "schema:HomeGoodsStore";
}
/** A home goods store. */
export type HomeGoodsStore = HomeGoodsStoreLeaf | string;

interface HospitalBase extends CivicStructureBase, MedicalOrganizationBase, LocalBusinessBase {
    /** A medical service available from this provider. */
    "schema:availableService"?: SchemaValue<MedicalProcedure | MedicalTest | MedicalTherapy | IdReference, "schema:availableService">;
    /** Indicates data describing a hospital, e.g. a CDC {@link https://schema.org/CDCPMDRecord CDCPMDRecord} or as some kind of {@link https://schema.org/Dataset Dataset}. */
    "schema:healthcareReportingData"?: SchemaValue<CDCPMDRecord | Dataset | IdReference, "schema:healthcareReportingData">;
    /** A medical specialty of the provider. */
    "schema:medicalSpecialty"?: SchemaValue<MedicalSpecialty | IdReference, "schema:medicalSpecialty">;
}
interface HospitalLeaf extends HospitalBase {
    "@type": "schema:Hospital";
}
/** A hospital. */
export type Hospital = HospitalLeaf | string;

interface HostelLeaf extends LodgingBusinessBase {
    "@type": "schema:Hostel";
}
/**
 * A hostel - cheap accommodation, often in shared dormitories.
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type Hostel = HostelLeaf | string;

interface HotelLeaf extends LodgingBusinessBase {
    "@type": "schema:Hotel";
}
/**
 * A hotel is an establishment that provides lodging paid on a short-term basis (Source: Wikipedia, the free encyclopedia, see http://en.wikipedia.org/wiki/Hotel).
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type Hotel = HotelLeaf | string;

interface HotelRoomBase extends AccommodationBase {
    /** The type of bed or beds included in the accommodation. For the single case of just one bed of a certain type, you use bed directly with a text. If you want to indicate the quantity of a certain kind of bed, use an instance of BedDetails. For more detailed information, use the amenityFeature property. */
    "schema:bed"?: SchemaValue<BedDetails | BedType | Text | IdReference, "schema:bed">;
    /** The allowed total occupancy for the accommodation in persons (including infants etc). For individual accommodations, this is not necessarily the legal maximum but defines the permitted usage as per the contractual agreement (e.g. a double room used by a single person). Typical unit code(s): C62 for person */
    "schema:occupancy"?: SchemaValue<QuantitativeValue | IdReference, "schema:occupancy">;
}
interface HotelRoomLeaf extends HotelRoomBase {
    "@type": "schema:HotelRoom";
}
/**
 * A hotel room is a single room in a hotel.
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type HotelRoom = HotelRoomLeaf | string;

interface HouseBase extends AccommodationBase {
    /** The number of rooms (excluding bathrooms and closets) of the accommodation or lodging business. Typical unit code(s): ROM for room or C62 for no unit. The type of room can be put in the unitText property of the QuantitativeValue. */
    "schema:numberOfRooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfRooms">;
}
interface HouseLeaf extends HouseBase {
    "@type": "schema:House";
}
/** A house is a building or structure that has the ability to be occupied for habitation by humans or other creatures (Source: Wikipedia, the free encyclopedia, see {@link http://en.wikipedia.org/wiki/House http://en.wikipedia.org/wiki/House}). */
export type House = HouseLeaf | SingleFamilyResidence | string;

interface HousePainterLeaf extends LocalBusinessBase {
    "@type": "schema:HousePainter";
}
/** A house painting service. */
export type HousePainter = HousePainterLeaf | string;

interface HoverStateLeaf extends ElementBase {
    "@type": "uxi:HoverState";
}
/** When the user is hovering over an element, that element's state can change. E.g. useful to show that an element is interactive */
export type HoverState = HoverStateLeaf;

interface HowToBase extends CreativeWorkBase {
    /** The estimated cost of the supply or supplies consumed when performing instructions. */
    "schema:estimatedCost"?: SchemaValue<MonetaryAmount | Text | IdReference, "schema:estimatedCost">;
    /** The length of time it takes to perform instructions or a direction (not including time to prepare the supplies), in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 duration format}. */
    "schema:performTime"?: SchemaValue<Duration | IdReference, "schema:performTime">;
    /** The length of time it takes to prepare the items to be used in instructions or a direction, in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 duration format}. */
    "schema:prepTime"?: SchemaValue<Duration | IdReference, "schema:prepTime">;
    /** A single step item (as HowToStep, text, document, video, etc.) or a HowToSection. */
    "schema:step"?: SchemaValue<CreativeWork | HowToSection | HowToStep | Text | IdReference, "schema:step">;
    /**
     * A single step item (as HowToStep, text, document, video, etc.) or a HowToSection (originally misnamed 'steps'; 'step' is preferred).
     *
     * @deprecated Consider using https://schema.org/step instead.
     */
    "schema:steps"?: SchemaValue<CreativeWork | ItemList | Text | IdReference, "schema:steps">;
    /** A sub-property of instrument. A supply consumed when performing instructions or a direction. */
    "schema:supply"?: SchemaValue<HowToSupply | Text | IdReference, "schema:supply">;
    /** A sub property of instrument. An object used (but not consumed) when performing instructions or a direction. */
    "schema:tool"?: SchemaValue<HowToTool | Text | IdReference, "schema:tool">;
    /** The total time required to perform instructions or a direction (including time to prepare the supplies), in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 duration format}. */
    "schema:totalTime"?: SchemaValue<Duration | IdReference, "schema:totalTime">;
    /** The quantity that results by performing instructions. For example, a paper airplane, 10 personalized candles. */
    "schema:yield"?: SchemaValue<QuantitativeValue | Text | IdReference, "schema:yield">;
}
interface HowToLeaf extends HowToBase {
    "@type": "schema:HowTo";
}
/** Instructions that explain how to achieve a result by performing a sequence of steps. */
export type HowTo = HowToLeaf | Recipe;

interface HowToDirectionBase extends CreativeWorkBase, ListItemBase {
    /** A media object representing the circumstances after performing this direction. */
    "schema:afterMedia"?: SchemaValue<MediaObject | URL | IdReference, "schema:afterMedia">;
    /** A media object representing the circumstances before performing this direction. */
    "schema:beforeMedia"?: SchemaValue<MediaObject | URL | IdReference, "schema:beforeMedia">;
    /** A media object representing the circumstances while performing this direction. */
    "schema:duringMedia"?: SchemaValue<MediaObject | URL | IdReference, "schema:duringMedia">;
    /** The length of time it takes to perform instructions or a direction (not including time to prepare the supplies), in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 duration format}. */
    "schema:performTime"?: SchemaValue<Duration | IdReference, "schema:performTime">;
    /** The length of time it takes to prepare the items to be used in instructions or a direction, in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 duration format}. */
    "schema:prepTime"?: SchemaValue<Duration | IdReference, "schema:prepTime">;
    /** A sub-property of instrument. A supply consumed when performing instructions or a direction. */
    "schema:supply"?: SchemaValue<HowToSupply | Text | IdReference, "schema:supply">;
    /** A sub property of instrument. An object used (but not consumed) when performing instructions or a direction. */
    "schema:tool"?: SchemaValue<HowToTool | Text | IdReference, "schema:tool">;
    /** The total time required to perform instructions or a direction (including time to prepare the supplies), in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 duration format}. */
    "schema:totalTime"?: SchemaValue<Duration | IdReference, "schema:totalTime">;
}
interface HowToDirectionLeaf extends HowToDirectionBase {
    "@type": "schema:HowToDirection";
}
/** A direction indicating a single action to do in the instructions for how to achieve a result. */
export type HowToDirection = HowToDirectionLeaf;

interface HowToItemBase extends ListItemBase {
    /** The required quantity of the item(s). */
    "schema:requiredQuantity"?: SchemaValue<Number | QuantitativeValue | Text | IdReference, "schema:requiredQuantity">;
}
interface HowToItemLeaf extends HowToItemBase {
    "@type": "schema:HowToItem";
}
/** An item used as either a tool or supply when performing the instructions for how to to achieve a result. */
export type HowToItem = HowToItemLeaf | HowToSupply | HowToTool;

interface HowToSectionBase extends CreativeWorkBase, ItemListBase, ListItemBase {
    /**
     * A single step item (as HowToStep, text, document, video, etc.) or a HowToSection (originally misnamed 'steps'; 'step' is preferred).
     *
     * @deprecated Consider using https://schema.org/step instead.
     */
    "schema:steps"?: SchemaValue<CreativeWork | ItemList | Text | IdReference, "schema:steps">;
}
interface HowToSectionLeaf extends HowToSectionBase {
    "@type": "schema:HowToSection";
}
/** A sub-grouping of steps in the instructions for how to achieve a result (e.g. steps for making a pie crust within a pie recipe). */
export type HowToSection = HowToSectionLeaf;

interface HowToStepBase extends CreativeWorkBase, ItemListBase, ListItemBase {
}
interface HowToStepLeaf extends HowToStepBase {
    "@type": "schema:HowToStep";
}
/** A step in the instructions for how to achieve a result. It is an ordered list with HowToDirection and/or HowToTip items. */
export type HowToStep = HowToStepLeaf;

interface HowToSupplyBase extends HowToItemBase {
    /** The estimated cost of the supply or supplies consumed when performing instructions. */
    "schema:estimatedCost"?: SchemaValue<MonetaryAmount | Text | IdReference, "schema:estimatedCost">;
}
interface HowToSupplyLeaf extends HowToSupplyBase {
    "@type": "schema:HowToSupply";
}
/** A supply consumed when performing the instructions for how to achieve a result. */
export type HowToSupply = HowToSupplyLeaf;

interface HowToTipBase extends CreativeWorkBase, ListItemBase {
}
interface HowToTipLeaf extends HowToTipBase {
    "@type": "schema:HowToTip";
}
/** An explanation in the instructions for how to achieve a result. It provides supplementary information about a technique, supply, author's preference, etc. It can explain what could be done, or what should not be done, but doesn't specify what should be done (see HowToDirection). */
export type HowToTip = HowToTipLeaf;

interface HowToToolLeaf extends HowToItemBase {
    "@type": "schema:HowToTool";
}
/** A tool used (but not consumed) when performing instructions for how to achieve a result. */
export type HowToTool = HowToToolLeaf;

interface HVACBusinessLeaf extends LocalBusinessBase {
    "@type": "schema:HVACBusiness";
}
/** A business that provide Heating, Ventilation and Air Conditioning services. */
export type HVACBusiness = HVACBusinessLeaf | string;

interface HyperTocBase extends CreativeWorkBase {
    /** A media object that encodes this CreativeWork. This property is a synonym for encoding. */
    "schema:associatedMedia"?: SchemaValue<MediaObject | IdReference, "schema:associatedMedia">;
    /** Indicates a {@link https://schema.org/HyperTocEntry HyperTocEntry} in a {@link https://schema.org/HyperToc HyperToc}. */
    "schema:tocEntry"?: SchemaValue<HyperTocEntry | IdReference, "schema:tocEntry">;
}
interface HyperTocLeaf extends HyperTocBase {
    "@type": "schema:HyperToc";
}
/** A HyperToc represents a hypertext table of contents for complex media objects, such as {@link https://schema.org/VideoObject VideoObject}, {@link https://schema.org/AudioObject AudioObject}. Items in the table of contents are indicated using the {@link https://schema.org/tocEntry tocEntry} property, and typed {@link https://schema.org/HyperTocEntry HyperTocEntry}. For cases where the same larger work is split into multiple files, {@link https://schema.org/associatedMedia associatedMedia} can be used on individual {@link https://schema.org/HyperTocEntry HyperTocEntry} items. */
export type HyperToc = HyperTocLeaf;

interface HyperTocEntryBase extends CreativeWorkBase {
    /** A media object that encodes this CreativeWork. This property is a synonym for encoding. */
    "schema:associatedMedia"?: SchemaValue<MediaObject | IdReference, "schema:associatedMedia">;
    /** A {@link https://schema.org/HyperTocEntry HyperTocEntry} can have a {@link https://schema.org/tocContinuation tocContinuation} indicated, which is another {@link https://schema.org/HyperTocEntry HyperTocEntry} that would be the default next item to play or render. */
    "schema:tocContinuation"?: SchemaValue<HyperTocEntry | IdReference, "schema:tocContinuation">;
    /** Text of an utterances (spoken words, lyrics etc.) that occurs at a certain section of a media object, represented as a {@link https://schema.org/HyperTocEntry HyperTocEntry}. */
    "schema:utterances"?: SchemaValue<Text, "schema:utterances">;
}
interface HyperTocEntryLeaf extends HyperTocEntryBase {
    "@type": "schema:HyperTocEntry";
}
/** A HyperToEntry is an item within a {@link https://schema.org/HyperToc HyperToc}, which represents a hypertext table of contents for complex media objects, such as {@link https://schema.org/VideoObject VideoObject}, {@link https://schema.org/AudioObject AudioObject}. The media object itself is indicated using {@link https://schema.org/associatedMedia associatedMedia}. Each section of interest within that content can be described with a {@link https://schema.org/HyperTocEntry HyperTocEntry}, with associated {@link https://schema.org/startOffset startOffset} and {@link https://schema.org/endOffset endOffset}. When several entries are all from the same file, {@link https://schema.org/associatedMedia associatedMedia} is used on the overarching {@link https://schema.org/HyperTocEntry HyperTocEntry}; if the content has been split into multiple files, they can be referenced using {@link https://schema.org/associatedMedia associatedMedia} on each {@link https://schema.org/HyperTocEntry HyperTocEntry}. */
export type HyperTocEntry = HyperTocEntryLeaf;

interface IceCreamShopLeaf extends FoodEstablishmentBase {
    "@type": "schema:IceCreamShop";
}
/** An ice cream shop. */
export type IceCreamShop = IceCreamShopLeaf | string;

interface IconLeaf extends UIElementBase {
    "@type": "uxi:Icon";
}
/** An Icon is an Atom UI element that visually communicates meaning. It can symbolize text, and its meaning depends on the interpretation of the user, so alternative texts and tooltips can help users understand */
export type Icon = IconLeaf;

interface IdealStateLeaf extends ElementBase {
    "@type": "uxi:IdealState";
}
/** A UI element shows the ideal state which proviedes value to the user when it isn't in the blank/empty state, data has loaded completeley and no errors happened */
export type IdealState = IdealStateLeaf;

interface IgnoreActionLeaf extends ActionBase {
    "@type": "schema:IgnoreAction";
}
/** The act of intentionally disregarding the object. An agent ignores an object. */
export type IgnoreAction = IgnoreActionLeaf;

interface imageLeaf extends MediaDataTypeBase {
    "@type": "uxi:image";
}
/** An image of the item. This can be a URL or a fully described ImageObject. */
export type image = imageLeaf;

interface ImageGalleryLeaf extends WebPageBase {
    "@type": "schema:ImageGallery";
}
/** Web page type: Image gallery page. */
export type ImageGallery = ImageGalleryLeaf;

interface ImageObjectBase extends MediaObjectBase {
    /** The caption for this object. For downloadable machine formats (closed caption, subtitles etc.) use MediaObject and indicate the {@link https://schema.org/encodingFormat encodingFormat}. */
    "schema:caption"?: SchemaValue<MediaObject | Text | IdReference, "schema:caption">;
    /** Represents textual captioning from a {@link https://schema.org/MediaObject MediaObject}, e.g. text of a 'meme'. */
    "schema:embeddedTextCaption"?: SchemaValue<Text, "schema:embeddedTextCaption">;
    /** exif data for this object. */
    "schema:exifData"?: SchemaValue<PropertyValue | Text | IdReference, "schema:exifData">;
    /** Indicates whether this image is representative of the content of the page. */
    "schema:representativeOfPage"?: SchemaValue<Boolean, "schema:representativeOfPage">;
    /** Thumbnail image for an image or video. */
    "schema:thumbnail"?: SchemaValue<ImageObject | IdReference, "schema:thumbnail">;
}
interface ImageObjectLeaf extends ImageObjectBase {
    "@type": "schema:ImageObject";
}
/** An image file. */
export type ImageObject = ImageObjectLeaf | Barcode | ImageObjectSnapshot;

interface ImageObjectSnapshotLeaf extends ImageObjectBase {
    "@type": "schema:ImageObjectSnapshot";
}
/** A specific and exact (byte-for-byte) version of an {@link https://schema.org/ImageObject ImageObject}. Two byte-for-byte identical files, for the purposes of this type, considered identical. If they have different embedded metadata (e.g. XMP, EXIF) the files will differ. Different external facts about the files, e.g. creator or dateCreated that aren't represented in their actual content, do not affect this notion of identity. */
export type ImageObjectSnapshot = ImageObjectSnapshotLeaf;

interface ImagingTestBase extends MedicalTestBase {
    /** Imaging technique used. */
    "schema:imagingTechnique"?: SchemaValue<MedicalImagingTechnique | IdReference, "schema:imagingTechnique">;
}
interface ImagingTestLeaf extends ImagingTestBase {
    "@type": "schema:ImagingTest";
}
/** Any medical imaging modality typically used for diagnostic purposes. */
export type ImagingTest = ImagingTestLeaf;

interface IncompleteLeaf extends ElementBase {
    "@type": "uxi:Incomplete";
}
/** Issues that come from incomplete data can be caused by the application, the connection or the users themselves. Options to reload, retry or wait plus a status message help the users take next steps */
export type Incomplete = IncompleteLeaf;

interface IndividualProductBase extends ProductBase {
    /** The serial number or any alphanumeric identifier of a particular product. When attached to an offer, it is a shortcut for the serial number of the product included in the offer. */
    "schema:serialNumber"?: SchemaValue<Text, "schema:serialNumber">;
}
interface IndividualProductLeaf extends IndividualProductBase {
    "@type": "schema:IndividualProduct";
}
/** A single, identifiable product instance (e.g. a laptop with a particular serial number). */
export type IndividualProduct = IndividualProductLeaf;

interface InfectiousAgentClassLeaf extends EnumerationBase {
    "@type": "schema:InfectiousAgentClass";
}
/** Classes of agents or pathogens that transmit infectious diseases. Enumerated type. */
export type InfectiousAgentClass = "https://schema.org/Bacteria" | "schema:Bacteria" | "https://schema.org/Fungus" | "schema:Fungus" | "https://schema.org/MulticellularParasite" | "schema:MulticellularParasite" | "https://schema.org/Prion" | "schema:Prion" | "https://schema.org/Protozoa" | "schema:Protozoa" | "https://schema.org/Virus" | "schema:Virus" | InfectiousAgentClassLeaf;

interface InfectiousDiseaseBase extends MedicalConditionBase {
    /** The actual infectious agent, such as a specific bacterium. */
    "schema:infectiousAgent"?: SchemaValue<Text, "schema:infectiousAgent">;
    /** The class of infectious agent (bacteria, prion, etc.) that causes the disease. */
    "schema:infectiousAgentClass"?: SchemaValue<InfectiousAgentClass | IdReference, "schema:infectiousAgentClass">;
    /** How the disease spreads, either as a route or vector, for example 'direct contact', 'Aedes aegypti', etc. */
    "schema:transmissionMethod"?: SchemaValue<Text, "schema:transmissionMethod">;
}
interface InfectiousDiseaseLeaf extends InfectiousDiseaseBase {
    "@type": "schema:InfectiousDisease";
}
/** An infectious disease is a clinically evident human disease resulting from the presence of pathogenic microbial agents, like pathogenic viruses, pathogenic bacteria, fungi, protozoa, multicellular parasites, and prions. To be considered an infectious disease, such pathogens are known to be able to cause this disease. */
export type InfectiousDisease = InfectiousDiseaseLeaf;

interface InformActionBase extends CommunicateActionBase {
    /** Upcoming or past event associated with this place, organization, or action. */
    "schema:event"?: SchemaValue<Event | IdReference, "schema:event">;
}
interface InformActionLeaf extends InformActionBase {
    "@type": "schema:InformAction";
}
/** The act of notifying someone of information pertinent to them, with no expectation of a response. */
export type InformAction = InformActionLeaf | ConfirmAction | RsvpAction;

interface InputElementBase extends UIElementBase {
    /** The input range defines the type(s) of data which a uxi:UIElement can consume. This can be used to choose UIElements automatically. E.g. in the case of a date picker this could be https://schema.org/Date or https://schema.org/DateTime. For the (sub-)uxi:UIElement for selecting a year inside that date picker, a uxi:UIPropertyValueSpecification could be used to narrow down the selection. Also useful for converting, sending or receiving data. */
    "uxi:inputRange"?: SchemaValue<Thing | UIDataType | IdReference, "uxi:inputRange">;
}
interface InputElementLeaf extends InputElementBase {
    "@type": "uxi:InputElement";
}
/** An InputElement is a UI element that helps users enter data. Some input elementss like date-pickers or color-pickers might be made up of other inputs, e.g. to navigate to a date in a calendar or enter a hsv color value. The term can also refer to data going in, in general */
export type InputElement = InputElementLeaf;

interface InsertActionBase extends UpdateActionBase {
    /** A sub property of location. The final location of the object or the agent after the action. */
    "schema:toLocation"?: SchemaValue<Place | IdReference, "schema:toLocation">;
}
interface InsertActionLeaf extends InsertActionBase {
    "@type": "schema:InsertAction";
}
/** The act of adding at a specific location in an ordered collection. */
export type InsertAction = InsertActionLeaf | AppendAction | PrependAction;

interface InstallActionLeaf extends ConsumeActionBase {
    "@type": "schema:InstallAction";
}
/** The act of installing an application. */
export type InstallAction = InstallActionLeaf;

interface InsuranceAgencyLeaf extends FinancialServiceBase {
    "@type": "schema:InsuranceAgency";
}
/** An Insurance agency. */
export type InsuranceAgency = InsuranceAgencyLeaf | string;

interface IntangibleLeaf extends ThingBase {
    "@type": "schema:Intangible";
}
/** A utility class that serves as the umbrella for a number of 'intangible' things such as quantities, structured values, etc. */
export type Intangible = IntangibleLeaf | ActionAccessSpecification | AlignmentObject | Audience | BedDetails | Brand | BroadcastChannel | BroadcastFrequencySpecification | Class | ComputerLanguage | DataFeedItem | DefinedTerm | Demand | DigitalDocumentPermission | EducationalOccupationalProgram | EnergyConsumptionDetails | EntryPoint | Enumeration | FloorPlan | GameServer | GeospatialGeometry | Grant | HealthInsurancePlan | HealthPlanCostSharingSpecification | HealthPlanFormulary | HealthPlanNetwork | Invoice | ItemList | JobPosting | Language | ListItem | MediaSubscription | MenuItem | MerchantReturnPolicy | MerchantReturnPolicySeasonalOverride | Observation | Occupation | OccupationalExperienceRequirements | Offer | Order | OrderItem | ParcelDelivery | Permit | ProgramMembership | Property | PropertyValueSpecification | Quantity | Rating | Reservation | Role | Schedule | Seat | Series | Service | ServiceChannel | SpeakableSpecification | StatisticalPopulation | StructuredValue | Ticket | Trip | VirtualLocation;

/** Data type: Integer. */
export type Integer = number | `${number}`;

interface InteractActionLeaf extends ActionBase {
    "@type": "schema:InteractAction";
}
/** The act of interacting with another person or organization. */
export type InteractAction = InteractActionLeaf | BefriendAction | CommunicateAction | FollowAction | JoinAction | LeaveAction | MarryAction | RegisterAction | SubscribeAction | UnRegisterAction;

interface InteractionCounterBase extends ThingBase {
    /**
     * The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. e.g. John wrote a book from January to _December_. For media, including audio and video, it's the time offset of the end of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:endTime"?: SchemaValue<DateTime | Time, "schema:endTime">;
    /** The WebSite or SoftwareApplication where the interactions took place. */
    "schema:interactionService"?: SchemaValue<SoftwareApplication | WebSite | IdReference, "schema:interactionService">;
    /** The Action representing the type of interaction. For up votes, +1s, etc. use {@link https://schema.org/LikeAction LikeAction}. For down votes use {@link https://schema.org/DislikeAction DislikeAction}. Otherwise, use the most specific Action. */
    "schema:interactionType"?: SchemaValue<Action | IdReference, "schema:interactionType">;
    /** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
    "schema:location"?: SchemaValue<Place | PostalAddress | Text | VirtualLocation | IdReference, "schema:location">;
    /**
     * The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. e.g. John wrote a book from _January_ to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:startTime"?: SchemaValue<DateTime | Time, "schema:startTime">;
    /** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. */
    "schema:userInteractionCount"?: SchemaValue<Integer, "schema:userInteractionCount">;
}
interface InteractionCounterLeaf extends InteractionCounterBase {
    "@type": "schema:InteractionCounter";
}
/** A summary of how users have interacted with this CreativeWork. In most cases, authors will use a subtype to specify the specific type of interaction. */
export type InteractionCounter = InteractionCounterLeaf;

interface InternetCafeLeaf extends LocalBusinessBase {
    "@type": "schema:InternetCafe";
}
/** An internet cafe. */
export type InternetCafe = InternetCafeLeaf | string;

interface InvestmentFundLeaf extends InvestmentOrDepositBase {
    "@type": "schema:InvestmentFund";
}
/** A company or fund that gathers capital from a number of investors to create a pool of money that is then re-invested into stocks, bonds and other assets. */
export type InvestmentFund = InvestmentFundLeaf;

interface InvestmentOrDepositBase extends FinancialProductBase {
    /** The amount of money. */
    "schema:amount"?: SchemaValue<MonetaryAmount | Number | IdReference, "schema:amount">;
}
interface InvestmentOrDepositLeaf extends InvestmentOrDepositBase {
    "@type": "schema:InvestmentOrDeposit";
}
/** A type of financial product that typically requires the client to transfer funds to a financial service in return for potential beneficial financial return. */
export type InvestmentOrDeposit = InvestmentOrDepositLeaf | BrokerageAccount | DepositAccount | InvestmentFund;

interface InviteActionBase extends CommunicateActionBase {
    /** Upcoming or past event associated with this place, organization, or action. */
    "schema:event"?: SchemaValue<Event | IdReference, "schema:event">;
}
interface InviteActionLeaf extends InviteActionBase {
    "@type": "schema:InviteAction";
}
/** The act of asking someone to attend an event. Reciprocal of RsvpAction. */
export type InviteAction = InviteActionLeaf;

interface InvoiceBase extends ThingBase {
    /** The identifier for the account the payment will be applied to. */
    "schema:accountId"?: SchemaValue<Text, "schema:accountId">;
    /** The time interval used to compute the invoice. */
    "schema:billingPeriod"?: SchemaValue<Duration | IdReference, "schema:billingPeriod">;
    /** An entity that arranges for an exchange between a buyer and a seller. In most cases a broker never acquires or releases ownership of a product or service involved in an exchange. If it is not clear whether an entity is a broker, seller, or buyer, the latter two terms are preferred. */
    "schema:broker"?: SchemaValue<Organization | Person | IdReference, "schema:broker">;
    /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
    "schema:category"?: SchemaValue<PhysicalActivityCategory | Text | Thing | URL | IdReference, "schema:category">;
    /** A number that confirms the given order or payment has been received. */
    "schema:confirmationNumber"?: SchemaValue<Text, "schema:confirmationNumber">;
    /** Party placing the order or paying the invoice. */
    "schema:customer"?: SchemaValue<Organization | Person | IdReference, "schema:customer">;
    /** The minimum payment required at this time. */
    "schema:minimumPaymentDue"?: SchemaValue<MonetaryAmount | PriceSpecification | IdReference, "schema:minimumPaymentDue">;
    /**
     * The date that payment is due.
     *
     * @deprecated Consider using https://schema.org/paymentDueDate instead.
     */
    "schema:paymentDue"?: SchemaValue<DateTime, "schema:paymentDue">;
    /** The date that payment is due. */
    "schema:paymentDueDate"?: SchemaValue<Date | DateTime, "schema:paymentDueDate">;
    /** The name of the credit card or other method of payment for the order. */
    "schema:paymentMethod"?: SchemaValue<PaymentMethod | IdReference, "schema:paymentMethod">;
    /** An identifier for the method of payment used (e.g. the last 4 digits of the credit card). */
    "schema:paymentMethodId"?: SchemaValue<Text, "schema:paymentMethodId">;
    /** The status of payment; whether the invoice has been paid or not. */
    "schema:paymentStatus"?: SchemaValue<PaymentStatusType | Text | IdReference, "schema:paymentStatus">;
    /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
    "schema:provider"?: SchemaValue<Organization | Person | IdReference, "schema:provider">;
    /** The Order(s) related to this Invoice. One or more Orders may be combined into a single Invoice. */
    "schema:referencesOrder"?: SchemaValue<Order | IdReference, "schema:referencesOrder">;
    /** The date the invoice is scheduled to be paid. */
    "schema:scheduledPaymentDate"?: SchemaValue<Date, "schema:scheduledPaymentDate">;
    /** The total amount due. */
    "schema:totalPaymentDue"?: SchemaValue<MonetaryAmount | PriceSpecification | IdReference, "schema:totalPaymentDue">;
}
interface InvoiceLeaf extends InvoiceBase {
    "@type": "schema:Invoice";
}
/** A statement of the money due for goods or services; a bill. */
export type Invoice = InvoiceLeaf;

interface IssueSeverityTypeLeaf extends ElementBase {
    "@type": "uxi:IssueSeverityType";
}
/** Issue severity types are used for categorizing elements that need the user's immediate attention, such as Alert, Warning, Error, Incomplete and the Default type */
export type IssueSeverityType = IssueSeverityTypeLeaf | Alert | Default | Empty | Error | Incomplete | Warning;

interface ItemAvailabilityLeaf extends EnumerationBase {
    "@type": "schema:ItemAvailability";
}
/** A list of possible product availability options. */
export type ItemAvailability = "https://schema.org/BackOrder" | "schema:BackOrder" | "https://schema.org/Discontinued" | "schema:Discontinued" | "https://schema.org/InStock" | "schema:InStock" | "https://schema.org/InStoreOnly" | "schema:InStoreOnly" | "https://schema.org/LimitedAvailability" | "schema:LimitedAvailability" | "https://schema.org/OnlineOnly" | "schema:OnlineOnly" | "https://schema.org/OutOfStock" | "schema:OutOfStock" | "https://schema.org/PreOrder" | "schema:PreOrder" | "https://schema.org/PreSale" | "schema:PreSale" | "https://schema.org/SoldOut" | "schema:SoldOut" | ItemAvailabilityLeaf;

interface ItemListBase extends ThingBase {
    /**
     * For itemListElement values, you can use simple strings (e.g. "Peter", "Paul", "Mary"), existing entities, or use ListItem.
     *
     * Text values are best if the elements in the list are plain strings. Existing entities are best for a simple, unordered list of existing things in your data. ListItem is used with ordered lists when you want to provide additional context about the element in that list or when the same item might be in different places in different lists.
     *
     * Note: The order of elements in your mark-up is not sufficient for indicating the order or elements. Use ListItem with a 'position' property in such cases.
     */
    "schema:itemListElement"?: SchemaValue<ListItem | Text | Thing | IdReference, "schema:itemListElement">;
    /** Type of ordering (e.g. Ascending, Descending, Unordered). */
    "schema:itemListOrder"?: SchemaValue<ItemListOrderType | Text | IdReference, "schema:itemListOrder">;
    /** The number of items in an ItemList. Note that some descriptions might not fully describe all items in a list (e.g., multi-page pagination); in such cases, the numberOfItems would be for the entire list. */
    "schema:numberOfItems"?: SchemaValue<Integer, "schema:numberOfItems">;
}
interface ItemListLeaf extends ItemListBase {
    "@type": "schema:ItemList";
}
/** A list of items of any sort—for example, Top 10 Movies About Weathermen, or Top 100 Party Songs. Not to be confused with HTML lists, which are often used only for formatting. */
export type ItemList = "https://uxiverse.com/ontology/Copywriter-Tag" | "uxi:Copywriter-Tag" | "https://uxiverse.com/ontology/Designer-Tag" | "uxi:Designer-Tag" | "https://uxiverse.com/ontology/Developer-Tag" | "uxi:Developer-Tag" | "https://uxiverse.com/ontology/Tags" | "uxi:Tags" | ItemListLeaf | BreadcrumbList | HowToSection | HowToStep | OfferCatalog;

interface ItemListOrderTypeLeaf extends EnumerationBase {
    "@type": "schema:ItemListOrderType";
}
/** Enumerated for values for itemListOrder for indicating how an ordered ItemList is organized. */
export type ItemListOrderType = "https://schema.org/ItemListOrderAscending" | "schema:ItemListOrderAscending" | "https://schema.org/ItemListOrderDescending" | "schema:ItemListOrderDescending" | "https://schema.org/ItemListUnordered" | "schema:ItemListUnordered" | ItemListOrderTypeLeaf;

interface ItemPageLeaf extends WebPageBase {
    "@type": "schema:ItemPage";
}
/** A page devoted to a single item, such as a particular product or hotel. */
export type ItemPage = ItemPageLeaf;

interface JewelryStoreLeaf extends LocalBusinessBase {
    "@type": "schema:JewelryStore";
}
/** A jewelry store. */
export type JewelryStore = JewelryStoreLeaf | string;

interface JobPostingBase extends ThingBase {
    /** The location(s) applicants can apply from. This is usually used for telecommuting jobs where the applicant does not need to be in a physical office. Note: This should not be used for citizenship or work visa requirements. */
    "schema:applicantLocationRequirements"?: SchemaValue<AdministrativeArea | IdReference, "schema:applicantLocationRequirements">;
    /** Contact details for further information relevant to this job posting. */
    "schema:applicationContact"?: SchemaValue<ContactPoint | IdReference, "schema:applicationContact">;
    /** The base salary of the job or of an employee in an EmployeeRole. */
    "schema:baseSalary"?: SchemaValue<MonetaryAmount | Number | PriceSpecification | IdReference, "schema:baseSalary">;
    /**
     * Description of benefits associated with the job.
     *
     * @deprecated Consider using https://schema.org/jobBenefits instead.
     */
    "schema:benefits"?: SchemaValue<Text, "schema:benefits">;
    /** Publication date of an online listing. */
    "schema:datePosted"?: SchemaValue<Date | DateTime, "schema:datePosted">;
    /** Indicates whether an {@link https://schema.org/url url} that is associated with a {@link https://schema.org/JobPosting JobPosting} enables direct application for the job, via the posting website. A job posting is considered to have directApply of {@link https://schema.org/True True} if an application process for the specified job can be directly initiated via the url(s) given (noting that e.g. multiple internet domains might nevertheless be involved at an implementation level). A value of {@link https://schema.org/False False} is appropriate if there is no clear path to applying directly online for the specified job, navigating directly from the JobPosting url(s) supplied. */
    "schema:directApply"?: SchemaValue<Boolean, "schema:directApply">;
    /** Educational background needed for the position or Occupation. */
    "schema:educationRequirements"?: SchemaValue<EducationalOccupationalCredential | Text | IdReference, "schema:educationRequirements">;
    /** The legal requirements such as citizenship, visa and other documentation required for an applicant to this job. */
    "schema:eligibilityToWorkRequirement"?: SchemaValue<Text, "schema:eligibilityToWorkRequirement">;
    /** A description of the employer, career opportunities and work environment for this position. */
    "schema:employerOverview"?: SchemaValue<Text, "schema:employerOverview">;
    /** Type of employment (e.g. full-time, part-time, contract, temporary, seasonal, internship). */
    "schema:employmentType"?: SchemaValue<Text, "schema:employmentType">;
    /** Indicates the department, unit and/or facility where the employee reports and/or in which the job is to be performed. */
    "schema:employmentUnit"?: SchemaValue<Organization | IdReference, "schema:employmentUnit">;
    /** An estimated salary for a job posting or occupation, based on a variety of variables including, but not limited to industry, job title, and location. Estimated salaries are often computed by outside organizations rather than the hiring organization, who may not have committed to the estimated value. */
    "schema:estimatedSalary"?: SchemaValue<MonetaryAmount | MonetaryAmountDistribution | Number | IdReference, "schema:estimatedSalary">;
    /** Indicates whether a {@link https://schema.org/JobPosting JobPosting} will accept experience (as indicated by {@link https://schema.org/OccupationalExperienceRequirements OccupationalExperienceRequirements}) in place of its formal educational qualifications (as indicated by {@link https://schema.org/educationRequirements educationRequirements}). If true, indicates that satisfying one of these requirements is sufficient. */
    "schema:experienceInPlaceOfEducation"?: SchemaValue<Boolean, "schema:experienceInPlaceOfEducation">;
    /** Description of skills and experience needed for the position or Occupation. */
    "schema:experienceRequirements"?: SchemaValue<OccupationalExperienceRequirements | Text | IdReference, "schema:experienceRequirements">;
    /** Organization offering the job position. */
    "schema:hiringOrganization"?: SchemaValue<Organization | IdReference, "schema:hiringOrganization">;
    /** Description of bonus and commission compensation aspects of the job. */
    "schema:incentiveCompensation"?: SchemaValue<Text, "schema:incentiveCompensation">;
    /**
     * Description of bonus and commission compensation aspects of the job.
     *
     * @deprecated Consider using https://schema.org/incentiveCompensation instead.
     */
    "schema:incentives"?: SchemaValue<Text, "schema:incentives">;
    /** The industry associated with the job position. */
    "schema:industry"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:industry">;
    /** Description of benefits associated with the job. */
    "schema:jobBenefits"?: SchemaValue<Text, "schema:jobBenefits">;
    /** An indicator as to whether a position is available for an immediate start. */
    "schema:jobImmediateStart"?: SchemaValue<Boolean, "schema:jobImmediateStart">;
    /** A (typically single) geographic location associated with the job position. */
    "schema:jobLocation"?: SchemaValue<Place | IdReference, "schema:jobLocation">;
    /** A description of the job location (e.g TELECOMMUTE for telecommute jobs). */
    "schema:jobLocationType"?: SchemaValue<Text, "schema:jobLocationType">;
    /** The date on which a successful applicant for this job would be expected to start work. Choose a specific date in the future or use the jobImmediateStart property to indicate the position is to be filled as soon as possible. */
    "schema:jobStartDate"?: SchemaValue<Date | Text, "schema:jobStartDate">;
    /**
     * A category describing the job, preferably using a term from a taxonomy such as {@link http://www.onetcenter.org/taxonomy.html BLS O*NET-SOC}, {@link https://www.ilo.org/public/english/bureau/stat/isco/isco08/ ISCO-08} or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.
     *
     * Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC.
     */
    "schema:occupationalCategory"?: SchemaValue<CategoryCode | Text | IdReference, "schema:occupationalCategory">;
    /** A description of the types of physical activity associated with the job. Defined terms such as those in O*net may be used, but note that there is no way to specify the level of ability as well as its nature when using a defined term. */
    "schema:physicalRequirement"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:physicalRequirement">;
    /** Specific qualifications required for this role or Occupation. */
    "schema:qualifications"?: SchemaValue<EducationalOccupationalCredential | Text | IdReference, "schema:qualifications">;
    /** The Occupation for the JobPosting. */
    "schema:relevantOccupation"?: SchemaValue<Occupation | IdReference, "schema:relevantOccupation">;
    /** Responsibilities associated with this role or Occupation. */
    "schema:responsibilities"?: SchemaValue<Text, "schema:responsibilities">;
    /** The currency (coded using {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217} ) used for the main salary information in this job posting or for this employee. */
    "schema:salaryCurrency"?: SchemaValue<Text, "schema:salaryCurrency">;
    /** A description of any security clearance requirements of the job. */
    "schema:securityClearanceRequirement"?: SchemaValue<Text | URL, "schema:securityClearanceRequirement">;
    /** A description of any sensory requirements and levels necessary to function on the job, including hearing and vision. Defined terms such as those in O*net may be used, but note that there is no way to specify the level of ability as well as its nature when using a defined term. */
    "schema:sensoryRequirement"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:sensoryRequirement">;
    /** A statement of knowledge, skill, ability, task or any other assertion expressing a competency that is desired or required to fulfill this role or to work in this occupation. */
    "schema:skills"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:skills">;
    /** Any special commitments associated with this job posting. Valid entries include VeteranCommit, MilitarySpouseCommit, etc. */
    "schema:specialCommitments"?: SchemaValue<Text, "schema:specialCommitments">;
    /** The title of the job. */
    "schema:title"?: SchemaValue<Text, "schema:title">;
    /** The number of positions open for this job posting. Use a positive integer. Do not use if the number of positions is unclear or not known. */
    "schema:totalJobOpenings"?: SchemaValue<Integer, "schema:totalJobOpenings">;
    /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
    "schema:validThrough"?: SchemaValue<Date | DateTime, "schema:validThrough">;
    /** The typical working hours for this job (e.g. 1st shift, night shift, 8am-5pm). */
    "schema:workHours"?: SchemaValue<Text, "schema:workHours">;
}
interface JobPostingLeaf extends JobPostingBase {
    "@type": "schema:JobPosting";
}
/** A listing that describes a job opening in a certain organization. */
export type JobPosting = JobPostingLeaf;

interface JoinActionBase extends ActionBase {
    /** Upcoming or past event associated with this place, organization, or action. */
    "schema:event"?: SchemaValue<Event | IdReference, "schema:event">;
}
interface JoinActionLeaf extends JoinActionBase {
    "@type": "schema:JoinAction";
}
/**
 * An agent joins an event/group with participants/friends at a location.
 *
 * Related actions:
 * - {@link https://schema.org/RegisterAction RegisterAction}: Unlike RegisterAction, JoinAction refers to joining a group/team of people.
 * - {@link https://schema.org/SubscribeAction SubscribeAction}: Unlike SubscribeAction, JoinAction does not imply that you'll be receiving updates.
 * - {@link https://schema.org/FollowAction FollowAction}: Unlike FollowAction, JoinAction does not imply that you'll be polling for updates.
 */
export type JoinAction = JoinActionLeaf;

interface JointBase extends AnatomicalStructureBase {
    /** The biomechanical properties of the bone. */
    "schema:biomechnicalClass"?: SchemaValue<Text, "schema:biomechnicalClass">;
    /** The degree of mobility the joint allows. */
    "schema:functionalClass"?: SchemaValue<MedicalEntity | Text | IdReference, "schema:functionalClass">;
    /** The name given to how bone physically connects to each other. */
    "schema:structuralClass"?: SchemaValue<Text, "schema:structuralClass">;
}
interface JointLeaf extends JointBase {
    "@type": "schema:Joint";
}
/** The anatomical location at which two or more bones make contact. */
export type Joint = JointLeaf;

interface KeyDownActionLeaf extends UIActionBase {
    "@type": "uxi:KeyDownAction";
}
/** A key-down action happens when a user has started pressing a key on a keybord or a hardware-key on a physical controller. Can be used for keyboard shortcuts to often-accessed functionality */
export type KeyDownAction = KeyDownActionLeaf;

interface LabelLeaf extends UIElementBase {
    "@type": "uxi:Label";
}
/** A Label is an Atom UI element that describes another UI element more closely. These typically appear in forms to describe what the Inputs can be used for. Labels are important for visually impaired users, even if the label is not visible */
export type Label = LabelLeaf;

interface LakeBodyOfWaterLeaf extends PlaceBase {
    "@type": "schema:LakeBodyOfWater";
}
/** A lake (for example, Lake Pontrachain). */
export type LakeBodyOfWater = LakeBodyOfWaterLeaf | string;

interface LandformLeaf extends PlaceBase {
    "@type": "schema:Landform";
}
/** A landform or physical feature. Landform elements include mountains, plains, lakes, rivers, seascape and oceanic waterbody interface features such as bays, peninsulas, seas and so forth, including sub-aqueous terrain features such as submersed mountain ranges, volcanoes, and the great ocean basins. */
export type Landform = LandformLeaf | BodyOfWater | Continent | Mountain | Volcano | string;

interface LandmarksOrHistoricalBuildingsLeaf extends PlaceBase {
    "@type": "schema:LandmarksOrHistoricalBuildings";
}
/** An historical landmark or building. */
export type LandmarksOrHistoricalBuildings = LandmarksOrHistoricalBuildingsLeaf | string;

interface LanguageLeaf extends ThingBase {
    "@type": "schema:Language";
}
/** Natural languages such as Spanish, Tamil, Hindi, English, etc. Formal language code tags expressed in {@link https://en.wikipedia.org/wiki/IETF_language_tag BCP 47} can be used via the {@link https://schema.org/alternateName alternateName} property. The Language type previously also covered programming languages such as Scheme and Lisp, which are now best represented using {@link https://schema.org/ComputerLanguage ComputerLanguage}. */
export type Language = LanguageLeaf;

interface LearningResourceBase extends CreativeWorkBase {
    /** The item being described is intended to assess the competency or learning outcome defined by the referenced term. */
    "schema:assesses"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:assesses">;
    /** Knowledge, skill, ability or personal attribute that must be demonstrated by a person or other entity in order to do something such as earn an Educational Occupational Credential or understand a LearningResource. */
    "schema:competencyRequired"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:competencyRequired">;
    /**
     * An alignment to an established educational framework.
     *
     * This property should not be used where the nature of the alignment can be described using a simple property, for example to express that a resource {@link https://schema.org/teaches teaches} or {@link https://schema.org/assesses assesses} a competency.
     */
    "schema:educationalAlignment"?: SchemaValue<AlignmentObject | IdReference, "schema:educationalAlignment">;
    /** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
    "schema:educationalLevel"?: SchemaValue<DefinedTerm | Text | URL | IdReference, "schema:educationalLevel">;
    /** The purpose of a work in the context of education; for example, 'assignment', 'group work'. */
    "schema:educationalUse"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:educationalUse">;
    /** The predominant type or kind characterizing the learning resource. For example, 'presentation', 'handout'. */
    "schema:learningResourceType"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:learningResourceType">;
    /** The item being described is intended to help a person learn the competency or learning outcome defined by the referenced term. */
    "schema:teaches"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:teaches">;
}
interface LearningResourceLeaf extends LearningResourceBase {
    "@type": "schema:LearningResource";
}
/**
 * The LearningResource type can be used to indicate {@link https://schema.org/CreativeWork CreativeWork}s (whether physical or digital) that have a particular and explicit orientation towards learning, education, skill acquisition, and other educational purposes.
 *
 * {@link https://schema.org/LearningResource LearningResource} is expected to be used as an addition to a primary type such as {@link https://schema.org/Book Book}, {@link https://schema.org/VideoObject VideoObject}, {@link https://schema.org/Product Product} etc.
 *
 * {@link https://schema.org/EducationEvent EducationEvent} serves a similar purpose for event-like things (e.g. a {@link https://schema.org/Trip Trip}). A {@link https://schema.org/LearningResource LearningResource} may be created as a result of an {@link https://schema.org/EducationEvent EducationEvent}, for example by recording one.
 */
export type LearningResource = LearningResourceLeaf | Course | Quiz;

interface LeaveActionBase extends ActionBase {
    /** Upcoming or past event associated with this place, organization, or action. */
    "schema:event"?: SchemaValue<Event | IdReference, "schema:event">;
}
interface LeaveActionLeaf extends LeaveActionBase {
    "@type": "schema:LeaveAction";
}
/**
 * An agent leaves an event / group with participants/friends at a location.
 *
 * Related actions:
 * - {@link https://schema.org/JoinAction JoinAction}: The antonym of LeaveAction.
 * - {@link https://schema.org/UnRegisterAction UnRegisterAction}: Unlike UnRegisterAction, LeaveAction implies leaving a group/team of people rather than a service.
 */
export type LeaveAction = LeaveActionLeaf;

interface LegalForceStatusLeaf extends EnumerationBase {
    "@type": "schema:LegalForceStatus";
}
/** A list of possible statuses for the legal force of a legislation. */
export type LegalForceStatus = "https://schema.org/InForce" | "schema:InForce" | "https://schema.org/NotInForce" | "schema:NotInForce" | "https://schema.org/PartiallyInForce" | "schema:PartiallyInForce" | LegalForceStatusLeaf;

interface LegalServiceLeaf extends LocalBusinessBase {
    "@type": "schema:LegalService";
}
/**
 * A LegalService is a business that provides legally-oriented services, advice and representation, e.g. law firms.
 *
 * As a {@link https://schema.org/LocalBusiness LocalBusiness} it can be described as a {@link https://schema.org/provider provider} of one or more {@link https://schema.org/Service Service}(s).
 */
export type LegalService = LegalServiceLeaf | Attorney | Notary | string;

interface LegalValueLevelLeaf extends EnumerationBase {
    "@type": "schema:LegalValueLevel";
}
/** A list of possible levels for the legal validity of a legislation. */
export type LegalValueLevel = "https://schema.org/AuthoritativeLegalValue" | "schema:AuthoritativeLegalValue" | "https://schema.org/DefinitiveLegalValue" | "schema:DefinitiveLegalValue" | "https://schema.org/OfficialLegalValue" | "schema:OfficialLegalValue" | "https://schema.org/UnofficialLegalValue" | "schema:UnofficialLegalValue" | LegalValueLevelLeaf;

interface LegislationBase extends CreativeWorkBase {
    /** Indicates a legal jurisdiction, e.g. of some legislation, or where some government service is based. */
    "schema:jurisdiction"?: SchemaValue<AdministrativeArea | Text | IdReference, "schema:jurisdiction">;
    /** Indicates that this legislation (or part of a legislation) somehow transfers another legislation in a different legislative context. This is an informative link, and it has no legal value. For legally-binding links of transposition, use the {@link /legislationTransposes legislationTransposes} property. For example an informative consolidated law of a European Union's member state "applies" the consolidated version of the European Directive implemented in it. */
    "schema:legislationApplies"?: SchemaValue<Legislation | IdReference, "schema:legislationApplies">;
    /** Another legislation that this legislation changes. This encompasses the notions of amendment, replacement, correction, repeal, or other types of change. This may be a direct change (textual or non-textual amendment) or a consequential or indirect change. The property is to be used to express the existence of a change relationship between two acts rather than the existence of a consolidated version of the text that shows the result of the change. For consolidation relationships, use the {@link /legislationConsolidates legislationConsolidates} property. */
    "schema:legislationChanges"?: SchemaValue<Legislation | IdReference, "schema:legislationChanges">;
    /** Indicates another legislation taken into account in this consolidated legislation (which is usually the product of an editorial process that revises the legislation). This property should be used multiple times to refer to both the original version or the previous consolidated version, and to the legislations making the change. */
    "schema:legislationConsolidates"?: SchemaValue<Legislation | IdReference, "schema:legislationConsolidates">;
    /** The date of adoption or signature of the legislation. This is the date at which the text is officially aknowledged to be a legislation, even though it might not even be published or in force. */
    "schema:legislationDate"?: SchemaValue<Date, "schema:legislationDate">;
    /** The point-in-time at which the provided description of the legislation is valid (e.g. : when looking at the law on the 2016-04-07 (= dateVersion), I get the consolidation of 2015-04-12 of the "National Insurance Contributions Act 2015") */
    "schema:legislationDateVersion"?: SchemaValue<Date, "schema:legislationDateVersion">;
    /** An identifier for the legislation. This can be either a string-based identifier, like the CELEX at EU level or the NOR in France, or a web-based, URL/URI identifier, like an ELI (European Legislation Identifier) or an URN-Lex. */
    "schema:legislationIdentifier"?: SchemaValue<Text | URL, "schema:legislationIdentifier">;
    /** The jurisdiction from which the legislation originates. */
    "schema:legislationJurisdiction"?: SchemaValue<AdministrativeArea | Text | IdReference, "schema:legislationJurisdiction">;
    /** Whether the legislation is currently in force, not in force, or partially in force. */
    "schema:legislationLegalForce"?: SchemaValue<LegalForceStatus | IdReference, "schema:legislationLegalForce">;
    /** The person or organization that originally passed or made the law : typically parliament (for primary legislation) or government (for secondary legislation). This indicates the "legal author" of the law, as opposed to its physical author. */
    "schema:legislationPassedBy"?: SchemaValue<Organization | Person | IdReference, "schema:legislationPassedBy">;
    /** An individual or organization that has some kind of responsibility for the legislation. Typically the ministry who is/was in charge of elaborating the legislation, or the adressee for potential questions about the legislation once it is published. */
    "schema:legislationResponsible"?: SchemaValue<Organization | Person | IdReference, "schema:legislationResponsible">;
    /** Indicates that this legislation (or part of legislation) fulfills the objectives set by another legislation, by passing appropriate implementation measures. Typically, some legislations of European Union's member states or regions transpose European Directives. This indicates a legally binding link between the 2 legislations. */
    "schema:legislationTransposes"?: SchemaValue<Legislation | IdReference, "schema:legislationTransposes">;
    /** The type of the legislation. Examples of values are "law", "act", "directive", "decree", "regulation", "statutory instrument", "loi organique", "règlement grand-ducal", etc., depending on the country. */
    "schema:legislationType"?: SchemaValue<CategoryCode | Text | IdReference, "schema:legislationType">;
}
interface LegislationLeaf extends LegislationBase {
    "@type": "schema:Legislation";
}
/** A legal document such as an act, decree, bill, etc. (enforceable or not) or a component of a legal act (like an article). */
export type Legislation = LegislationLeaf | LegislationObject;

interface LegislationObjectBase extends LegislationBase, MediaObjectBase {
    /** The legal value of this legislation file. The same legislation can be written in multiple files with different legal values. Typically a digitally signed PDF have a "stronger" legal value than the HTML file of the same act. */
    "schema:legislationLegalValue"?: SchemaValue<LegalValueLevel | IdReference, "schema:legislationLegalValue">;
}
interface LegislationObjectLeaf extends LegislationObjectBase {
    "@type": "schema:LegislationObject";
}
/** A specific object or file containing a Legislation. Note that the same Legislation can be published in multiple files. For example, a digitally signed PDF, a plain PDF and an HTML version. */
export type LegislationObject = LegislationObjectLeaf;

interface LegislativeBuildingLeaf extends CivicStructureBase {
    "@type": "schema:LegislativeBuilding";
}
/** A legislative building—for example, the state capitol. */
export type LegislativeBuilding = LegislativeBuildingLeaf | string;

interface LendActionBase extends TransferActionBase {
    /** A sub property of participant. The person that borrows the object being lent. */
    "schema:borrower"?: SchemaValue<Person | IdReference, "schema:borrower">;
}
interface LendActionLeaf extends LendActionBase {
    "@type": "schema:LendAction";
}
/**
 * The act of providing an object under an agreement that it will be returned at a later date. Reciprocal of BorrowAction.
 *
 * Related actions:
 * - {@link https://schema.org/BorrowAction BorrowAction}: Reciprocal of LendAction.
 */
export type LendAction = LendActionLeaf;

interface LibraryLeaf extends LocalBusinessBase {
    "@type": "schema:Library";
}
/** A library. */
export type Library = LibraryLeaf | string;

interface LibrarySystemLeaf extends OrganizationBase {
    "@type": "schema:LibrarySystem";
}
/** A {@link https://schema.org/LibrarySystem LibrarySystem} is a collaborative system amongst several libraries. */
export type LibrarySystem = LibrarySystemLeaf | string;

interface LifestyleModificationLeaf extends MedicalEntityBase {
    "@type": "schema:LifestyleModification";
}
/** A process of care involving exercise, changes to diet, fitness routines, and other lifestyle changes aimed at improving a health condition. */
export type LifestyleModification = LifestyleModificationLeaf | Diet | PhysicalActivity;

interface LigamentLeaf extends AnatomicalStructureBase {
    "@type": "schema:Ligament";
}
/** A short band of tough, flexible, fibrous connective tissue that functions to connect multiple bones, cartilages, and structurally support joints. */
export type Ligament = LigamentLeaf;

interface LikeActionLeaf extends ActionBase {
    "@type": "schema:LikeAction";
}
/** The act of expressing a positive sentiment about the object. An agent likes an object (a proposition, topic or theme) with participants. */
export type LikeAction = LikeActionLeaf;

interface LinkLeaf extends UIElementBase {
    "@type": "uxi:Link";
}
/** A Link is clickable text that lets users navigate to other websites or other parts of the same site or app. They can also be used for file downloads or opening up a new email and other actions in apps. */
export type Link = LinkLeaf;

interface LiquorStoreLeaf extends LocalBusinessBase {
    "@type": "schema:LiquorStore";
}
/** A shop that sells alcoholic drinks such as wine, beer, whisky and other spirits. */
export type LiquorStore = LiquorStoreLeaf | string;

interface ListLeaf extends ContainerUIElementBase {
    "@type": "uxi:List";
}
/** A List is a Container UI Element which shows its content in either a vertical or horizontal order. The order doesn't have to be important, but if it is, consider sorting or filtering controls. Compare with Grids and Tables if your content can grow horizontally and vertically. */
export type List = ListLeaf;

interface ListenActionLeaf extends ConsumeActionBase {
    "@type": "schema:ListenAction";
}
/** The act of consuming audio content. */
export type ListenAction = ListenActionLeaf;

interface ListItemBase extends ThingBase {
    /** An entity represented by an entry in a list or data feed (e.g. an 'artist' in a list of 'artists')’. */
    "schema:item"?: SchemaValue<Thing | IdReference, "schema:item">;
    /** A link to the ListItem that follows the current one. */
    "schema:nextItem"?: SchemaValue<ListItem | IdReference, "schema:nextItem">;
    /** The position of an item in a series or sequence of items. */
    "schema:position"?: SchemaValue<Integer | Text, "schema:position">;
    /** A link to the ListItem that preceeds the current one. */
    "schema:previousItem"?: SchemaValue<ListItem | IdReference, "schema:previousItem">;
}
interface ListItemLeaf extends ListItemBase {
    "@type": "schema:ListItem";
}
/** An list item, e.g. a step in a checklist or how-to description. */
export type ListItem = ListItemLeaf | HowToDirection | HowToItem | HowToSection | HowToStep | HowToTip;

interface LiteraryEventLeaf extends EventBase {
    "@type": "schema:LiteraryEvent";
}
/** Event type: Literary event. */
export type LiteraryEvent = LiteraryEventLeaf;

interface LiveBlogPostingBase extends SocialMediaPostingBase {
    /** The time when the live blog will stop covering the Event. Note that coverage may continue after the Event concludes. */
    "schema:coverageEndTime"?: SchemaValue<DateTime, "schema:coverageEndTime">;
    /** The time when the live blog will begin covering the Event. Note that coverage may begin before the Event's start time. The LiveBlogPosting may also be created before coverage begins. */
    "schema:coverageStartTime"?: SchemaValue<DateTime, "schema:coverageStartTime">;
    /** An update to the LiveBlog. */
    "schema:liveBlogUpdate"?: SchemaValue<BlogPosting | IdReference, "schema:liveBlogUpdate">;
}
interface LiveBlogPostingLeaf extends LiveBlogPostingBase {
    "@type": "schema:LiveBlogPosting";
}
/** A {@link https://schema.org/LiveBlogPosting LiveBlogPosting} is a {@link https://schema.org/BlogPosting BlogPosting} intended to provide a rolling textual coverage of an ongoing event through continuous updates. */
export type LiveBlogPosting = LiveBlogPostingLeaf;

interface LoadingStateLeaf extends ElementBase {
    "@type": "uxi:LoadingState";
}
/** A UI elment is in a loading state when data has been requested, but it isn't completely available. Loading indicators or skeleton states help when the loading time is more than a second. Displaying loading states too quickly can decrease perceived performance */
export type LoadingState = LoadingStateLeaf;

interface LoanOrCreditBase extends FinancialProductBase {
    /** The amount of money. */
    "schema:amount"?: SchemaValue<MonetaryAmount | Number | IdReference, "schema:amount">;
    /**
     * The currency in which the monetary amount is expressed.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:currency"?: SchemaValue<Text, "schema:currency">;
    /** The period of time after any due date that the borrower has to fulfil its obligations before a default (failure to pay) is deemed to have occurred. */
    "schema:gracePeriod"?: SchemaValue<Duration | IdReference, "schema:gracePeriod">;
    /** A form of paying back money previously borrowed from a lender. Repayment usually takes the form of periodic payments that normally include part principal plus interest in each payment. */
    "schema:loanRepaymentForm"?: SchemaValue<RepaymentSpecification | IdReference, "schema:loanRepaymentForm">;
    /** The duration of the loan or credit agreement. */
    "schema:loanTerm"?: SchemaValue<QuantitativeValue | IdReference, "schema:loanTerm">;
    /** The type of a loan or credit. */
    "schema:loanType"?: SchemaValue<Text | URL, "schema:loanType">;
    /** The only way you get the money back in the event of default is the security. Recourse is where you still have the opportunity to go back to the borrower for the rest of the money. */
    "schema:recourseLoan"?: SchemaValue<Boolean, "schema:recourseLoan">;
    /** Whether the terms for payment of interest can be renegotiated during the life of the loan. */
    "schema:renegotiableLoan"?: SchemaValue<Boolean, "schema:renegotiableLoan">;
    /** Assets required to secure loan or credit repayments. It may take form of third party pledge, goods, financial instruments (cash, securities, etc.) */
    "schema:requiredCollateral"?: SchemaValue<Text | Thing | IdReference, "schema:requiredCollateral">;
}
interface LoanOrCreditLeaf extends LoanOrCreditBase {
    "@type": "schema:LoanOrCredit";
}
/** A financial product for the loaning of an amount of money, or line of credit, under agreed terms and charges. */
export type LoanOrCredit = LoanOrCreditLeaf | CreditCard | MortgageLoan;

interface LocalBusinessBase extends OrganizationBase, PlaceBase {
    /**
     * The larger organization that this local business is a branch of, if any. Not to be confused with (anatomical){@link https://schema.org/branch branch}.
     *
     * @deprecated Consider using https://schema.org/parentOrganization instead.
     */
    "schema:branchOf"?: SchemaValue<Organization | IdReference, "schema:branchOf">;
    /**
     * The currency accepted.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:currenciesAccepted"?: SchemaValue<Text, "schema:currenciesAccepted">;
    /**
     * The general opening hours for a business. Opening hours can be specified as a weekly time range, starting with days, then times per day. Multiple days can be listed with commas ',' separating each day. Day or time ranges are specified using a hyphen '-'.
     * - Days are specified using the following two-letter combinations: `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`.
     * - Times are specified using 24:00 format. For example, 3pm is specified as `15:00`, 10am as `10:00`.
     * - Here is an example: `<time itemprop="openingHours" datetime="Tu,Th 16:00-20:00">Tuesdays and Thursdays 4-8pm</time>`.
     * - If a business is open 7 days a week, then it can be specified as `<time itemprop="openingHours" datetime="Mo-Su">Monday through Sunday, all day</time>`.
     */
    "schema:openingHours"?: SchemaValue<Text, "schema:openingHours">;
    /** Cash, Credit Card, Cryptocurrency, Local Exchange Tradings System, etc. */
    "schema:paymentAccepted"?: SchemaValue<Text, "schema:paymentAccepted">;
    /** The price range of the business, for example `$$$`. */
    "schema:priceRange"?: SchemaValue<Text, "schema:priceRange">;
}
interface LocalBusinessLeaf extends LocalBusinessBase {
    "@type": "schema:LocalBusiness";
}
/** A particular physical business or branch of an organization. Examples of LocalBusiness include a restaurant, a particular branch of a restaurant chain, a branch of a bank, a medical practice, a club, a bowling alley, etc. */
export type LocalBusiness = LocalBusinessLeaf | AnimalShelter | ArchiveOrganization | AutomotiveBusiness | ChildCare | Dentist | DryCleaningOrLaundry | EmergencyService | EmploymentAgency | EntertainmentBusiness | FinancialService | FoodEstablishment | GovernmentOffice | HealthAndBeautyBusiness | HomeAndConstructionBusiness | InternetCafe | LegalService | Library | LodgingBusiness | MedicalBusiness | ProfessionalService | RadioStation | RealEstateAgent | RecyclingCenter | SelfStorage | ShoppingCenter | SportsActivityLocation | Store | TelevisionStation | TouristInformationCenter | TravelAgency | string;

interface LocationFeatureSpecificationBase extends PropertyValueBase {
    /** The hours during which this service or contact is available. */
    "schema:hoursAvailable"?: SchemaValue<OpeningHoursSpecification | IdReference, "schema:hoursAvailable">;
    /** The date when the item becomes valid. */
    "schema:validFrom"?: SchemaValue<Date | DateTime, "schema:validFrom">;
    /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
    "schema:validThrough"?: SchemaValue<Date | DateTime, "schema:validThrough">;
}
interface LocationFeatureSpecificationLeaf extends LocationFeatureSpecificationBase {
    "@type": "schema:LocationFeatureSpecification";
}
/** Specifies a location feature by providing a structured value representing a feature of an accommodation as a property-value pair of varying degrees of formality. */
export type LocationFeatureSpecification = LocationFeatureSpecificationLeaf;

interface LocksmithLeaf extends LocalBusinessBase {
    "@type": "schema:Locksmith";
}
/** A locksmith. */
export type Locksmith = LocksmithLeaf | string;

interface LodgingBusinessBase extends LocalBusinessBase {
    /** An amenity feature (e.g. a characteristic or service) of the Accommodation. This generic property does not make a statement about whether the feature is included in an offer for the main accommodation or available at extra costs. */
    "schema:amenityFeature"?: SchemaValue<LocationFeatureSpecification | IdReference, "schema:amenityFeature">;
    /** An intended audience, i.e. a group for whom something was created. */
    "schema:audience"?: SchemaValue<Audience | IdReference, "schema:audience">;
    /** A language someone may use with or at the item, service or place. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/inLanguage inLanguage} */
    "schema:availableLanguage"?: SchemaValue<Language | Text | IdReference, "schema:availableLanguage">;
    /** The earliest someone may check into a lodging establishment. */
    "schema:checkinTime"?: SchemaValue<DateTime | Time, "schema:checkinTime">;
    /** The latest someone may check out of a lodging establishment. */
    "schema:checkoutTime"?: SchemaValue<DateTime | Time, "schema:checkoutTime">;
    /** The number of rooms (excluding bathrooms and closets) of the accommodation or lodging business. Typical unit code(s): ROM for room or C62 for no unit. The type of room can be put in the unitText property of the QuantitativeValue. */
    "schema:numberOfRooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfRooms">;
    /** Indicates whether pets are allowed to enter the accommodation or lodging business. More detailed information can be put in a text value. */
    "schema:petsAllowed"?: SchemaValue<Boolean | Text, "schema:petsAllowed">;
    /** An official rating for a lodging business or food establishment, e.g. from national associations or standards bodies. Use the author property to indicate the rating organization, e.g. as an Organization with name such as (e.g. HOTREC, DEHOGA, WHR, or Hotelstars). */
    "schema:starRating"?: SchemaValue<Rating | IdReference, "schema:starRating">;
}
interface LodgingBusinessLeaf extends LodgingBusinessBase {
    "@type": "schema:LodgingBusiness";
}
/** A lodging business, such as a motel, hotel, or inn. */
export type LodgingBusiness = LodgingBusinessLeaf | BedAndBreakfast | Campground | Hostel | Hotel | Motel | Resort | string;

interface LodgingReservationBase extends ReservationBase {
    /** The earliest someone may check into a lodging establishment. */
    "schema:checkinTime"?: SchemaValue<DateTime | Time, "schema:checkinTime">;
    /** The latest someone may check out of a lodging establishment. */
    "schema:checkoutTime"?: SchemaValue<DateTime | Time, "schema:checkoutTime">;
    /** A full description of the lodging unit. */
    "schema:lodgingUnitDescription"?: SchemaValue<Text, "schema:lodgingUnitDescription">;
    /** Textual description of the unit type (including suite vs. room, size of bed, etc.). */
    "schema:lodgingUnitType"?: SchemaValue<QualitativeValue | Text | IdReference, "schema:lodgingUnitType">;
    /** The number of adults staying in the unit. */
    "schema:numAdults"?: SchemaValue<Integer | QuantitativeValue | IdReference, "schema:numAdults">;
    /** The number of children staying in the unit. */
    "schema:numChildren"?: SchemaValue<Integer | QuantitativeValue | IdReference, "schema:numChildren">;
}
interface LodgingReservationLeaf extends LodgingReservationBase {
    "@type": "schema:LodgingReservation";
}
/**
 * A reservation for lodging at a hotel, motel, inn, etc.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations.
 */
export type LodgingReservation = LodgingReservationLeaf;

interface LooseStateLeaf extends ElementBase {
    "@type": "uxi:LooseState";
}
/** A UI element is in a loose state when it's movable. Opposite of fixed state */
export type LooseState = LooseStateLeaf;

interface LoseActionBase extends ActionBase {
    /** A sub property of participant. The winner of the action. */
    "schema:winner"?: SchemaValue<Person | IdReference, "schema:winner">;
}
interface LoseActionLeaf extends LoseActionBase {
    "@type": "schema:LoseAction";
}
/** The act of being defeated in a competitive activity. */
export type LoseAction = LoseActionLeaf;

interface LymphaticVesselBase extends AnatomicalStructureBase {
    /** The vasculature the lymphatic structure originates, or afferents, from. */
    "schema:originatesFrom"?: SchemaValue<Vessel | IdReference, "schema:originatesFrom">;
    /** The anatomical or organ system drained by this vessel; generally refers to a specific part of an organ. */
    "schema:regionDrained"?: SchemaValue<AnatomicalStructure | AnatomicalSystem | IdReference, "schema:regionDrained">;
    /** The vasculature the lymphatic structure runs, or efferents, to. */
    "schema:runsTo"?: SchemaValue<Vessel | IdReference, "schema:runsTo">;
}
interface LymphaticVesselLeaf extends LymphaticVesselBase {
    "@type": "schema:LymphaticVessel";
}
/** A type of blood vessel that specifically carries lymph fluid unidirectionally toward the heart. */
export type LymphaticVessel = LymphaticVesselLeaf;

interface ManuscriptLeaf extends CreativeWorkBase {
    "@type": "schema:Manuscript";
}
/** A book, document, or piece of music written by hand rather than typed or printed. */
export type Manuscript = ManuscriptLeaf;

interface MapBase extends CreativeWorkBase {
    /** Indicates the kind of Map, from the MapCategoryType Enumeration. */
    "schema:mapType"?: SchemaValue<MapCategoryType | IdReference, "schema:mapType">;
}
interface MapLeaf extends MapBase {
    "@type": "schema:Map";
}
/** A map. */
export type Map = MapLeaf;

interface MapCategoryTypeLeaf extends EnumerationBase {
    "@type": "schema:MapCategoryType";
}
/** An enumeration of several kinds of Map. */
export type MapCategoryType = "https://schema.org/ParkingMap" | "schema:ParkingMap" | "https://schema.org/SeatingMap" | "schema:SeatingMap" | "https://schema.org/TransitMap" | "schema:TransitMap" | "https://schema.org/VenueMap" | "schema:VenueMap" | MapCategoryTypeLeaf;

interface MarkActionLeaf extends UIActionBase {
    "@type": "uxi:MarkAction";
}
/** A mark action can be used on part of media, e.g. highlighting text, chat-reactions in a live stream, beginning of a section in a podcast, etc. */
export type MarkAction = MarkActionLeaf;

interface MarryActionLeaf extends ActionBase {
    "@type": "schema:MarryAction";
}
/** The act of marrying a person. */
export type MarryAction = MarryActionLeaf;

interface MassLeaf extends ThingBase {
    "@type": "schema:Mass";
}
/** Properties that take Mass as values are of the form '<Number> <Mass unit of measure>'. E.g., '7 kg'. */
export type Mass = MassLeaf | string;

interface MathSolverBase extends CreativeWorkBase {
    /** A mathematical expression (e.g. 'x^2-3x=0') that may be solved for a specific variable, simplified, or transformed. This can take many formats, e.g. LaTeX, Ascii-Math, or math as you would write with a keyboard. */
    "schema:mathExpression"?: SchemaValue<SolveMathAction | Text | IdReference, "schema:mathExpression">;
}
interface MathSolverLeaf extends MathSolverBase {
    "@type": "schema:MathSolver";
}
/** A math solver which is capable of solving a subset of mathematical problems. */
export type MathSolver = MathSolverLeaf;

interface MaximizedStateLeaf extends ElementBase {
    "@type": "uxi:MaximizedState";
}
/** A UI element is in a maximized state when its size can't grow any bigger, or it completely fills the container it's in. Check minified and minimized state as well */
export type MaximizedState = MaximizedStateLeaf;

interface MaximumDoseScheduleLeaf extends DoseScheduleBase {
    "@type": "schema:MaximumDoseSchedule";
}
/** The maximum dosing schedule considered safe for a drug or supplement as recommended by an authority or by the drug/supplement's manufacturer. Capture the recommending authority in the recognizingAuthority property of MedicalEntity. */
export type MaximumDoseSchedule = MaximumDoseScheduleLeaf;

interface MeasurementTypeEnumerationLeaf extends EnumerationBase {
    "@type": "schema:MeasurementTypeEnumeration";
}
/** Enumeration of common measurement types (or dimensions), for example "chest" for a person, "inseam" for pants, "gauge" for screws, or "wheel" for bicycles. */
export type MeasurementTypeEnumeration = MeasurementTypeEnumerationLeaf | BodyMeasurementTypeEnumeration | WearableMeasurementTypeEnumeration;

interface MediaActionLeaf extends UIActionBase {
    "@type": "uxi:MediaAction";
}
/** Actions that the user can do with media which is embedded in html, like RecordAction, UIDownloadAction, StartAction, PauseAction */
export type MediaAction = MediaActionLeaf | PauseAction | RecordAction | StartAction | StopAction | UIDownloadAction | UploadAction;

interface MediaDataTypeBase extends ElementBase {
    /** Whether or not the media is playing */
    "uxi:isPlaying"?: SchemaValue<Boolean, "uxi:isPlaying">;
}
interface MediaDataTypeLeaf extends MediaDataTypeBase {
    "@type": "uxi:MediaDataType";
}
/** Data types that are not part of html, but can be embedded, such as image, audio and video */
export type MediaDataType = MediaDataTypeLeaf | image | video;

interface MediaGalleryLeaf extends WebPageBase {
    "@type": "schema:MediaGallery";
}
/** Web page type: Media gallery page. A mixed-media page that can contains media such as images, videos, and other multimedia. */
export type MediaGallery = MediaGalleryLeaf | ImageGallery | VideoGallery;

interface MediaManipulationRatingEnumerationLeaf extends EnumerationBase {
    "@type": "schema:MediaManipulationRatingEnumeration";
}
/** Codes for use with the {@link https://schema.org/mediaAuthenticityCategory mediaAuthenticityCategory} property, indicating the authenticity of a media object (in the context of how it was published or shared). In general these codes are not mutually exclusive, although some combinations (such as 'original' versus 'transformed', 'edited' and 'staged') would be contradictory if applied in the same {@link https://schema.org/MediaReview MediaReview}. Note that the application of these codes is with regard to a piece of media shared or published in a particular context. */
export type MediaManipulationRatingEnumeration = "https://schema.org/DecontextualizedContent" | "schema:DecontextualizedContent" | "https://schema.org/EditedOrCroppedContent" | "schema:EditedOrCroppedContent" | "https://schema.org/OriginalMediaContent" | "schema:OriginalMediaContent" | "https://schema.org/SatireOrParodyContent" | "schema:SatireOrParodyContent" | "https://schema.org/StagedContent" | "schema:StagedContent" | "https://schema.org/TransformedContent" | "schema:TransformedContent" | MediaManipulationRatingEnumerationLeaf;

interface MediaObjectBase extends CreativeWorkBase {
    /** A NewsArticle associated with the Media Object. */
    "schema:associatedArticle"?: SchemaValue<NewsArticle | IdReference, "schema:associatedArticle">;
    /** The bitrate of the media object. */
    "schema:bitrate"?: SchemaValue<Text, "schema:bitrate">;
    /** File size in (mega/kilo) bytes. */
    "schema:contentSize"?: SchemaValue<Text, "schema:contentSize">;
    /** Actual bytes of the media object, for example the image file or video file. */
    "schema:contentUrl"?: SchemaValue<URL, "schema:contentUrl">;
    /** The duration of the item (movie, audio recording, event, etc.) in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    "schema:duration"?: SchemaValue<Duration | IdReference, "schema:duration">;
    /** A URL pointing to a player for a specific video. In general, this is the information in the `src` element of an `embed` tag and should not be the same as the content of the `loc` tag. */
    "schema:embedUrl"?: SchemaValue<URL, "schema:embedUrl">;
    /** The CreativeWork encoded by this media object. */
    "schema:encodesCreativeWork"?: SchemaValue<CreativeWork | IdReference, "schema:encodesCreativeWork">;
    /**
     * Media type typically expressed using a MIME format (see {@link http://www.iana.org/assignments/media-types/media-types.xhtml IANA site} and {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types MDN reference}) e.g. application/zip for a SoftwareApplication binary, audio/mpeg for .mp3 etc.).
     *
     * In cases where a {@link https://schema.org/CreativeWork CreativeWork} has several media type representations, {@link https://schema.org/encoding encoding} can be used to indicate each {@link https://schema.org/MediaObject MediaObject} alongside particular {@link https://schema.org/encodingFormat encodingFormat} information.
     *
     * Unregistered or niche encoding and file formats can be indicated instead via the most appropriate URL, e.g. defining Web page or a Wikipedia/Wikidata entry.
     */
    "schema:encodingFormat"?: SchemaValue<Text | URL, "schema:encodingFormat">;
    /**
     * The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. e.g. John wrote a book from January to _December_. For media, including audio and video, it's the time offset of the end of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:endTime"?: SchemaValue<DateTime | Time, "schema:endTime">;
    /** The height of the item. */
    "schema:height"?: SchemaValue<Distance | QuantitativeValue | IdReference, "schema:height">;
    /**
     * The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.
     *
     * See also {@link https://schema.org/eligibleRegion eligibleRegion}.
     */
    "schema:ineligibleRegion"?: SchemaValue<GeoShape | Place | Text | IdReference, "schema:ineligibleRegion">;
    /** Used to indicate a specific claim contained, implied, translated or refined from the content of a {@link https://schema.org/MediaObject MediaObject} or other {@link https://schema.org/CreativeWork CreativeWork}. The interpreting party can be indicated using {@link https://schema.org/claimInterpreter claimInterpreter}. */
    "schema:interpretedAsClaim"?: SchemaValue<Claim | IdReference, "schema:interpretedAsClaim">;
    /** Player type required—for example, Flash or Silverlight. */
    "schema:playerType"?: SchemaValue<Text, "schema:playerType">;
    /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
    "schema:productionCompany"?: SchemaValue<Organization | IdReference, "schema:productionCompany">;
    /** The regions where the media is allowed. If not specified, then it's assumed to be allowed everywhere. Specify the countries in {@link http://en.wikipedia.org/wiki/ISO_3166 ISO 3166 format}. */
    "schema:regionsAllowed"?: SchemaValue<Place | IdReference, "schema:regionsAllowed">;
    /** Indicates if use of the media require a subscription (either paid or free). Allowed values are `true` or `false` (note that an earlier version had 'yes', 'no'). */
    "schema:requiresSubscription"?: SchemaValue<Boolean | MediaSubscription | IdReference, "schema:requiresSubscription">;
    /** The {@link https://en.wikipedia.org/wiki/SHA-2 SHA-2} SHA256 hash of the content of the item. For example, a zero-length input has value 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' */
    "schema:sha256"?: SchemaValue<Text, "schema:sha256">;
    /**
     * The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. e.g. John wrote a book from _January_ to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:startTime"?: SchemaValue<DateTime | Time, "schema:startTime">;
    /** Date when this media object was uploaded to this site. */
    "schema:uploadDate"?: SchemaValue<Date, "schema:uploadDate">;
    /** The width of the item. */
    "schema:width"?: SchemaValue<Distance | QuantitativeValue | IdReference, "schema:width">;
}
interface MediaObjectLeaf extends MediaObjectBase {
    "@type": "schema:MediaObject";
}
/** A media object, such as an image, video, or audio object embedded in a web page or a downloadable dataset i.e. DataDownload. Note that a creative work may have many media objects associated with it on the same web page. For example, a page about a single song (MusicRecording) may have a music video (VideoObject), and a high and low bandwidth audio stream (2 AudioObject's). */
export type MediaObject = MediaObjectLeaf | _3DModel | AudioObject | DataDownload | ImageObject | LegislationObject | MusicVideoObject | VideoObject;

interface MediaPartActionLeaf extends UIActionBase {
    "@type": "uxi:MediaPartAction";
}
/** Actions for part of a medium, e.g. AnnotateAction for an interesting part of a recording */
export type MediaPartAction = MediaPartActionLeaf | AnnotateAction | MarkAction;

interface MediaReviewBase extends ReviewBase {
    /** Indicates a MediaManipulationRatingEnumeration classification of a media object (in the context of how it was published or shared). */
    "schema:mediaAuthenticityCategory"?: SchemaValue<MediaManipulationRatingEnumeration | IdReference, "schema:mediaAuthenticityCategory">;
    /** Describes, in a {@link https://schema.org/MediaReview MediaReview} when dealing with {@link https://schema.org/DecontextualizedContent DecontextualizedContent}, background information that can contribute to better interpretation of the {@link https://schema.org/MediaObject MediaObject}. */
    "schema:originalMediaContextDescription"?: SchemaValue<Text, "schema:originalMediaContextDescription">;
    /** Link to the page containing an original version of the content, or directly to an online copy of the original {@link https://schema.org/MediaObject MediaObject} content, e.g. video file. */
    "schema:originalMediaLink"?: SchemaValue<MediaObject | URL | WebPage | IdReference, "schema:originalMediaLink">;
}
interface MediaReviewLeaf extends MediaReviewBase {
    "@type": "schema:MediaReview";
}
/** A {@link https://schema.org/MediaReview MediaReview} is a more specialized form of Review dedicated to the evaluation of media content online, typically in the context of fact-checking and misinformation. For more general reviews of media in the broader sense, use {@link https://schema.org/UserReview UserReview}, {@link https://schema.org/CriticReview CriticReview} or other {@link https://schema.org/Review Review} types. This definition is a work in progress. While the {@link https://schema.org/MediaManipulationRatingEnumeration MediaManipulationRatingEnumeration} list reflects significant community review amongst fact-checkers and others working to combat misinformation, the specific structures for representing media objects, their versions and publication context, is still evolving. Similarly, best practices for the relationship between {@link https://schema.org/MediaReview MediaReview} and {@link https://schema.org/ClaimReview ClaimReview} markup has not yet been finalized. */
export type MediaReview = MediaReviewLeaf;

interface MediaReviewItemBase extends CreativeWorkBase {
    /** In the context of a {@link https://schema.org/MediaReview MediaReview}, indicates specific media item(s) that are grouped using a {@link https://schema.org/MediaReviewItem MediaReviewItem}. */
    "schema:mediaItemAppearance"?: SchemaValue<MediaObject | IdReference, "schema:mediaItemAppearance">;
}
interface MediaReviewItemLeaf extends MediaReviewItemBase {
    "@type": "schema:MediaReviewItem";
}
/** Represents an item or group of closely related items treated as a unit for the sake of evaluation in a {@link https://schema.org/MediaReview MediaReview}. Authorship etc. apply to the items rather than to the curation/grouping or reviewing party. */
export type MediaReviewItem = MediaReviewItemLeaf;

interface MediaSubscriptionBase extends ThingBase {
    /** The Organization responsible for authenticating the user's subscription. For example, many media apps require a cable/satellite provider to authenticate your subscription before playing media. */
    "schema:authenticator"?: SchemaValue<Organization | IdReference, "schema:authenticator">;
    /** An Offer which must be accepted before the user can perform the Action. For example, the user may need to buy a movie before being able to watch it. */
    "schema:expectsAcceptanceOf"?: SchemaValue<Offer | IdReference, "schema:expectsAcceptanceOf">;
}
interface MediaSubscriptionLeaf extends MediaSubscriptionBase {
    "@type": "schema:MediaSubscription";
}
/** A subscription which allows a user to access media including audio, video, books, etc. */
export type MediaSubscription = MediaSubscriptionLeaf;

interface MedicalAudienceBase extends PeopleAudienceBase, AudienceBase {
}
interface MedicalAudienceLeaf extends MedicalAudienceBase {
    "@type": "schema:MedicalAudience";
}
/** Target audiences for medical web pages. */
export type MedicalAudience = MedicalAudienceLeaf | Patient;

interface MedicalAudienceTypeLeaf extends EnumerationBase {
    "@type": "schema:MedicalAudienceType";
}
/** Target audiences types for medical web pages. Enumerated type. */
export type MedicalAudienceType = "https://schema.org/Clinician" | "schema:Clinician" | "https://schema.org/MedicalResearcher" | "schema:MedicalResearcher" | MedicalAudienceTypeLeaf;

interface MedicalBusinessLeaf extends LocalBusinessBase {
    "@type": "schema:MedicalBusiness";
}
/** A particular physical or virtual business of an organization for medical purposes. Examples of MedicalBusiness include differents business run by health professionals. */
export type MedicalBusiness = MedicalBusinessLeaf | CommunityHealth | Dentist | Dermatology | DietNutrition | Emergency | Geriatric | Gynecologic | MedicalClinic | Midwifery | Nursing | Obstetric | Oncologic | Optician | Optometric | Otolaryngologic | Pediatric | Pharmacy | Physician | Physiotherapy | PlasticSurgery | Podiatric | PrimaryCare | Psychiatric | PublicHealth | string;

interface MedicalCauseBase extends MedicalEntityBase {
    /** The condition, complication, symptom, sign, etc. caused. */
    "schema:causeOf"?: SchemaValue<MedicalEntity | IdReference, "schema:causeOf">;
}
interface MedicalCauseLeaf extends MedicalCauseBase {
    "@type": "schema:MedicalCause";
}
/** The causative agent(s) that are responsible for the pathophysiologic process that eventually results in a medical condition, symptom or sign. In this schema, unless otherwise specified this is meant to be the proximate cause of the medical condition, symptom or sign. The proximate cause is defined as the causative agent that most directly results in the medical condition, symptom or sign. For example, the HIV virus could be considered a cause of AIDS. Or in a diagnostic context, if a patient fell and sustained a hip fracture and two days later sustained a pulmonary embolism which eventuated in a cardiac arrest, the cause of the cardiac arrest (the proximate cause) would be the pulmonary embolism and not the fall. Medical causes can include cardiovascular, chemical, dermatologic, endocrine, environmental, gastroenterologic, genetic, hematologic, gynecologic, iatrogenic, infectious, musculoskeletal, neurologic, nutritional, obstetric, oncologic, otolaryngologic, pharmacologic, psychiatric, pulmonary, renal, rheumatologic, toxic, traumatic, or urologic causes; medical conditions can be causes as well. */
export type MedicalCause = MedicalCauseLeaf;

interface MedicalClinicBase extends MedicalOrganizationBase, LocalBusinessBase {
    /** A medical service available from this provider. */
    "schema:availableService"?: SchemaValue<MedicalProcedure | MedicalTest | MedicalTherapy | IdReference, "schema:availableService">;
    /** A medical specialty of the provider. */
    "schema:medicalSpecialty"?: SchemaValue<MedicalSpecialty | IdReference, "schema:medicalSpecialty">;
}
interface MedicalClinicLeaf extends MedicalClinicBase {
    "@type": "schema:MedicalClinic";
}
/** A facility, often associated with a hospital or medical school, that is devoted to the specific diagnosis and/or healthcare. Previously limited to outpatients but with evolution it may be open to inpatients as well. */
export type MedicalClinic = MedicalClinicLeaf | CovidTestingFacility | string;

interface MedicalCodeBase extends CategoryCodeBase, MedicalEntityBase {
    /** A short textual code that uniquely identifies the value. */
    "schema:codeValue"?: SchemaValue<Text, "schema:codeValue">;
    /** The coding system, e.g. 'ICD-10'. */
    "schema:codingSystem"?: SchemaValue<Text, "schema:codingSystem">;
}
interface MedicalCodeLeaf extends MedicalCodeBase {
    "@type": "schema:MedicalCode";
}
/** A code for a medical entity. */
export type MedicalCode = MedicalCodeLeaf;

interface MedicalConditionBase extends MedicalEntityBase {
    /** The anatomy of the underlying organ system or structures associated with this entity. */
    "schema:associatedAnatomy"?: SchemaValue<AnatomicalStructure | AnatomicalSystem | SuperficialAnatomy | IdReference, "schema:associatedAnatomy">;
    /** One of a set of differential diagnoses for the condition. Specifically, a closely-related or competing diagnosis typically considered later in the cognitive process whereby this medical condition is distinguished from others most likely responsible for a similar collection of signs and symptoms to reach the most parsimonious diagnosis or diagnoses in a patient. */
    "schema:differentialDiagnosis"?: SchemaValue<DDxElement | IdReference, "schema:differentialDiagnosis">;
    /** Specifying a drug or medicine used in a medication procedure. */
    "schema:drug"?: SchemaValue<Drug | IdReference, "schema:drug">;
    /** The characteristics of associated patients, such as age, gender, race etc. */
    "schema:epidemiology"?: SchemaValue<Text, "schema:epidemiology">;
    /** The likely outcome in either the short term or long term of the medical condition. */
    "schema:expectedPrognosis"?: SchemaValue<Text, "schema:expectedPrognosis">;
    /** The expected progression of the condition if it is not treated and allowed to progress naturally. */
    "schema:naturalProgression"?: SchemaValue<Text, "schema:naturalProgression">;
    /** Changes in the normal mechanical, physical, and biochemical functions that are associated with this activity or condition. */
    "schema:pathophysiology"?: SchemaValue<Text, "schema:pathophysiology">;
    /** A possible unexpected and unfavorable evolution of a medical condition. Complications may include worsening of the signs or symptoms of the disease, extension of the condition to other organ systems, etc. */
    "schema:possibleComplication"?: SchemaValue<Text, "schema:possibleComplication">;
    /** A possible treatment to address this condition, sign or symptom. */
    "schema:possibleTreatment"?: SchemaValue<MedicalTherapy | IdReference, "schema:possibleTreatment">;
    /** A preventative therapy used to prevent an initial occurrence of the medical condition, such as vaccination. */
    "schema:primaryPrevention"?: SchemaValue<MedicalTherapy | IdReference, "schema:primaryPrevention">;
    /** A modifiable or non-modifiable factor that increases the risk of a patient contracting this condition, e.g. age, coexisting condition. */
    "schema:riskFactor"?: SchemaValue<MedicalRiskFactor | IdReference, "schema:riskFactor">;
    /** A preventative therapy used to prevent reoccurrence of the medical condition after an initial episode of the condition. */
    "schema:secondaryPrevention"?: SchemaValue<MedicalTherapy | IdReference, "schema:secondaryPrevention">;
    /** A sign or symptom of this condition. Signs are objective or physically observable manifestations of the medical condition while symptoms are the subjective experience of the medical condition. */
    "schema:signOrSymptom"?: SchemaValue<MedicalSignOrSymptom | IdReference, "schema:signOrSymptom">;
    /** The stage of the condition, if applicable. */
    "schema:stage"?: SchemaValue<MedicalConditionStage | IdReference, "schema:stage">;
    /** The status of the study (enumerated). */
    "schema:status"?: SchemaValue<EventStatusType | MedicalStudyStatus | Text | IdReference, "schema:status">;
    /** A medical test typically performed given this condition. */
    "schema:typicalTest"?: SchemaValue<MedicalTest | IdReference, "schema:typicalTest">;
}
interface MedicalConditionLeaf extends MedicalConditionBase {
    "@type": "schema:MedicalCondition";
}
/** Any condition of the human body that affects the normal functioning of a person, whether physically or mentally. Includes diseases, injuries, disabilities, disorders, syndromes, etc. */
export type MedicalCondition = MedicalConditionLeaf | InfectiousDisease | MedicalSignOrSymptom;

interface MedicalConditionStageBase extends MedicalEntityBase {
    /** The stage represented as a number, e.g. 3. */
    "schema:stageAsNumber"?: SchemaValue<Number, "schema:stageAsNumber">;
    /** The substage, e.g. 'a' for Stage IIIa. */
    "schema:subStageSuffix"?: SchemaValue<Text, "schema:subStageSuffix">;
}
interface MedicalConditionStageLeaf extends MedicalConditionStageBase {
    "@type": "schema:MedicalConditionStage";
}
/** A stage of a medical condition, such as 'Stage IIIa'. */
export type MedicalConditionStage = MedicalConditionStageLeaf;

interface MedicalContraindicationLeaf extends MedicalEntityBase {
    "@type": "schema:MedicalContraindication";
}
/** A condition or factor that serves as a reason to withhold a certain medical therapy. Contraindications can be absolute (there are no reasonable circumstances for undertaking a course of action) or relative (the patient is at higher risk of complications, but that these risks may be outweighed by other considerations or mitigated by other measures). */
export type MedicalContraindication = MedicalContraindicationLeaf;

interface MedicalDeviceBase extends MedicalEntityBase {
    /** A possible complication and/or side effect of this therapy. If it is known that an adverse outcome is serious (resulting in death, disability, or permanent damage; requiring hospitalization; or is otherwise life-threatening or requires immediate medical attention), tag it as a seriouseAdverseOutcome instead. */
    "schema:adverseOutcome"?: SchemaValue<MedicalEntity | IdReference, "schema:adverseOutcome">;
    /** A contraindication for this therapy. */
    "schema:contraindication"?: SchemaValue<MedicalContraindication | Text | IdReference, "schema:contraindication">;
    /** A description of the postoperative procedures, care, and/or followups for this device. */
    "schema:postOp"?: SchemaValue<Text, "schema:postOp">;
    /** A description of the workup, testing, and other preparations required before implanting this device. */
    "schema:preOp"?: SchemaValue<Text, "schema:preOp">;
    /** A description of the procedure involved in setting up, using, and/or installing the device. */
    "schema:procedure"?: SchemaValue<Text, "schema:procedure">;
    /** A possible serious complication and/or serious side effect of this therapy. Serious adverse outcomes include those that are life-threatening; result in death, disability, or permanent damage; require hospitalization or prolong existing hospitalization; cause congenital anomalies or birth defects; or jeopardize the patient and may require medical or surgical intervention to prevent one of the outcomes in this definition. */
    "schema:seriousAdverseOutcome"?: SchemaValue<MedicalEntity | IdReference, "schema:seriousAdverseOutcome">;
}
interface MedicalDeviceLeaf extends MedicalDeviceBase {
    "@type": "schema:MedicalDevice";
}
/** Any object used in a medical capacity, such as to diagnose or treat a patient. */
export type MedicalDevice = MedicalDeviceLeaf;

interface MedicalDevicePurposeLeaf extends EnumerationBase {
    "@type": "schema:MedicalDevicePurpose";
}
/** Categories of medical devices, organized by the purpose or intended use of the device. */
export type MedicalDevicePurpose = "https://schema.org/Diagnostic" | "schema:Diagnostic" | "https://schema.org/Therapeutic" | "schema:Therapeutic" | MedicalDevicePurposeLeaf;

interface MedicalEntityBase extends ThingBase {
    /** A medical code for the entity, taken from a controlled vocabulary or ontology such as ICD-9, DiseasesDB, MeSH, SNOMED-CT, RxNorm, etc. */
    "schema:code"?: SchemaValue<MedicalCode | IdReference, "schema:code">;
    /** A medical guideline related to this entity. */
    "schema:guideline"?: SchemaValue<MedicalGuideline | IdReference, "schema:guideline">;
    /** The drug or supplement's legal status, including any controlled substance schedules that apply. */
    "schema:legalStatus"?: SchemaValue<DrugLegalStatus | MedicalEnumeration | Text | IdReference, "schema:legalStatus">;
    /** The system of medicine that includes this MedicalEntity, for example 'evidence-based', 'homeopathic', 'chiropractic', etc. */
    "schema:medicineSystem"?: SchemaValue<MedicineSystem | IdReference, "schema:medicineSystem">;
    /** If applicable, the organization that officially recognizes this entity as part of its endorsed system of medicine. */
    "schema:recognizingAuthority"?: SchemaValue<Organization | IdReference, "schema:recognizingAuthority">;
    /** If applicable, a medical specialty in which this entity is relevant. */
    "schema:relevantSpecialty"?: SchemaValue<MedicalSpecialty | IdReference, "schema:relevantSpecialty">;
    /** A medical study or trial related to this entity. */
    "schema:study"?: SchemaValue<MedicalStudy | IdReference, "schema:study">;
}
interface MedicalEntityLeaf extends MedicalEntityBase {
    "@type": "schema:MedicalEntity";
}
/** The most generic type of entity related to health and the practice of medicine. */
export type MedicalEntity = MedicalEntityLeaf | AnatomicalStructure | AnatomicalSystem | DrugClass | DrugCost | LifestyleModification | MedicalCause | MedicalCondition | MedicalContraindication | MedicalDevice | MedicalGuideline | MedicalIndication | MedicalIntangible | MedicalProcedure | MedicalRiskEstimator | MedicalRiskFactor | MedicalStudy | MedicalTest | Substance | SuperficialAnatomy;

interface MedicalEnumerationLeaf extends EnumerationBase {
    "@type": "schema:MedicalEnumeration";
}
/** Enumerations related to health and the practice of medicine: A concept that is used to attribute a quality to another concept, as a qualifier, a collection of items or a listing of all of the elements of a set in medicine practice. */
export type MedicalEnumeration = MedicalEnumerationLeaf | DrugCostCategory | DrugPregnancyCategory | DrugPrescriptionStatus | InfectiousAgentClass | MedicalAudienceType | MedicalDevicePurpose | MedicalEvidenceLevel | MedicalImagingTechnique | MedicalObservationalStudyDesign | MedicalProcedureType | MedicalSpecialty | MedicalStudyStatus | MedicalTrialDesign | MedicineSystem | PhysicalExam;

interface MedicalEvidenceLevelLeaf extends EnumerationBase {
    "@type": "schema:MedicalEvidenceLevel";
}
/** Level of evidence for a medical guideline. Enumerated type. */
export type MedicalEvidenceLevel = "https://schema.org/EvidenceLevelA" | "schema:EvidenceLevelA" | "https://schema.org/EvidenceLevelB" | "schema:EvidenceLevelB" | "https://schema.org/EvidenceLevelC" | "schema:EvidenceLevelC" | MedicalEvidenceLevelLeaf;

interface MedicalGuidelineBase extends MedicalEntityBase {
    /** Strength of evidence of the data used to formulate the guideline (enumerated). */
    "schema:evidenceLevel"?: SchemaValue<MedicalEvidenceLevel | IdReference, "schema:evidenceLevel">;
    /** Source of the data used to formulate the guidance, e.g. RCT, consensus opinion, etc. */
    "schema:evidenceOrigin"?: SchemaValue<Text, "schema:evidenceOrigin">;
    /** Date on which this guideline's recommendation was made. */
    "schema:guidelineDate"?: SchemaValue<Date, "schema:guidelineDate">;
    /** The medical conditions, treatments, etc. that are the subject of the guideline. */
    "schema:guidelineSubject"?: SchemaValue<MedicalEntity | IdReference, "schema:guidelineSubject">;
}
interface MedicalGuidelineLeaf extends MedicalGuidelineBase {
    "@type": "schema:MedicalGuideline";
}
/** Any recommendation made by a standard society (e.g. ACC/AHA) or consensus statement that denotes how to diagnose and treat a particular condition. Note: this type should be used to tag the actual guideline recommendation; if the guideline recommendation occurs in a larger scholarly article, use MedicalScholarlyArticle to tag the overall article, not this type. Note also: the organization making the recommendation should be captured in the recognizingAuthority base property of MedicalEntity. */
export type MedicalGuideline = MedicalGuidelineLeaf | MedicalGuidelineContraindication | MedicalGuidelineRecommendation;

interface MedicalGuidelineContraindicationLeaf extends MedicalGuidelineBase {
    "@type": "schema:MedicalGuidelineContraindication";
}
/** A guideline contraindication that designates a process as harmful and where quality of the data supporting the contraindication is sound. */
export type MedicalGuidelineContraindication = MedicalGuidelineContraindicationLeaf;

interface MedicalGuidelineRecommendationBase extends MedicalGuidelineBase {
    /** Strength of the guideline's recommendation (e.g. 'class I'). */
    "schema:recommendationStrength"?: SchemaValue<Text, "schema:recommendationStrength">;
}
interface MedicalGuidelineRecommendationLeaf extends MedicalGuidelineRecommendationBase {
    "@type": "schema:MedicalGuidelineRecommendation";
}
/** A guideline recommendation that is regarded as efficacious and where quality of the data supporting the recommendation is sound. */
export type MedicalGuidelineRecommendation = MedicalGuidelineRecommendationLeaf;

interface MedicalImagingTechniqueLeaf extends EnumerationBase {
    "@type": "schema:MedicalImagingTechnique";
}
/** Any medical imaging modality typically used for diagnostic purposes. Enumerated type. */
export type MedicalImagingTechnique = "https://schema.org/CT" | "schema:CT" | "https://schema.org/MRI" | "schema:MRI" | "https://schema.org/PET" | "schema:PET" | "https://schema.org/Radiography" | "schema:Radiography" | "https://schema.org/Ultrasound" | "schema:Ultrasound" | "https://schema.org/XRay" | "schema:XRay" | MedicalImagingTechniqueLeaf;

interface MedicalIndicationLeaf extends MedicalEntityBase {
    "@type": "schema:MedicalIndication";
}
/** A condition or factor that indicates use of a medical therapy, including signs, symptoms, risk factors, anatomical states, etc. */
export type MedicalIndication = MedicalIndicationLeaf | ApprovedIndication | PreventionIndication | TreatmentIndication;

interface MedicalIntangibleLeaf extends MedicalEntityBase {
    "@type": "schema:MedicalIntangible";
}
/** A utility class that serves as the umbrella for a number of 'intangible' things in the medical space. */
export type MedicalIntangible = MedicalIntangibleLeaf | DDxElement | DoseSchedule | DrugLegalStatus | DrugStrength | MedicalCode | MedicalConditionStage;

interface MedicalObservationalStudyBase extends MedicalStudyBase {
    /** Specifics about the observational study design (enumerated). */
    "schema:studyDesign"?: SchemaValue<MedicalObservationalStudyDesign | IdReference, "schema:studyDesign">;
}
interface MedicalObservationalStudyLeaf extends MedicalObservationalStudyBase {
    "@type": "schema:MedicalObservationalStudy";
}
/** An observational study is a type of medical study that attempts to infer the possible effect of a treatment through observation of a cohort of subjects over a period of time. In an observational study, the assignment of subjects into treatment groups versus control groups is outside the control of the investigator. This is in contrast with controlled studies, such as the randomized controlled trials represented by MedicalTrial, where each subject is randomly assigned to a treatment group or a control group before the start of the treatment. */
export type MedicalObservationalStudy = MedicalObservationalStudyLeaf;

interface MedicalObservationalStudyDesignLeaf extends EnumerationBase {
    "@type": "schema:MedicalObservationalStudyDesign";
}
/** Design models for observational medical studies. Enumerated type. */
export type MedicalObservationalStudyDesign = "https://schema.org/CaseSeries" | "schema:CaseSeries" | "https://schema.org/CohortStudy" | "schema:CohortStudy" | "https://schema.org/CrossSectional" | "schema:CrossSectional" | "https://schema.org/Longitudinal" | "schema:Longitudinal" | "https://schema.org/Observational" | "schema:Observational" | "https://schema.org/Registry" | "schema:Registry" | MedicalObservationalStudyDesignLeaf;

interface MedicalOrganizationBase extends OrganizationBase {
    /** Name or unique ID of network. (Networks are often reused across different insurance plans). */
    "schema:healthPlanNetworkId"?: SchemaValue<Text, "schema:healthPlanNetworkId">;
    /** Whether the provider is accepting new patients. */
    "schema:isAcceptingNewPatients"?: SchemaValue<Boolean, "schema:isAcceptingNewPatients">;
    /** A medical specialty of the provider. */
    "schema:medicalSpecialty"?: SchemaValue<MedicalSpecialty | IdReference, "schema:medicalSpecialty">;
}
interface MedicalOrganizationLeaf extends MedicalOrganizationBase {
    "@type": "schema:MedicalOrganization";
}
/** A medical organization (physical or not), such as hospital, institution or clinic. */
export type MedicalOrganization = MedicalOrganizationLeaf | Dentist | DiagnosticLab | Hospital | MedicalClinic | Pharmacy | Physician | VeterinaryCare | string;

interface MedicalProcedureBase extends MedicalEntityBase {
    /** Location in the body of the anatomical structure. */
    "schema:bodyLocation"?: SchemaValue<Text, "schema:bodyLocation">;
    /** Typical or recommended followup care after the procedure is performed. */
    "schema:followup"?: SchemaValue<Text, "schema:followup">;
    /** How the procedure is performed. */
    "schema:howPerformed"?: SchemaValue<Text, "schema:howPerformed">;
    /** Typical preparation that a patient must undergo before having the procedure performed. */
    "schema:preparation"?: SchemaValue<MedicalEntity | Text | IdReference, "schema:preparation">;
    /** The type of procedure, for example Surgical, Noninvasive, or Percutaneous. */
    "schema:procedureType"?: SchemaValue<MedicalProcedureType | IdReference, "schema:procedureType">;
    /** The status of the study (enumerated). */
    "schema:status"?: SchemaValue<EventStatusType | MedicalStudyStatus | Text | IdReference, "schema:status">;
}
interface MedicalProcedureLeaf extends MedicalProcedureBase {
    "@type": "schema:MedicalProcedure";
}
/** A process of care used in either a diagnostic, therapeutic, preventive or palliative capacity that relies on invasive (surgical), non-invasive, or other techniques. */
export type MedicalProcedure = MedicalProcedureLeaf | DiagnosticProcedure | PalliativeProcedure | PhysicalExam | SurgicalProcedure | TherapeuticProcedure;

interface MedicalProcedureTypeLeaf extends EnumerationBase {
    "@type": "schema:MedicalProcedureType";
}
/** An enumeration that describes different types of medical procedures. */
export type MedicalProcedureType = "https://schema.org/NoninvasiveProcedure" | "schema:NoninvasiveProcedure" | "https://schema.org/PercutaneousProcedure" | "schema:PercutaneousProcedure" | MedicalProcedureTypeLeaf;

interface MedicalRiskCalculatorLeaf extends MedicalRiskEstimatorBase {
    "@type": "schema:MedicalRiskCalculator";
}
/** A complex mathematical calculation requiring an online calculator, used to assess prognosis. Note: use the url property of Thing to record any URLs for online calculators. */
export type MedicalRiskCalculator = MedicalRiskCalculatorLeaf;

interface MedicalRiskEstimatorBase extends MedicalEntityBase {
    /** The condition, complication, or symptom whose risk is being estimated. */
    "schema:estimatesRiskOf"?: SchemaValue<MedicalEntity | IdReference, "schema:estimatesRiskOf">;
    /** A modifiable or non-modifiable risk factor included in the calculation, e.g. age, coexisting condition. */
    "schema:includedRiskFactor"?: SchemaValue<MedicalRiskFactor | IdReference, "schema:includedRiskFactor">;
}
interface MedicalRiskEstimatorLeaf extends MedicalRiskEstimatorBase {
    "@type": "schema:MedicalRiskEstimator";
}
/** Any rule set or interactive tool for estimating the risk of developing a complication or condition. */
export type MedicalRiskEstimator = MedicalRiskEstimatorLeaf | MedicalRiskCalculator | MedicalRiskScore;

interface MedicalRiskFactorBase extends MedicalEntityBase {
    /** The condition, complication, etc. influenced by this factor. */
    "schema:increasesRiskOf"?: SchemaValue<MedicalEntity | IdReference, "schema:increasesRiskOf">;
}
interface MedicalRiskFactorLeaf extends MedicalRiskFactorBase {
    "@type": "schema:MedicalRiskFactor";
}
/** A risk factor is anything that increases a person's likelihood of developing or contracting a disease, medical condition, or complication. */
export type MedicalRiskFactor = MedicalRiskFactorLeaf;

interface MedicalRiskScoreBase extends MedicalRiskEstimatorBase {
    /** The algorithm or rules to follow to compute the score. */
    "schema:algorithm"?: SchemaValue<Text, "schema:algorithm">;
}
interface MedicalRiskScoreLeaf extends MedicalRiskScoreBase {
    "@type": "schema:MedicalRiskScore";
}
/** A simple system that adds up the number of risk factors to yield a score that is associated with prognosis, e.g. CHAD score, TIMI risk score. */
export type MedicalRiskScore = MedicalRiskScoreLeaf;

interface MedicalScholarlyArticleBase extends ArticleBase {
    /** The type of the medical article, taken from the US NLM MeSH publication type catalog. See also {@link http://www.nlm.nih.gov/mesh/pubtypes.html MeSH documentation}. */
    "schema:publicationType"?: SchemaValue<Text, "schema:publicationType">;
}
interface MedicalScholarlyArticleLeaf extends MedicalScholarlyArticleBase {
    "@type": "schema:MedicalScholarlyArticle";
}
/** A scholarly article in the medical domain. */
export type MedicalScholarlyArticle = MedicalScholarlyArticleLeaf;

interface MedicalSignBase extends MedicalSignOrSymptomBase {
    /** A physical examination that can identify this sign. */
    "schema:identifyingExam"?: SchemaValue<PhysicalExam | IdReference, "schema:identifyingExam">;
    /** A diagnostic test that can identify this sign. */
    "schema:identifyingTest"?: SchemaValue<MedicalTest | IdReference, "schema:identifyingTest">;
}
interface MedicalSignLeaf extends MedicalSignBase {
    "@type": "schema:MedicalSign";
}
/** Any physical manifestation of a person's medical condition discoverable by objective diagnostic tests or physical examination. */
export type MedicalSign = MedicalSignLeaf | VitalSign;

interface MedicalSignOrSymptomBase extends MedicalConditionBase {
    /** A possible treatment to address this condition, sign or symptom. */
    "schema:possibleTreatment"?: SchemaValue<MedicalTherapy | IdReference, "schema:possibleTreatment">;
}
interface MedicalSignOrSymptomLeaf extends MedicalSignOrSymptomBase {
    "@type": "schema:MedicalSignOrSymptom";
}
/** Any feature associated or not with a medical condition. In medicine a symptom is generally subjective while a sign is objective. */
export type MedicalSignOrSymptom = MedicalSignOrSymptomLeaf | MedicalSign | MedicalSymptom;

interface MedicalSpecialtyBase extends EnumerationBase, EnumerationBase {
}
interface MedicalSpecialtyLeaf extends MedicalSpecialtyBase {
    "@type": "schema:MedicalSpecialty";
}
/** Any specific branch of medical science or practice. Medical specialities include clinical specialties that pertain to particular organ systems and their respective disease states, as well as allied health specialties. Enumerated type. */
export type MedicalSpecialty = "https://schema.org/Anesthesia" | "schema:Anesthesia" | "https://schema.org/Cardiovascular" | "schema:Cardiovascular" | "https://schema.org/CommunityHealth" | "schema:CommunityHealth" | "https://schema.org/Dentistry" | "schema:Dentistry" | "https://schema.org/Dermatologic" | "schema:Dermatologic" | "https://schema.org/Dermatology" | "schema:Dermatology" | "https://schema.org/DietNutrition" | "schema:DietNutrition" | "https://schema.org/Emergency" | "schema:Emergency" | "https://schema.org/Endocrine" | "schema:Endocrine" | "https://schema.org/Gastroenterologic" | "schema:Gastroenterologic" | "https://schema.org/Genetic" | "schema:Genetic" | "https://schema.org/Geriatric" | "schema:Geriatric" | "https://schema.org/Gynecologic" | "schema:Gynecologic" | "https://schema.org/Hematologic" | "schema:Hematologic" | "https://schema.org/Infectious" | "schema:Infectious" | "https://schema.org/LaboratoryScience" | "schema:LaboratoryScience" | "https://schema.org/Midwifery" | "schema:Midwifery" | "https://schema.org/Musculoskeletal" | "schema:Musculoskeletal" | "https://schema.org/Neurologic" | "schema:Neurologic" | "https://schema.org/Nursing" | "schema:Nursing" | "https://schema.org/Obstetric" | "schema:Obstetric" | "https://schema.org/Oncologic" | "schema:Oncologic" | "https://schema.org/Optometric" | "schema:Optometric" | "https://schema.org/Otolaryngologic" | "schema:Otolaryngologic" | "https://schema.org/Pathology" | "schema:Pathology" | "https://schema.org/Pediatric" | "schema:Pediatric" | "https://schema.org/PharmacySpecialty" | "schema:PharmacySpecialty" | "https://schema.org/Physiotherapy" | "schema:Physiotherapy" | "https://schema.org/PlasticSurgery" | "schema:PlasticSurgery" | "https://schema.org/Podiatric" | "schema:Podiatric" | "https://schema.org/PrimaryCare" | "schema:PrimaryCare" | "https://schema.org/Psychiatric" | "schema:Psychiatric" | "https://schema.org/PublicHealth" | "schema:PublicHealth" | "https://schema.org/Pulmonary" | "schema:Pulmonary" | "https://schema.org/Radiography" | "schema:Radiography" | "https://schema.org/Renal" | "schema:Renal" | "https://schema.org/RespiratoryTherapy" | "schema:RespiratoryTherapy" | "https://schema.org/Rheumatologic" | "schema:Rheumatologic" | "https://schema.org/SpeechPathology" | "schema:SpeechPathology" | "https://schema.org/Surgical" | "schema:Surgical" | "https://schema.org/Toxicologic" | "schema:Toxicologic" | "https://schema.org/Urologic" | "schema:Urologic" | MedicalSpecialtyLeaf;

interface MedicalStudyBase extends MedicalEntityBase {
    /** Specifying the health condition(s) of a patient, medical study, or other target audience. */
    "schema:healthCondition"?: SchemaValue<MedicalCondition | IdReference, "schema:healthCondition">;
    /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
    "schema:sponsor"?: SchemaValue<Organization | Person | IdReference, "schema:sponsor">;
    /** The status of the study (enumerated). */
    "schema:status"?: SchemaValue<EventStatusType | MedicalStudyStatus | Text | IdReference, "schema:status">;
    /** The location in which the study is taking/took place. */
    "schema:studyLocation"?: SchemaValue<AdministrativeArea | IdReference, "schema:studyLocation">;
    /** A subject of the study, i.e. one of the medical conditions, therapies, devices, drugs, etc. investigated by the study. */
    "schema:studySubject"?: SchemaValue<MedicalEntity | IdReference, "schema:studySubject">;
}
interface MedicalStudyLeaf extends MedicalStudyBase {
    "@type": "schema:MedicalStudy";
}
/** A medical study is an umbrella type covering all kinds of research studies relating to human medicine or health, including observational studies and interventional trials and registries, randomized, controlled or not. When the specific type of study is known, use one of the extensions of this type, such as MedicalTrial or MedicalObservationalStudy. Also, note that this type should be used to mark up data that describes the study itself; to tag an article that publishes the results of a study, use MedicalScholarlyArticle. Note: use the code property of MedicalEntity to store study IDs, e.g. clinicaltrials.gov ID. */
export type MedicalStudy = MedicalStudyLeaf | MedicalObservationalStudy | MedicalTrial;

interface MedicalStudyStatusLeaf extends EnumerationBase {
    "@type": "schema:MedicalStudyStatus";
}
/** The status of a medical study. Enumerated type. */
export type MedicalStudyStatus = "https://schema.org/ActiveNotRecruiting" | "schema:ActiveNotRecruiting" | "https://schema.org/Completed" | "schema:Completed" | "https://schema.org/EnrollingByInvitation" | "schema:EnrollingByInvitation" | "https://schema.org/NotYetRecruiting" | "schema:NotYetRecruiting" | "https://schema.org/Recruiting" | "schema:Recruiting" | "https://schema.org/ResultsAvailable" | "schema:ResultsAvailable" | "https://schema.org/ResultsNotAvailable" | "schema:ResultsNotAvailable" | "https://schema.org/Suspended" | "schema:Suspended" | "https://schema.org/Terminated" | "schema:Terminated" | "https://schema.org/Withdrawn" | "schema:Withdrawn" | MedicalStudyStatusLeaf;

interface MedicalSymptomLeaf extends MedicalSignOrSymptomBase {
    "@type": "schema:MedicalSymptom";
}
/** Any complaint sensed and expressed by the patient (therefore defined as subjective) like stomachache, lower-back pain, or fatigue. */
export type MedicalSymptom = MedicalSymptomLeaf;

interface MedicalTestBase extends MedicalEntityBase {
    /** Drugs that affect the test's results. */
    "schema:affectedBy"?: SchemaValue<Drug | IdReference, "schema:affectedBy">;
    /** Range of acceptable values for a typical patient, when applicable. */
    "schema:normalRange"?: SchemaValue<MedicalEnumeration | Text | IdReference, "schema:normalRange">;
    /** A sign detected by the test. */
    "schema:signDetected"?: SchemaValue<MedicalSign | IdReference, "schema:signDetected">;
    /** A condition the test is used to diagnose. */
    "schema:usedToDiagnose"?: SchemaValue<MedicalCondition | IdReference, "schema:usedToDiagnose">;
    /** Device used to perform the test. */
    "schema:usesDevice"?: SchemaValue<MedicalDevice | IdReference, "schema:usesDevice">;
}
interface MedicalTestLeaf extends MedicalTestBase {
    "@type": "schema:MedicalTest";
}
/** Any medical test, typically performed for diagnostic purposes. */
export type MedicalTest = MedicalTestLeaf | BloodTest | ImagingTest | MedicalTestPanel | PathologyTest;

interface MedicalTestPanelBase extends MedicalTestBase {
    /** A component test of the panel. */
    "schema:subTest"?: SchemaValue<MedicalTest | IdReference, "schema:subTest">;
}
interface MedicalTestPanelLeaf extends MedicalTestPanelBase {
    "@type": "schema:MedicalTestPanel";
}
/** Any collection of tests commonly ordered together. */
export type MedicalTestPanel = MedicalTestPanelLeaf;

interface MedicalTherapyBase extends TherapeuticProcedureBase {
    /** A contraindication for this therapy. */
    "schema:contraindication"?: SchemaValue<MedicalContraindication | Text | IdReference, "schema:contraindication">;
    /** A therapy that duplicates or overlaps this one. */
    "schema:duplicateTherapy"?: SchemaValue<MedicalTherapy | IdReference, "schema:duplicateTherapy">;
    /** A possible serious complication and/or serious side effect of this therapy. Serious adverse outcomes include those that are life-threatening; result in death, disability, or permanent damage; require hospitalization or prolong existing hospitalization; cause congenital anomalies or birth defects; or jeopardize the patient and may require medical or surgical intervention to prevent one of the outcomes in this definition. */
    "schema:seriousAdverseOutcome"?: SchemaValue<MedicalEntity | IdReference, "schema:seriousAdverseOutcome">;
}
interface MedicalTherapyLeaf extends MedicalTherapyBase {
    "@type": "schema:MedicalTherapy";
}
/** Any medical intervention designed to prevent, treat, and cure human diseases and medical conditions, including both curative and palliative therapies. Medical therapies are typically processes of care relying upon pharmacotherapy, behavioral therapy, supportive therapy (with fluid or nutrition for example), or detoxification (e.g. hemodialysis) aimed at improving or preventing a health condition. */
export type MedicalTherapy = MedicalTherapyLeaf | OccupationalTherapy | PalliativeProcedure | PhysicalTherapy | RadiationTherapy | RespiratoryTherapy;

interface MedicalTrialBase extends MedicalStudyBase {
    /** Specifics about the trial design (enumerated). */
    "schema:trialDesign"?: SchemaValue<MedicalTrialDesign | IdReference, "schema:trialDesign">;
}
interface MedicalTrialLeaf extends MedicalTrialBase {
    "@type": "schema:MedicalTrial";
}
/** A medical trial is a type of medical study that uses scientific process used to compare the safety and efficacy of medical therapies or medical procedures. In general, medical trials are controlled and subjects are allocated at random to the different treatment and/or control groups. */
export type MedicalTrial = MedicalTrialLeaf;

interface MedicalTrialDesignLeaf extends EnumerationBase {
    "@type": "schema:MedicalTrialDesign";
}
/** Design models for medical trials. Enumerated type. */
export type MedicalTrialDesign = "https://schema.org/DoubleBlindedTrial" | "schema:DoubleBlindedTrial" | "https://schema.org/InternationalTrial" | "schema:InternationalTrial" | "https://schema.org/MultiCenterTrial" | "schema:MultiCenterTrial" | "https://schema.org/OpenTrial" | "schema:OpenTrial" | "https://schema.org/PlaceboControlledTrial" | "schema:PlaceboControlledTrial" | "https://schema.org/RandomizedTrial" | "schema:RandomizedTrial" | "https://schema.org/SingleBlindedTrial" | "schema:SingleBlindedTrial" | "https://schema.org/SingleCenterTrial" | "schema:SingleCenterTrial" | "https://schema.org/TripleBlindedTrial" | "schema:TripleBlindedTrial" | MedicalTrialDesignLeaf;

interface MedicalWebPageBase extends WebPageBase {
    /**
     * An aspect of medical practice that is considered on the page, such as 'diagnosis', 'treatment', 'causes', 'prognosis', 'etiology', 'epidemiology', etc.
     *
     * @deprecated Consider using https://schema.org/mainContentOfPage instead.
     */
    "schema:aspect"?: SchemaValue<Text, "schema:aspect">;
    /** Medical audience for page. */
    "schema:medicalAudience"?: SchemaValue<MedicalAudience | MedicalAudienceType | IdReference, "schema:medicalAudience">;
}
interface MedicalWebPageLeaf extends MedicalWebPageBase {
    "@type": "schema:MedicalWebPage";
}
/** A web page that provides medical information. */
export type MedicalWebPage = MedicalWebPageLeaf;

interface MedicineSystemLeaf extends EnumerationBase {
    "@type": "schema:MedicineSystem";
}
/** Systems of medical practice. */
export type MedicineSystem = "https://schema.org/Ayurvedic" | "schema:Ayurvedic" | "https://schema.org/Chiropractic" | "schema:Chiropractic" | "https://schema.org/Homeopathic" | "schema:Homeopathic" | "https://schema.org/Osteopathic" | "schema:Osteopathic" | "https://schema.org/TraditionalChinese" | "schema:TraditionalChinese" | "https://schema.org/WesternConventional" | "schema:WesternConventional" | MedicineSystemLeaf;

interface MeetingRoomLeaf extends AccommodationBase {
    "@type": "schema:MeetingRoom";
}
/**
 * A meeting room, conference room, or conference hall is a room provided for singular events such as business conferences and meetings (Source: Wikipedia, the free encyclopedia, see {@link http://en.wikipedia.org/wiki/Conference_hall http://en.wikipedia.org/wiki/Conference_hall}).
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type MeetingRoom = MeetingRoomLeaf | string;

interface MensClothingStoreLeaf extends LocalBusinessBase {
    "@type": "schema:MensClothingStore";
}
/** A men's clothing store. */
export type MensClothingStore = MensClothingStoreLeaf | string;

interface MenuBase extends CreativeWorkBase {
    /** A food or drink item contained in a menu or menu section. */
    "schema:hasMenuItem"?: SchemaValue<MenuItem | IdReference, "schema:hasMenuItem">;
    /** A subgrouping of the menu (by dishes, course, serving time period, etc.). */
    "schema:hasMenuSection"?: SchemaValue<MenuSection | IdReference, "schema:hasMenuSection">;
}
interface MenuLeaf extends MenuBase {
    "@type": "schema:Menu";
}
/** A structured representation of food or drink items available from a FoodEstablishment. */
export type Menu = MenuLeaf;

interface MenuItemBase extends ThingBase {
    /** Additional menu item(s) such as a side dish of salad or side order of fries that can be added to this menu item. Additionally it can be a menu section containing allowed add-on menu items for this menu item. */
    "schema:menuAddOn"?: SchemaValue<MenuItem | MenuSection | IdReference, "schema:menuAddOn">;
    /** Nutrition information about the recipe or menu item. */
    "schema:nutrition"?: SchemaValue<NutritionInformation | IdReference, "schema:nutrition">;
    /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use {@link https://schema.org/businessFunction businessFunction} to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a {@link https://schema.org/Demand Demand}. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:offers"?: SchemaValue<Demand | Offer | IdReference, "schema:offers">;
    /** Indicates a dietary restriction or guideline for which this recipe or menu item is suitable, e.g. diabetic, halal etc. */
    "schema:suitableForDiet"?: SchemaValue<RestrictedDiet | IdReference, "schema:suitableForDiet">;
}
interface MenuItemLeaf extends MenuItemBase {
    "@type": "schema:MenuItem";
}
/** A food or drink item listed in a menu or menu section. */
export type MenuItem = MenuItemLeaf;

interface MenuSectionBase extends CreativeWorkBase {
    /** A food or drink item contained in a menu or menu section. */
    "schema:hasMenuItem"?: SchemaValue<MenuItem | IdReference, "schema:hasMenuItem">;
    /** A subgrouping of the menu (by dishes, course, serving time period, etc.). */
    "schema:hasMenuSection"?: SchemaValue<MenuSection | IdReference, "schema:hasMenuSection">;
}
interface MenuSectionLeaf extends MenuSectionBase {
    "@type": "schema:MenuSection";
}
/** A sub-grouping of food or drink items in a menu. E.g. courses (such as 'Dinner', 'Breakfast', etc.), specific type of dishes (such as 'Meat', 'Vegan', 'Drinks', etc.), or some other classification made by the menu provider. */
export type MenuSection = MenuSectionLeaf;

interface MerchantReturnEnumerationLeaf extends EnumerationBase {
    "@type": "schema:MerchantReturnEnumeration";
}
/** Enumerates several kinds of product return policies. */
export type MerchantReturnEnumeration = "https://schema.org/MerchantReturnFiniteReturnWindow" | "schema:MerchantReturnFiniteReturnWindow" | "https://schema.org/MerchantReturnNotPermitted" | "schema:MerchantReturnNotPermitted" | "https://schema.org/MerchantReturnUnlimitedWindow" | "schema:MerchantReturnUnlimitedWindow" | "https://schema.org/MerchantReturnUnspecified" | "schema:MerchantReturnUnspecified" | MerchantReturnEnumerationLeaf;

interface MerchantReturnPolicyBase extends ThingBase {
    /**
     * A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.
     *
     * Note: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
     */
    "schema:additionalProperty"?: SchemaValue<PropertyValue | IdReference, "schema:additionalProperty">;
    /** The type of return fees if the product is returned due to customer remorse. */
    "schema:customerRemorseReturnFees"?: SchemaValue<ReturnFeesEnumeration | IdReference, "schema:customerRemorseReturnFees">;
    /** The method (from an enumeration) by which the customer obtains a return shipping label for a product returned due to customer remorse. */
    "schema:customerRemorseReturnLabelSource"?: SchemaValue<ReturnLabelSourceEnumeration | IdReference, "schema:customerRemorseReturnLabelSource">;
    /** The amount of shipping costs if a product is returned due to customer remorse. Applicable when property {@link https://schema.org/customerRemorseReturnFees customerRemorseReturnFees} equals {@link https://schema.org/ReturnShippingFees ReturnShippingFees}. */
    "schema:customerRemorseReturnShippingFeesAmount"?: SchemaValue<MonetaryAmount | IdReference, "schema:customerRemorseReturnShippingFeesAmount">;
    /** Are in-store returns offered? (for more advanced return methods use the {@link https://schema.org/returnMethod returnMethod} property) */
    "schema:inStoreReturnsOffered"?: SchemaValue<Boolean, "schema:inStoreReturnsOffered">;
    /** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
    "schema:itemCondition"?: SchemaValue<OfferItemCondition | IdReference, "schema:itemCondition">;
    /** The type of return fees for returns of defect products. */
    "schema:itemDefectReturnFees"?: SchemaValue<ReturnFeesEnumeration | IdReference, "schema:itemDefectReturnFees">;
    /** The method (from an enumeration) by which the customer obtains a return shipping label for a defect product. */
    "schema:itemDefectReturnLabelSource"?: SchemaValue<ReturnLabelSourceEnumeration | IdReference, "schema:itemDefectReturnLabelSource">;
    /** Amount of shipping costs for defect product returns. Applicable when property {@link https://schema.org/itemDefectReturnFees itemDefectReturnFees} equals {@link https://schema.org/ReturnShippingFees ReturnShippingFees}. */
    "schema:itemDefectReturnShippingFeesAmount"?: SchemaValue<MonetaryAmount | IdReference, "schema:itemDefectReturnShippingFeesAmount">;
    /** Specifies either a fixed return date or the number of days (from the delivery date) that a product can be returned. Used when the {@link https://schema.org/returnPolicyCategory returnPolicyCategory} property is specified as {@link https://schema.org/MerchantReturnFiniteReturnWindow MerchantReturnFiniteReturnWindow}. */
    "schema:merchantReturnDays"?: SchemaValue<Date | DateTime | Integer, "schema:merchantReturnDays">;
    /** Specifies a Web page or service by URL, for product returns. */
    "schema:merchantReturnLink"?: SchemaValue<URL, "schema:merchantReturnLink">;
    /** A refund type, from an enumerated list. */
    "schema:refundType"?: SchemaValue<RefundTypeEnumeration | IdReference, "schema:refundType">;
    /** Use {@link https://schema.org/MonetaryAmount MonetaryAmount} to specify a fixed restocking fee for product returns, or use {@link https://schema.org/Number Number} to specify a percentage of the product price paid by the customer. */
    "schema:restockingFee"?: SchemaValue<MonetaryAmount | Number | IdReference, "schema:restockingFee">;
    /** The type of return fees for purchased products (for any return reason) */
    "schema:returnFees"?: SchemaValue<ReturnFeesEnumeration | IdReference, "schema:returnFees">;
    /** The method (from an enumeration) by which the customer obtains a return shipping label for a product returned for any reason. */
    "schema:returnLabelSource"?: SchemaValue<ReturnLabelSourceEnumeration | IdReference, "schema:returnLabelSource">;
    /** The type of return method offered, specified from an enumeration. */
    "schema:returnMethod"?: SchemaValue<ReturnMethodEnumeration | IdReference, "schema:returnMethod">;
    /** Specifies an applicable return policy (from an enumeration). */
    "schema:returnPolicyCategory"?: SchemaValue<MerchantReturnEnumeration | IdReference, "schema:returnPolicyCategory">;
    /** The country where the product has to be sent to for returns, for example "Ireland" using the {@link https://schema.org/name name} property of {@link https://schema.org/Country Country}. You can also provide the two-letter {@link http://en.wikipedia.org/wiki/ISO_3166-1 ISO 3166-1 alpha-2 country code}. Note that this can be different from the country where the product was originally shipped from or sent too. */
    "schema:returnPolicyCountry"?: SchemaValue<Country | Text | IdReference, "schema:returnPolicyCountry">;
    /** Seasonal override of a return policy. */
    "schema:returnPolicySeasonalOverride"?: SchemaValue<MerchantReturnPolicySeasonalOverride | IdReference, "schema:returnPolicySeasonalOverride">;
    /** Amount of shipping costs for product returns (for any reason). Applicable when property {@link https://schema.org/returnFees returnFees} equals {@link https://schema.org/ReturnShippingFees ReturnShippingFees}. */
    "schema:returnShippingFeesAmount"?: SchemaValue<MonetaryAmount | IdReference, "schema:returnShippingFeesAmount">;
}
interface MerchantReturnPolicyLeaf extends MerchantReturnPolicyBase {
    "@type": "schema:MerchantReturnPolicy";
}
/** A MerchantReturnPolicy provides information about product return policies associated with an {@link https://schema.org/Organization Organization}, {@link https://schema.org/Product Product}, or {@link https://schema.org/Offer Offer}. */
export type MerchantReturnPolicy = MerchantReturnPolicyLeaf;

interface MerchantReturnPolicySeasonalOverrideBase extends ThingBase {
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:endDate"?: SchemaValue<Date | DateTime, "schema:endDate">;
    /** Specifies either a fixed return date or the number of days (from the delivery date) that a product can be returned. Used when the {@link https://schema.org/returnPolicyCategory returnPolicyCategory} property is specified as {@link https://schema.org/MerchantReturnFiniteReturnWindow MerchantReturnFiniteReturnWindow}. */
    "schema:merchantReturnDays"?: SchemaValue<Date | DateTime | Integer, "schema:merchantReturnDays">;
    /** Specifies an applicable return policy (from an enumeration). */
    "schema:returnPolicyCategory"?: SchemaValue<MerchantReturnEnumeration | IdReference, "schema:returnPolicyCategory">;
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:startDate"?: SchemaValue<Date | DateTime, "schema:startDate">;
}
interface MerchantReturnPolicySeasonalOverrideLeaf extends MerchantReturnPolicySeasonalOverrideBase {
    "@type": "schema:MerchantReturnPolicySeasonalOverride";
}
/** A seasonal override of a return policy, for example used for holidays. */
export type MerchantReturnPolicySeasonalOverride = MerchantReturnPolicySeasonalOverrideLeaf;

interface MessageBase extends CreativeWorkBase {
    /** A sub property of recipient. The recipient blind copied on a message. */
    "schema:bccRecipient"?: SchemaValue<ContactPoint | Organization | Person | IdReference, "schema:bccRecipient">;
    /** A sub property of recipient. The recipient copied on a message. */
    "schema:ccRecipient"?: SchemaValue<ContactPoint | Organization | Person | IdReference, "schema:ccRecipient">;
    /** The date/time at which the message has been read by the recipient if a single recipient exists. */
    "schema:dateRead"?: SchemaValue<Date | DateTime, "schema:dateRead">;
    /** The date/time the message was received if a single recipient exists. */
    "schema:dateReceived"?: SchemaValue<DateTime, "schema:dateReceived">;
    /** The date/time at which the message was sent. */
    "schema:dateSent"?: SchemaValue<DateTime, "schema:dateSent">;
    /** A CreativeWork attached to the message. */
    "schema:messageAttachment"?: SchemaValue<CreativeWork | IdReference, "schema:messageAttachment">;
    /** A sub property of participant. The participant who is at the receiving end of the action. */
    "schema:recipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:recipient">;
    /** A sub property of participant. The participant who is at the sending end of the action. */
    "schema:sender"?: SchemaValue<Audience | Organization | Person | IdReference, "schema:sender">;
    /** A sub property of recipient. The recipient who was directly sent the message. */
    "schema:toRecipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:toRecipient">;
}
interface MessageLeaf extends MessageBase {
    "@type": "schema:Message";
}
/** A single message from a sender to one or more organizations or people. */
export type Message = MessageLeaf | EmailMessage;

interface MiddleSchoolLeaf extends EducationalOrganizationBase {
    "@type": "schema:MiddleSchool";
}
/** A middle school (typically for children aged around 11-14, although this varies somewhat). */
export type MiddleSchool = MiddleSchoolLeaf | string;

interface MidwiferyLeaf extends LocalBusinessBase {
    "@type": "schema:Midwifery";
}
/** A nurse-like health profession that deals with pregnancy, childbirth, and the postpartum period (including care of the newborn), besides sexual and reproductive health of women throughout their lives. */
export type Midwifery = MidwiferyLeaf | string;

interface MinifiedStateLeaf extends ElementBase {
    "@type": "uxi:MinifiedState";
}
/** A UI element is in a minified state when it is displayed in a size smaller than its ideal display. That is usually somewhere between the size of maximized and mini-mized- state. Mini-fied- would be a window that fills part of the screen, mini-mized- would be an indicator in the task bar */
export type MinifiedState = MinifiedStateLeaf;

interface MinimizedStateLeaf extends ElementBase {
    "@type": "uxi:MinimizedState";
}
/** A UI element is in a minimized state when it is only shown by a symbol representing it in its stead. Interacting with that mini-mized- symbol will show the mini-fied- or the maximized UI element. The symbol is typically smaller than the smallest minified version of this element */
export type MinimizedState = MinimizedStateLeaf;

interface MobileApplicationBase extends SoftwareApplicationBase {
    /** Specifies specific carrier(s) requirements for the application (e.g. an application may only work on a specific carrier network). */
    "schema:carrierRequirements"?: SchemaValue<Text, "schema:carrierRequirements">;
}
interface MobileApplicationLeaf extends MobileApplicationBase {
    "@type": "schema:MobileApplication";
}
/** A software application designed specifically to work well on a mobile device such as a telephone. */
export type MobileApplication = MobileApplicationLeaf;

interface MobilePhoneStoreLeaf extends LocalBusinessBase {
    "@type": "schema:MobilePhoneStore";
}
/** A store that sells mobile phones and related accessories. */
export type MobilePhoneStore = MobilePhoneStoreLeaf | string;

interface MolecularEntityBase extends BioChemEntityBase {
    /** A role played by the BioChemEntity within a chemical context. */
    "schema:chemicalRole"?: SchemaValue<DefinedTerm | IdReference, "schema:chemicalRole">;
    /** Non-proprietary identifier for molecular entity that can be used in printed and electronic data sources thus enabling easier linking of diverse data compilations. */
    "schema:inChI"?: SchemaValue<Text, "schema:inChI">;
    /** InChIKey is a hashed version of the full InChI (using the SHA-256 algorithm). */
    "schema:inChIKey"?: SchemaValue<Text, "schema:inChIKey">;
    /** Systematic method of naming chemical compounds as recommended by the International Union of Pure and Applied Chemistry (IUPAC). */
    "schema:iupacName"?: SchemaValue<Text, "schema:iupacName">;
    /** The empirical formula is the simplest whole number ratio of all the atoms in a molecule. */
    "schema:molecularFormula"?: SchemaValue<Text, "schema:molecularFormula">;
    /** This is the molecular weight of the entity being described, not of the parent. Units should be included in the form '<Number> <unit>', for example '12 amu' or as '<QuantitativeValue>. */
    "schema:molecularWeight"?: SchemaValue<QuantitativeValue | Text | IdReference, "schema:molecularWeight">;
    /** The monoisotopic mass is the sum of the masses of the atoms in a molecule using the unbound, ground-state, rest mass of the principal (most abundant) isotope for each element instead of the isotopic average mass. Please include the units the form '<Number> <unit>', for example '770.230488 g/mol' or as '<QuantitativeValue>. */
    "schema:monoisotopicMolecularWeight"?: SchemaValue<QuantitativeValue | Text | IdReference, "schema:monoisotopicMolecularWeight">;
    /** Intended use of the BioChemEntity by humans. */
    "schema:potentialUse"?: SchemaValue<DefinedTerm | IdReference, "schema:potentialUse">;
    /** A specification in form of a line notation for describing the structure of chemical species using short ASCII strings. Double bond stereochemistry \ indicators may need to be escaped in the string in formats where the backslash is an escape character. */
    "schema:smiles"?: SchemaValue<Text, "schema:smiles">;
}
interface MolecularEntityLeaf extends MolecularEntityBase {
    "@type": "schema:MolecularEntity";
}
/** Any constitutionally or isotopically distinct atom, molecule, ion, ion pair, radical, radical ion, complex, conformer etc., identifiable as a separately distinguishable entity. */
export type MolecularEntity = MolecularEntityLeaf;

interface MoleculeUIElementLeaf extends UIElementBase {
    "@type": "uxi:MoleculeUIElement";
}
/** A Molecule UI element is the second smallest type of element, as understood by the Atomic Design Methodology. One Molecule UI element is made up of groups of Atoms, and form Organism UI Elements when combined with other molecules */
export type MoleculeUIElement = MoleculeUIElementLeaf | Dialog | Divider | Dropdown | NavigationBar | Pagination | Searchbar | Step | Thumbnail | Tooltip;

interface MonetaryAmountBase extends ThingBase {
    /**
     * The currency in which the monetary amount is expressed.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:currency"?: SchemaValue<Text, "schema:currency">;
    /** The upper value of some characteristic or property. */
    "schema:maxValue"?: SchemaValue<Number, "schema:maxValue">;
    /** The lower value of some characteristic or property. */
    "schema:minValue"?: SchemaValue<Number, "schema:minValue">;
    /** The date when the item becomes valid. */
    "schema:validFrom"?: SchemaValue<Date | DateTime, "schema:validFrom">;
    /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
    "schema:validThrough"?: SchemaValue<Date | DateTime, "schema:validThrough">;
    /**
     * The value of the quantitative value or property value node.
     * - For {@link https://schema.org/QuantitativeValue QuantitativeValue} and {@link https://schema.org/MonetaryAmount MonetaryAmount}, the recommended type for values is 'Number'.
     * - For {@link https://schema.org/PropertyValue PropertyValue}, it can be 'Text;', 'Number', 'Boolean', or 'StructuredValue'.
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     */
    "schema:value"?: SchemaValue<Boolean | Number | StructuredValue | Text | IdReference, "schema:value">;
}
interface MonetaryAmountLeaf extends MonetaryAmountBase {
    "@type": "schema:MonetaryAmount";
}
/** A monetary value or range. This type can be used to describe an amount of money such as $50 USD, or a range as in describing a bank account being suitable for a balance between £1,000 and £1,000,000 GBP, or the value of a salary, etc. It is recommended to use {@link https://schema.org/PriceSpecification PriceSpecification} Types to describe the price of an Offer, Invoice, etc. */
export type MonetaryAmount = MonetaryAmountLeaf;

interface MonetaryAmountDistributionBase extends QuantitativeValueDistributionBase {
    /**
     * The currency in which the monetary amount is expressed.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:currency"?: SchemaValue<Text, "schema:currency">;
}
interface MonetaryAmountDistributionLeaf extends MonetaryAmountDistributionBase {
    "@type": "schema:MonetaryAmountDistribution";
}
/** A statistical distribution of monetary amounts. */
export type MonetaryAmountDistribution = MonetaryAmountDistributionLeaf;

interface MonetaryGrantBase extends GrantBase {
    /** The amount of money. */
    "schema:amount"?: SchemaValue<MonetaryAmount | Number | IdReference, "schema:amount">;
    /** A person or organization that supports (sponsors) something through some kind of financial contribution. */
    "schema:funder"?: SchemaValue<Organization | Person | IdReference, "schema:funder">;
}
interface MonetaryGrantLeaf extends MonetaryGrantBase {
    "@type": "schema:MonetaryGrant";
}
/** A monetary grant. */
export type MonetaryGrant = MonetaryGrantLeaf;

interface MoneyTransferBase extends TransferActionBase {
    /** The amount of money. */
    "schema:amount"?: SchemaValue<MonetaryAmount | Number | IdReference, "schema:amount">;
    /** A bank or bank’s branch, financial institution or international financial institution operating the beneficiary’s bank account or releasing funds for the beneficiary. */
    "schema:beneficiaryBank"?: SchemaValue<BankOrCreditUnion | Text | IdReference, "schema:beneficiaryBank">;
}
interface MoneyTransferLeaf extends MoneyTransferBase {
    "@type": "schema:MoneyTransfer";
}
/** The act of transferring money from one place to another place. This may occur electronically or physically. */
export type MoneyTransfer = MoneyTransferLeaf;

interface MortgageLoanBase extends LoanOrCreditBase {
    /** Whether borrower is a resident of the jurisdiction where the property is located. */
    "schema:domiciledMortgage"?: SchemaValue<Boolean, "schema:domiciledMortgage">;
    /** Amount of mortgage mandate that can be converted into a proper mortgage at a later stage. */
    "schema:loanMortgageMandateAmount"?: SchemaValue<MonetaryAmount | IdReference, "schema:loanMortgageMandateAmount">;
}
interface MortgageLoanLeaf extends MortgageLoanBase {
    "@type": "schema:MortgageLoan";
}
/** A loan in which property or real estate is used as collateral. (A loan securitized against some real estate). */
export type MortgageLoan = MortgageLoanLeaf;

interface MosqueLeaf extends CivicStructureBase {
    "@type": "schema:Mosque";
}
/** A mosque. */
export type Mosque = MosqueLeaf | string;

interface MotelLeaf extends LodgingBusinessBase {
    "@type": "schema:Motel";
}
/**
 * A motel.
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type Motel = MotelLeaf | string;

interface MotorcycleLeaf extends VehicleBase {
    "@type": "schema:Motorcycle";
}
/** A motorcycle or motorbike is a single-track, two-wheeled motor vehicle. */
export type Motorcycle = MotorcycleLeaf;

interface MotorcycleDealerLeaf extends LocalBusinessBase {
    "@type": "schema:MotorcycleDealer";
}
/** A motorcycle dealer. */
export type MotorcycleDealer = MotorcycleDealerLeaf | string;

interface MotorcycleRepairLeaf extends LocalBusinessBase {
    "@type": "schema:MotorcycleRepair";
}
/** A motorcycle repair shop. */
export type MotorcycleRepair = MotorcycleRepairLeaf | string;

interface MotorizedBicycleLeaf extends VehicleBase {
    "@type": "schema:MotorizedBicycle";
}
/** A motorized bicycle is a bicycle with an attached motor used to power the vehicle, or to assist with pedaling. */
export type MotorizedBicycle = MotorizedBicycleLeaf;

interface MountainLeaf extends PlaceBase {
    "@type": "schema:Mountain";
}
/** A mountain, like Mount Whitney or Mount Everest. */
export type Mountain = MountainLeaf | string;

interface MoveActionBase extends ActionBase {
    /** A sub property of location. The original location of the object or the agent before the action. */
    "schema:fromLocation"?: SchemaValue<Place | IdReference, "schema:fromLocation">;
    /** A sub property of location. The final location of the object or the agent after the action. */
    "schema:toLocation"?: SchemaValue<Place | IdReference, "schema:toLocation">;
}
interface MoveActionLeaf extends MoveActionBase {
    "@type": "schema:MoveAction";
}
/**
 * The act of an agent relocating to a place.
 *
 * Related actions:
 * - {@link https://schema.org/TransferAction TransferAction}: Unlike TransferAction, the subject of the move is a living Person or Organization rather than an inanimate object.
 */
export type MoveAction = MoveActionLeaf | ArriveAction | DepartAction | TravelAction;

interface MovieBase extends CreativeWorkBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /**
     * An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/actor instead.
     */
    "schema:actors"?: SchemaValue<Person | IdReference, "schema:actors">;
    /**
     * The country of origin of something, including products as well as creative works such as movie and TV content.
     *
     * In the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of {@link https://schema.org/CreativeWork CreativeWork} it is difficult to provide fully general guidance, and properties such as {@link https://schema.org/contentLocation contentLocation} and {@link https://schema.org/locationCreated locationCreated} may be more applicable.
     *
     * In the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot be fully enumerated here.
     */
    "schema:countryOfOrigin"?: SchemaValue<Country | IdReference, "schema:countryOfOrigin">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /**
     * A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/director instead.
     */
    "schema:directors"?: SchemaValue<Person | IdReference, "schema:directors">;
    /** The duration of the item (movie, audio recording, event, etc.) in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    "schema:duration"?: SchemaValue<Duration | IdReference, "schema:duration">;
    /** The composer of the soundtrack. */
    "schema:musicBy"?: SchemaValue<MusicGroup | Person | IdReference, "schema:musicBy">;
    /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
    "schema:productionCompany"?: SchemaValue<Organization | IdReference, "schema:productionCompany">;
    /** Languages in which subtitles/captions are available, in {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard format}. */
    "schema:subtitleLanguage"?: SchemaValue<Language | Text | IdReference, "schema:subtitleLanguage">;
    /**
     * An {@link https://eidr.org/ EIDR} (Entertainment Identifier Registry) {@link https://schema.org/identifier identifier} representing at the most general/abstract level, a work of film or television.
     *
     * For example, the motion picture known as "Ghostbusters" has a titleEIDR of "10.5240/7EC7-228A-510A-053E-CBB8-J". This title (or work) may have several variants, which EIDR calls "edits". See {@link https://schema.org/editEIDR editEIDR}.
     *
     * Since schema.org types like {@link https://schema.org/Movie Movie} and {@link https://schema.org/TVEpisode TVEpisode} can be used for both works and their multiple expressions, it is possible to use {@link https://schema.org/titleEIDR titleEIDR} alone (for a general description), or alongside {@link https://schema.org/editEIDR editEIDR} for a more edit-specific description.
     */
    "schema:titleEIDR"?: SchemaValue<Text | URL, "schema:titleEIDR">;
    /** The trailer of a movie or tv/radio series, season, episode, etc. */
    "schema:trailer"?: SchemaValue<VideoObject | IdReference, "schema:trailer">;
}
interface MovieLeaf extends MovieBase {
    "@type": "schema:Movie";
}
/** A movie. */
export type Movie = MovieLeaf;

interface MovieClipLeaf extends ClipBase {
    "@type": "schema:MovieClip";
}
/** A short segment/part of a movie. */
export type MovieClip = MovieClipLeaf;

interface MovieRentalStoreLeaf extends LocalBusinessBase {
    "@type": "schema:MovieRentalStore";
}
/** A movie rental store. */
export type MovieRentalStore = MovieRentalStoreLeaf | string;

interface MovieSeriesBase extends CreativeWorkSeriesBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /**
     * An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/actor instead.
     */
    "schema:actors"?: SchemaValue<Person | IdReference, "schema:actors">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /**
     * A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/director instead.
     */
    "schema:directors"?: SchemaValue<Person | IdReference, "schema:directors">;
    /** The composer of the soundtrack. */
    "schema:musicBy"?: SchemaValue<MusicGroup | Person | IdReference, "schema:musicBy">;
    /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
    "schema:productionCompany"?: SchemaValue<Organization | IdReference, "schema:productionCompany">;
    /** The trailer of a movie or tv/radio series, season, episode, etc. */
    "schema:trailer"?: SchemaValue<VideoObject | IdReference, "schema:trailer">;
}
interface MovieSeriesLeaf extends MovieSeriesBase {
    "@type": "schema:MovieSeries";
}
/** A series of movies. Included movies can be indicated with the hasPart property. */
export type MovieSeries = MovieSeriesLeaf;

interface MovieTheaterBase extends CivicStructureBase, LocalBusinessBase {
    /** The number of screens in the movie theater. */
    "schema:screenCount"?: SchemaValue<Number, "schema:screenCount">;
}
interface MovieTheaterLeaf extends MovieTheaterBase {
    "@type": "schema:MovieTheater";
}
/** A movie theater. */
export type MovieTheater = MovieTheaterLeaf | string;

interface MovingCompanyLeaf extends LocalBusinessBase {
    "@type": "schema:MovingCompany";
}
/** A moving company. */
export type MovingCompany = MovingCompanyLeaf | string;

interface MultiSelectionBase extends ContainerUIElementBase {
    /** A set to express that there are multiple selected items */
    "uxi:selectedSet"?: SchemaValue<Number, "uxi:selectedSet">;
    /** A set to express that some items are not selected */
    "uxi:unselectedSet"?: SchemaValue<Number, "uxi:unselectedSet">;
}
interface MultiSelectionLeaf extends MultiSelectionBase {
    "@type": "uxi:MultiSelection";
}
/** A MultiSelection is a Container UI element which is part of a controlling element that allows many items inside it to be selected. Selection can be indicated visually, but a SelectedSet should be included for accessibility. */
export type MultiSelection = MultiSelectionLeaf;

interface MuscleBase extends AnatomicalStructureBase {
    /** The muscle whose action counteracts the specified muscle. */
    "schema:antagonist"?: SchemaValue<Muscle | IdReference, "schema:antagonist">;
    /** The blood vessel that carries blood from the heart to the muscle. */
    "schema:bloodSupply"?: SchemaValue<Vessel | IdReference, "schema:bloodSupply">;
    /** The place of attachment of a muscle, or what the muscle moves. */
    "schema:insertion"?: SchemaValue<AnatomicalStructure | IdReference, "schema:insertion">;
    /** The movement the muscle generates. */
    "schema:muscleAction"?: SchemaValue<Text, "schema:muscleAction">;
    /** The underlying innervation associated with the muscle. */
    "schema:nerve"?: SchemaValue<Nerve | IdReference, "schema:nerve">;
}
interface MuscleLeaf extends MuscleBase {
    "@type": "schema:Muscle";
}
/** A muscle is an anatomical structure consisting of a contractile form of tissue that animals use to effect movement. */
export type Muscle = MuscleLeaf;

interface MuseumLeaf extends CivicStructureBase {
    "@type": "schema:Museum";
}
/** A museum. */
export type Museum = MuseumLeaf | string;

interface MusicAlbumBase extends MusicPlaylistBase {
    /** Classification of the album by it's type of content: soundtrack, live album, studio album, etc. */
    "schema:albumProductionType"?: SchemaValue<MusicAlbumProductionType | IdReference, "schema:albumProductionType">;
    /** A release of this album. */
    "schema:albumRelease"?: SchemaValue<MusicRelease | IdReference, "schema:albumRelease">;
    /** The kind of release which this album is: single, EP or album. */
    "schema:albumReleaseType"?: SchemaValue<MusicAlbumReleaseType | IdReference, "schema:albumReleaseType">;
    /** The artist that performed this album or recording. */
    "schema:byArtist"?: SchemaValue<MusicGroup | Person | IdReference, "schema:byArtist">;
}
interface MusicAlbumLeaf extends MusicAlbumBase {
    "@type": "schema:MusicAlbum";
}
/** A collection of music tracks. */
export type MusicAlbum = MusicAlbumLeaf;

interface MusicAlbumProductionTypeLeaf extends EnumerationBase {
    "@type": "schema:MusicAlbumProductionType";
}
/** Classification of the album by it's type of content: soundtrack, live album, studio album, etc. */
export type MusicAlbumProductionType = "https://schema.org/CompilationAlbum" | "schema:CompilationAlbum" | "https://schema.org/DemoAlbum" | "schema:DemoAlbum" | "https://schema.org/DJMixAlbum" | "schema:DJMixAlbum" | "https://schema.org/LiveAlbum" | "schema:LiveAlbum" | "https://schema.org/MixtapeAlbum" | "schema:MixtapeAlbum" | "https://schema.org/RemixAlbum" | "schema:RemixAlbum" | "https://schema.org/SoundtrackAlbum" | "schema:SoundtrackAlbum" | "https://schema.org/SpokenWordAlbum" | "schema:SpokenWordAlbum" | "https://schema.org/StudioAlbum" | "schema:StudioAlbum" | MusicAlbumProductionTypeLeaf;

interface MusicAlbumReleaseTypeLeaf extends EnumerationBase {
    "@type": "schema:MusicAlbumReleaseType";
}
/** The kind of release which this album is: single, EP or album. */
export type MusicAlbumReleaseType = "https://schema.org/AlbumRelease" | "schema:AlbumRelease" | "https://schema.org/BroadcastRelease" | "schema:BroadcastRelease" | "https://schema.org/EPRelease" | "schema:EPRelease" | "https://schema.org/SingleRelease" | "schema:SingleRelease" | MusicAlbumReleaseTypeLeaf;

interface MusicCompositionBase extends CreativeWorkBase {
    /** The person or organization who wrote a composition, or who is the composer of a work performed at some event. */
    "schema:composer"?: SchemaValue<Organization | Person | IdReference, "schema:composer">;
    /** The date and place the work was first performed. */
    "schema:firstPerformance"?: SchemaValue<Event | IdReference, "schema:firstPerformance">;
    /** Smaller compositions included in this work (e.g. a movement in a symphony). */
    "schema:includedComposition"?: SchemaValue<MusicComposition | IdReference, "schema:includedComposition">;
    /** The International Standard Musical Work Code for the composition. */
    "schema:iswcCode"?: SchemaValue<Text, "schema:iswcCode">;
    /** The person who wrote the words. */
    "schema:lyricist"?: SchemaValue<Person | IdReference, "schema:lyricist">;
    /** The words in the song. */
    "schema:lyrics"?: SchemaValue<CreativeWork | IdReference, "schema:lyrics">;
    /** The key, mode, or scale this composition uses. */
    "schema:musicalKey"?: SchemaValue<Text, "schema:musicalKey">;
    /** An arrangement derived from the composition. */
    "schema:musicArrangement"?: SchemaValue<MusicComposition | IdReference, "schema:musicArrangement">;
    /** The type of composition (e.g. overture, sonata, symphony, etc.). */
    "schema:musicCompositionForm"?: SchemaValue<Text, "schema:musicCompositionForm">;
    /** An audio recording of the work. */
    "schema:recordedAs"?: SchemaValue<MusicRecording | IdReference, "schema:recordedAs">;
}
interface MusicCompositionLeaf extends MusicCompositionBase {
    "@type": "schema:MusicComposition";
}
/** A musical composition. */
export type MusicComposition = MusicCompositionLeaf;

interface MusicEventLeaf extends EventBase {
    "@type": "schema:MusicEvent";
}
/** Event type: Music event. */
export type MusicEvent = MusicEventLeaf;

interface MusicGroupBase extends OrganizationBase {
    /** A music album. */
    "schema:album"?: SchemaValue<MusicAlbum | IdReference, "schema:album">;
    /**
     * A collection of music albums.
     *
     * @deprecated Consider using https://schema.org/album instead.
     */
    "schema:albums"?: SchemaValue<MusicAlbum | IdReference, "schema:albums">;
    /** Genre of the creative work, broadcast channel or group. */
    "schema:genre"?: SchemaValue<Text | URL, "schema:genre">;
    /**
     * A member of a music group—for example, John, Paul, George, or Ringo.
     *
     * @deprecated Consider using https://schema.org/member instead.
     */
    "schema:musicGroupMember"?: SchemaValue<Person | IdReference, "schema:musicGroupMember">;
    /** A music recording (track)—usually a single song. If an ItemList is given, the list should contain items of type MusicRecording. */
    "schema:track"?: SchemaValue<ItemList | MusicRecording | IdReference, "schema:track">;
    /**
     * A music recording (track)—usually a single song.
     *
     * @deprecated Consider using https://schema.org/track instead.
     */
    "schema:tracks"?: SchemaValue<MusicRecording | IdReference, "schema:tracks">;
}
interface MusicGroupLeaf extends MusicGroupBase {
    "@type": "schema:MusicGroup";
}
/** A musical group, such as a band, an orchestra, or a choir. Can also be a solo musician. */
export type MusicGroup = MusicGroupLeaf | string;

interface MusicPlaylistBase extends CreativeWorkBase {
    /** The number of tracks in this album or playlist. */
    "schema:numTracks"?: SchemaValue<Integer, "schema:numTracks">;
    /** A music recording (track)—usually a single song. If an ItemList is given, the list should contain items of type MusicRecording. */
    "schema:track"?: SchemaValue<ItemList | MusicRecording | IdReference, "schema:track">;
    /**
     * A music recording (track)—usually a single song.
     *
     * @deprecated Consider using https://schema.org/track instead.
     */
    "schema:tracks"?: SchemaValue<MusicRecording | IdReference, "schema:tracks">;
}
interface MusicPlaylistLeaf extends MusicPlaylistBase {
    "@type": "schema:MusicPlaylist";
}
/** A collection of music tracks in playlist form. */
export type MusicPlaylist = MusicPlaylistLeaf | MusicAlbum | MusicRelease;

interface MusicRecordingBase extends CreativeWorkBase {
    /** The artist that performed this album or recording. */
    "schema:byArtist"?: SchemaValue<MusicGroup | Person | IdReference, "schema:byArtist">;
    /** The duration of the item (movie, audio recording, event, etc.) in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    "schema:duration"?: SchemaValue<Duration | IdReference, "schema:duration">;
    /** The album to which this recording belongs. */
    "schema:inAlbum"?: SchemaValue<MusicAlbum | IdReference, "schema:inAlbum">;
    /** The playlist to which this recording belongs. */
    "schema:inPlaylist"?: SchemaValue<MusicPlaylist | IdReference, "schema:inPlaylist">;
    /** The International Standard Recording Code for the recording. */
    "schema:isrcCode"?: SchemaValue<Text, "schema:isrcCode">;
    /** The composition this track is a recording of. */
    "schema:recordingOf"?: SchemaValue<MusicComposition | IdReference, "schema:recordingOf">;
}
interface MusicRecordingLeaf extends MusicRecordingBase {
    "@type": "schema:MusicRecording";
}
/** A music recording (track), usually a single song. */
export type MusicRecording = MusicRecordingLeaf;

interface MusicReleaseBase extends MusicPlaylistBase {
    /** The catalog number for the release. */
    "schema:catalogNumber"?: SchemaValue<Text, "schema:catalogNumber">;
    /** The group the release is credited to if different than the byArtist. For example, Red and Blue is credited to "Stefani Germanotta Band", but by Lady Gaga. */
    "schema:creditedTo"?: SchemaValue<Organization | Person | IdReference, "schema:creditedTo">;
    /** The duration of the item (movie, audio recording, event, etc.) in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    "schema:duration"?: SchemaValue<Duration | IdReference, "schema:duration">;
    /** Format of this release (the type of recording media used, ie. compact disc, digital media, LP, etc.). */
    "schema:musicReleaseFormat"?: SchemaValue<MusicReleaseFormatType | IdReference, "schema:musicReleaseFormat">;
    /** The label that issued the release. */
    "schema:recordLabel"?: SchemaValue<Organization | IdReference, "schema:recordLabel">;
    /** The album this is a release of. */
    "schema:releaseOf"?: SchemaValue<MusicAlbum | IdReference, "schema:releaseOf">;
}
interface MusicReleaseLeaf extends MusicReleaseBase {
    "@type": "schema:MusicRelease";
}
/** A MusicRelease is a specific release of a music album. */
export type MusicRelease = MusicReleaseLeaf;

interface MusicReleaseFormatTypeLeaf extends EnumerationBase {
    "@type": "schema:MusicReleaseFormatType";
}
/** Format of this release (the type of recording media used, ie. compact disc, digital media, LP, etc.). */
export type MusicReleaseFormatType = "https://schema.org/CassetteFormat" | "schema:CassetteFormat" | "https://schema.org/CDFormat" | "schema:CDFormat" | "https://schema.org/DigitalAudioTapeFormat" | "schema:DigitalAudioTapeFormat" | "https://schema.org/DigitalFormat" | "schema:DigitalFormat" | "https://schema.org/DVDFormat" | "schema:DVDFormat" | "https://schema.org/LaserDiscFormat" | "schema:LaserDiscFormat" | "https://schema.org/VinylFormat" | "schema:VinylFormat" | MusicReleaseFormatTypeLeaf;

interface MusicStoreLeaf extends LocalBusinessBase {
    "@type": "schema:MusicStore";
}
/** A music store. */
export type MusicStore = MusicStoreLeaf | string;

interface MusicVenueLeaf extends CivicStructureBase {
    "@type": "schema:MusicVenue";
}
/** A music venue. */
export type MusicVenue = MusicVenueLeaf | string;

interface MusicVideoObjectLeaf extends MediaObjectBase {
    "@type": "schema:MusicVideoObject";
}
/** A music video file. */
export type MusicVideoObject = MusicVideoObjectLeaf;

interface NailSalonLeaf extends LocalBusinessBase {
    "@type": "schema:NailSalon";
}
/** A nail salon. */
export type NailSalon = NailSalonLeaf | string;

interface NavigateActionLeaf extends UIActionBase {
    "@type": "uxi:NavigateAction";
}
/** A user action to navigate the application. Broadly speaking, anything telling users where they are, where to go and how to get there can be called navigation */
export type NavigateAction = NavigateActionLeaf;

interface NavigationBarLeaf extends UIElementBase {
    "@type": "uxi:NavigationBar";
}
/** A navigation bar is a type of Molecule UI Element that guides users through main parts of the application. It often tells the users which part they are currently at, where to go and sometimes where they come from. Most commonly placed on top, but can also be found on either side of the screen. Navigation Elements often minify to increase the space for other interactions. Also referred to as an App-Bar when visible throughout the application. */
export type NavigationBar = NavigationBarLeaf;

interface NerveBase extends AnatomicalStructureBase {
    /**
     * The branches that delineate from the nerve bundle. Not to be confused with {@link https://schema.org/branchOf branchOf}.
     *
     * @deprecated Consider using https://schema.org/arterialBranch instead.
     */
    "schema:branch"?: SchemaValue<AnatomicalStructure | IdReference, "schema:branch">;
    /** The neurological pathway extension that involves muscle control. */
    "schema:nerveMotor"?: SchemaValue<Muscle | IdReference, "schema:nerveMotor">;
    /** The neurological pathway extension that inputs and sends information to the brain or spinal cord. */
    "schema:sensoryUnit"?: SchemaValue<AnatomicalStructure | SuperficialAnatomy | IdReference, "schema:sensoryUnit">;
    /** The neurological pathway that originates the neurons. */
    "schema:sourcedFrom"?: SchemaValue<BrainStructure | IdReference, "schema:sourcedFrom">;
}
interface NerveLeaf extends NerveBase {
    "@type": "schema:Nerve";
}
/** A common pathway for the electrochemical nerve impulses that are transmitted along each of the axons. */
export type Nerve = NerveLeaf;

interface NewsArticleBase extends ArticleBase {
    /**
     * A {@link https://en.wikipedia.org/wiki/Dateline dateline} is a brief piece of text included in news articles that describes where and when the story was written or filed though the date is often omitted. Sometimes only a placename is provided.
     *
     * Structured representations of dateline-related information can also be expressed more explicitly using {@link https://schema.org/locationCreated locationCreated} (which represents where a work was created e.g. where a news report was written). For location depicted or described in the content, use {@link https://schema.org/contentLocation contentLocation}.
     *
     * Dateline summaries are oriented more towards human readers than towards automated processing, and can vary substantially. Some examples: "BEIRUT, Lebanon, June 2.", "Paris, France", "December 19, 2017 11:43AM Reporting from Washington", "Beijing/Moscow", "QUEZON CITY, Philippines".
     */
    "schema:dateline"?: SchemaValue<Text, "schema:dateline">;
    /** The number of the column in which the NewsArticle appears in the print edition. */
    "schema:printColumn"?: SchemaValue<Text, "schema:printColumn">;
    /** The edition of the print product in which the NewsArticle appears. */
    "schema:printEdition"?: SchemaValue<Text, "schema:printEdition">;
    /** If this NewsArticle appears in print, this field indicates the name of the page on which the article is found. Please note that this field is intended for the exact page name (e.g. A5, B18). */
    "schema:printPage"?: SchemaValue<Text, "schema:printPage">;
    /** If this NewsArticle appears in print, this field indicates the print section in which the article appeared. */
    "schema:printSection"?: SchemaValue<Text, "schema:printSection">;
}
interface NewsArticleLeaf extends NewsArticleBase {
    "@type": "schema:NewsArticle";
}
/**
 * A NewsArticle is an article whose content reports news, or provides background context and supporting materials for understanding the news.
 *
 * A more detailed overview of {@link /docs/news.html schema.org News markup} is also available.
 */
export type NewsArticle = NewsArticleLeaf | AnalysisNewsArticle | AskPublicNewsArticle | BackgroundNewsArticle | OpinionNewsArticle | ReportageNewsArticle | ReviewNewsArticle;

interface NewsMediaOrganizationBase extends OrganizationBase {
    /** For a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization} or other news-related {@link https://schema.org/Organization Organization}, a statement about public engagement activities (for news media, the newsroom’s), including involving the public - digitally or otherwise -- in coverage decisions, reporting and activities after publication. */
    "schema:actionableFeedbackPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:actionableFeedbackPolicy">;
    /** For an {@link https://schema.org/Organization Organization} (e.g. {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}), a statement describing (in news media, the newsroom’s) disclosure and correction policy for errors. */
    "schema:correctionsPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:correctionsPolicy">;
    /** Statement on diversity policy by an {@link https://schema.org/Organization Organization} e.g. a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}. For a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}, a statement describing the newsroom’s diversity policy on both staffing and sources, typically providing staffing data. */
    "schema:diversityPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:diversityPolicy">;
    /** For an {@link https://schema.org/Organization Organization} (often but not necessarily a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}), a report on staffing diversity issues. In a news context this might be for example ASNE or RTDNA (US) reports, or self-reported. */
    "schema:diversityStaffingReport"?: SchemaValue<Article | URL | IdReference, "schema:diversityStaffingReport">;
    /** Statement about ethics policy, e.g. of a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization} regarding journalistic and publishing practices, or of a {@link https://schema.org/Restaurant Restaurant}, a page describing food source policies. In the case of a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}, an ethicsPolicy is typically a statement describing the personal, organizational, and corporate standards of behavior expected by the organization. */
    "schema:ethicsPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:ethicsPolicy">;
    /** For a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}, a link to the masthead page or a page listing top editorial management. */
    "schema:masthead"?: SchemaValue<CreativeWork | URL | IdReference, "schema:masthead">;
    /** For a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}, a statement on coverage priorities, including any public agenda or stance on issues. */
    "schema:missionCoveragePrioritiesPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:missionCoveragePrioritiesPolicy">;
    /** For a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization} or other news-related {@link https://schema.org/Organization Organization}, a statement explaining when authors of articles are not named in bylines. */
    "schema:noBylinesPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:noBylinesPolicy">;
    /** For an {@link https://schema.org/Organization Organization} (often but not necessarily a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}), a description of organizational ownership structure; funding and grants. In a news/media setting, this is with particular reference to editorial independence. Note that the {@link https://schema.org/funder funder} is also available and can be used to make basic funder information machine-readable. */
    "schema:ownershipFundingInfo"?: SchemaValue<AboutPage | CreativeWork | Text | URL | IdReference, "schema:ownershipFundingInfo">;
    /** For an {@link https://schema.org/Organization Organization} (typically a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}), a statement about policy on use of unnamed sources and the decision process required. */
    "schema:unnamedSourcesPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:unnamedSourcesPolicy">;
    /** Disclosure about verification and fact-checking processes for a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization} or other fact-checking {@link https://schema.org/Organization Organization}. */
    "schema:verificationFactCheckingPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:verificationFactCheckingPolicy">;
}
interface NewsMediaOrganizationLeaf extends NewsMediaOrganizationBase {
    "@type": "schema:NewsMediaOrganization";
}
/** A News/Media organization such as a newspaper or TV station. */
export type NewsMediaOrganization = NewsMediaOrganizationLeaf | string;

interface NewspaperLeaf extends CreativeWorkSeriesBase {
    "@type": "schema:Newspaper";
}
/** A publication containing information about varied topics that are pertinent to general information, a geographic area, or a specific subject matter (i.e. business, culture, education). Often published daily. */
export type Newspaper = NewspaperLeaf;

interface NGOLeaf extends OrganizationBase {
    "@type": "schema:NGO";
}
/** Organization: Non-governmental Organization. */
export type NGO = NGOLeaf | string;

interface NightClubLeaf extends LocalBusinessBase {
    "@type": "schema:NightClub";
}
/** A nightclub or discotheque. */
export type NightClub = NightClubLeaf | string;

interface NLNonprofitTypeLeaf extends EnumerationBase {
    "@type": "schema:NLNonprofitType";
}
/** NLNonprofitType: Non-profit organization type originating from the Netherlands. */
export type NLNonprofitType = "https://schema.org/NonprofitANBI" | "schema:NonprofitANBI" | "https://schema.org/NonprofitSBBI" | "schema:NonprofitSBBI" | NLNonprofitTypeLeaf;

interface NonprofitTypeLeaf extends EnumerationBase {
    "@type": "schema:NonprofitType";
}
/** NonprofitType enumerates several kinds of official non-profit types of which a non-profit organization can be. */
export type NonprofitType = NonprofitTypeLeaf | NLNonprofitType | UKNonprofitType | USNonprofitType;

interface NotaryLeaf extends LocalBusinessBase {
    "@type": "schema:Notary";
}
/** A notary. */
export type Notary = NotaryLeaf | string;

interface NoteDigitalDocumentLeaf extends DigitalDocumentBase {
    "@type": "schema:NoteDigitalDocument";
}
/** A file containing a note, primarily for the author. */
export type NoteDigitalDocument = NoteDigitalDocumentLeaf;

interface NumericTypeBase extends ElementBase {
    /** Human-readable numeric values can have min/max/current properties to describe them more closely */
    "uxi:NumericTypeProperty"?: SchemaValue<Number, "uxi:NumericTypeProperty">;
}
interface NumericTypeLeaf extends NumericTypeBase {
    "@type": "uxi:NumericType";
}
/** Data type: Numeric. Human-readable terms that are expressed in numbers, examples could be an NPS score, temperature, etc. */
export type NumericType = NumericTypeLeaf;

interface NursingLeaf extends LocalBusinessBase {
    "@type": "schema:Nursing";
}
/** A health profession of a person formally educated and trained in the care of the sick or infirm person. */
export type Nursing = NursingLeaf | string;

interface NutritionInformationBase extends ThingBase {
    /** The number of calories. */
    "schema:calories"?: SchemaValue<Energy | IdReference, "schema:calories">;
    /** The number of grams of carbohydrates. */
    "schema:carbohydrateContent"?: SchemaValue<Mass | IdReference, "schema:carbohydrateContent">;
    /** The number of milligrams of cholesterol. */
    "schema:cholesterolContent"?: SchemaValue<Mass | IdReference, "schema:cholesterolContent">;
    /** The number of grams of fat. */
    "schema:fatContent"?: SchemaValue<Mass | IdReference, "schema:fatContent">;
    /** The number of grams of fiber. */
    "schema:fiberContent"?: SchemaValue<Mass | IdReference, "schema:fiberContent">;
    /** The number of grams of protein. */
    "schema:proteinContent"?: SchemaValue<Mass | IdReference, "schema:proteinContent">;
    /** The number of grams of saturated fat. */
    "schema:saturatedFatContent"?: SchemaValue<Mass | IdReference, "schema:saturatedFatContent">;
    /** The serving size, in terms of the number of volume or mass. */
    "schema:servingSize"?: SchemaValue<Text, "schema:servingSize">;
    /** The number of milligrams of sodium. */
    "schema:sodiumContent"?: SchemaValue<Mass | IdReference, "schema:sodiumContent">;
    /** The number of grams of sugar. */
    "schema:sugarContent"?: SchemaValue<Mass | IdReference, "schema:sugarContent">;
    /** The number of grams of trans fat. */
    "schema:transFatContent"?: SchemaValue<Mass | IdReference, "schema:transFatContent">;
    /** The number of grams of unsaturated fat. */
    "schema:unsaturatedFatContent"?: SchemaValue<Mass | IdReference, "schema:unsaturatedFatContent">;
}
interface NutritionInformationLeaf extends NutritionInformationBase {
    "@type": "schema:NutritionInformation";
}
/** Nutritional information about the recipe. */
export type NutritionInformation = NutritionInformationLeaf;

interface ObservationBase extends ThingBase {
    /** A marginOfError for an {@link https://schema.org/Observation Observation}. */
    "schema:marginOfError"?: SchemaValue<QuantitativeValue | IdReference, "schema:marginOfError">;
    /** The measuredProperty of an {@link https://schema.org/Observation Observation}, either a schema.org property, a property from other RDF-compatible systems e.g. W3C RDF Data Cube, or schema.org extensions such as {@link https://www.gs1.org/voc/?show=properties GS1's}. */
    "schema:measuredProperty"?: SchemaValue<Property | IdReference, "schema:measuredProperty">;
    /** The measuredValue of an {@link https://schema.org/Observation Observation}. */
    "schema:measuredValue"?: SchemaValue<DataType | IdReference, "schema:measuredValue">;
    /** The observationDate of an {@link https://schema.org/Observation Observation}. */
    "schema:observationDate"?: SchemaValue<DateTime, "schema:observationDate">;
    /** The observedNode of an {@link https://schema.org/Observation Observation}, often a {@link https://schema.org/StatisticalPopulation StatisticalPopulation}. */
    "schema:observedNode"?: SchemaValue<StatisticalPopulation | IdReference, "schema:observedNode">;
}
interface ObservationLeaf extends ObservationBase {
    "@type": "schema:Observation";
}
/** Instances of the class {@link https://schema.org/Observation Observation} are used to specify observations about an entity (which may or may not be an instance of a {@link https://schema.org/StatisticalPopulation StatisticalPopulation}), at a particular time. The principal properties of an {@link https://schema.org/Observation Observation} are {@link https://schema.org/observedNode observedNode}, {@link https://schema.org/measuredProperty measuredProperty}, {@link https://schema.org/measuredValue measuredValue} (or {@link https://schema.org/median median}, etc.) and {@link https://schema.org/observationDate observationDate} ({@link https://schema.org/measuredProperty measuredProperty} properties can, but need not always, be W3C RDF Data Cube "measure properties", as in the {@link https://www.w3.org/TR/vocab-data-cube/#dsd-example lifeExpectancy example}). See also {@link https://schema.org/StatisticalPopulation StatisticalPopulation}, and the {@link /docs/data-and-datasets.html data and datasets} overview for more details. */
export type Observation = ObservationLeaf;

interface ObstetricLeaf extends LocalBusinessBase {
    "@type": "schema:Obstetric";
}
/** A specific branch of medical science that specializes in the care of women during the prenatal and postnatal care and with the delivery of the child. */
export type Obstetric = ObstetricLeaf | string;

interface OccupationBase extends ThingBase {
    /** Educational background needed for the position or Occupation. */
    "schema:educationRequirements"?: SchemaValue<EducationalOccupationalCredential | Text | IdReference, "schema:educationRequirements">;
    /** An estimated salary for a job posting or occupation, based on a variety of variables including, but not limited to industry, job title, and location. Estimated salaries are often computed by outside organizations rather than the hiring organization, who may not have committed to the estimated value. */
    "schema:estimatedSalary"?: SchemaValue<MonetaryAmount | MonetaryAmountDistribution | Number | IdReference, "schema:estimatedSalary">;
    /** Description of skills and experience needed for the position or Occupation. */
    "schema:experienceRequirements"?: SchemaValue<OccupationalExperienceRequirements | Text | IdReference, "schema:experienceRequirements">;
    /**
     * A category describing the job, preferably using a term from a taxonomy such as {@link http://www.onetcenter.org/taxonomy.html BLS O*NET-SOC}, {@link https://www.ilo.org/public/english/bureau/stat/isco/isco08/ ISCO-08} or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.
     *
     * Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC.
     */
    "schema:occupationalCategory"?: SchemaValue<CategoryCode | Text | IdReference, "schema:occupationalCategory">;
    /** The region/country for which this occupational description is appropriate. Note that educational requirements and qualifications can vary between jurisdictions. */
    "schema:occupationLocation"?: SchemaValue<AdministrativeArea | IdReference, "schema:occupationLocation">;
    /** Specific qualifications required for this role or Occupation. */
    "schema:qualifications"?: SchemaValue<EducationalOccupationalCredential | Text | IdReference, "schema:qualifications">;
    /** Responsibilities associated with this role or Occupation. */
    "schema:responsibilities"?: SchemaValue<Text, "schema:responsibilities">;
    /** A statement of knowledge, skill, ability, task or any other assertion expressing a competency that is desired or required to fulfill this role or to work in this occupation. */
    "schema:skills"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:skills">;
}
interface OccupationLeaf extends OccupationBase {
    "@type": "schema:Occupation";
}
/** A profession, may involve prolonged training and/or a formal qualification. */
export type Occupation = OccupationLeaf;

interface OccupationalExperienceRequirementsBase extends ThingBase {
    /** Indicates the minimal number of months of experience required for a position. */
    "schema:monthsOfExperience"?: SchemaValue<Number, "schema:monthsOfExperience">;
}
interface OccupationalExperienceRequirementsLeaf extends OccupationalExperienceRequirementsBase {
    "@type": "schema:OccupationalExperienceRequirements";
}
/** Indicates employment-related experience requirements, e.g. {@link https://schema.org/monthsOfExperience monthsOfExperience}. */
export type OccupationalExperienceRequirements = OccupationalExperienceRequirementsLeaf;

interface OccupationalTherapyLeaf extends MedicalTherapyBase {
    "@type": "schema:OccupationalTherapy";
}
/** A treatment of people with physical, emotional, or social problems, using purposeful activity to help them overcome or learn to deal with their problems. */
export type OccupationalTherapy = OccupationalTherapyLeaf;

interface OceanBodyOfWaterLeaf extends PlaceBase {
    "@type": "schema:OceanBodyOfWater";
}
/** An ocean (for example, the Pacific). */
export type OceanBodyOfWater = OceanBodyOfWaterLeaf | string;

interface OfferBase extends ThingBase {
    /** The payment method(s) accepted by seller for this offer. */
    "schema:acceptedPaymentMethod"?: SchemaValue<LoanOrCredit | PaymentMethod | IdReference, "schema:acceptedPaymentMethod">;
    /** An additional offer that can only be obtained in combination with the first base offer (e.g. supplements and extensions that are available for a surcharge). */
    "schema:addOn"?: SchemaValue<Offer | IdReference, "schema:addOn">;
    /** The amount of time that is required between accepting the offer and the actual usage of the resource or service. */
    "schema:advanceBookingRequirement"?: SchemaValue<QuantitativeValue | IdReference, "schema:advanceBookingRequirement">;
    /** The overall rating, based on a collection of reviews or ratings, of the item. */
    "schema:aggregateRating"?: SchemaValue<AggregateRating | IdReference, "schema:aggregateRating">;
    /** The geographic area where a service or offered item is provided. */
    "schema:areaServed"?: SchemaValue<AdministrativeArea | GeoShape | Place | Text | IdReference, "schema:areaServed">;
    /** The availability of this item—for example In stock, Out of stock, Pre-order, etc. */
    "schema:availability"?: SchemaValue<ItemAvailability | IdReference, "schema:availability">;
    /** The end of the availability of the product or service included in the offer. */
    "schema:availabilityEnds"?: SchemaValue<Date | DateTime | Time, "schema:availabilityEnds">;
    /** The beginning of the availability of the product or service included in the offer. */
    "schema:availabilityStarts"?: SchemaValue<Date | DateTime | Time, "schema:availabilityStarts">;
    /** The place(s) from which the offer can be obtained (e.g. store locations). */
    "schema:availableAtOrFrom"?: SchemaValue<Place | IdReference, "schema:availableAtOrFrom">;
    /** The delivery method(s) available for this offer. */
    "schema:availableDeliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:availableDeliveryMethod">;
    /** The business function (e.g. sell, lease, repair, dispose) of the offer or component of a bundle (TypeAndQuantityNode). The default is http://purl.org/goodrelations/v1#Sell. */
    "schema:businessFunction"?: SchemaValue<BusinessFunction | IdReference, "schema:businessFunction">;
    /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
    "schema:category"?: SchemaValue<PhysicalActivityCategory | Text | Thing | URL | IdReference, "schema:category">;
    /** The typical delay between the receipt of the order and the goods either leaving the warehouse or being prepared for pickup, in case the delivery method is on site pickup. */
    "schema:deliveryLeadTime"?: SchemaValue<QuantitativeValue | IdReference, "schema:deliveryLeadTime">;
    /** The type(s) of customers for which the given offer is valid. */
    "schema:eligibleCustomerType"?: SchemaValue<BusinessEntityType | IdReference, "schema:eligibleCustomerType">;
    /** The duration for which the given offer is valid. */
    "schema:eligibleDuration"?: SchemaValue<QuantitativeValue | IdReference, "schema:eligibleDuration">;
    /** The interval and unit of measurement of ordering quantities for which the offer or price specification is valid. This allows e.g. specifying that a certain freight charge is valid only for a certain quantity. */
    "schema:eligibleQuantity"?: SchemaValue<QuantitativeValue | IdReference, "schema:eligibleQuantity">;
    /**
     * The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is valid.
     *
     * See also {@link https://schema.org/ineligibleRegion ineligibleRegion}.
     */
    "schema:eligibleRegion"?: SchemaValue<GeoShape | Place | Text | IdReference, "schema:eligibleRegion">;
    /** The transaction volume, in a monetary unit, for which the offer or price specification is valid, e.g. for indicating a minimal purchasing volume, to express free shipping above a certain order volume, or to limit the acceptance of credit cards to purchases to a certain minimal amount. */
    "schema:eligibleTransactionVolume"?: SchemaValue<PriceSpecification | IdReference, "schema:eligibleTransactionVolume">;
    /** A Global Trade Item Number ({@link https://www.gs1.org/standards/id-keys/gtin GTIN}). GTINs identify trade items, including products and services, using numeric identification codes. The {@link https://schema.org/gtin gtin} property generalizes the earlier {@link https://schema.org/gtin8 gtin8}, {@link https://schema.org/gtin12 gtin12}, {@link https://schema.org/gtin13 gtin13}, and {@link https://schema.org/gtin14 gtin14} properties. The GS1 {@link https://www.gs1.org/standards/Digital-Link/ digital link specifications} express GTINs as URLs. A correct {@link https://schema.org/gtin gtin} value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a {@link https://www.gs1.org/services/check-digit-calculator valid GS1 check digit} and meet the other rules for valid GTINs. See also {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1's GTIN Summary} and {@link https://en.wikipedia.org/wiki/Global_Trade_Item_Number Wikipedia} for more details. Left-padding of the gtin values is not required or encouraged. */
    "schema:gtin"?: SchemaValue<Text, "schema:gtin">;
    /** The GTIN-12 code of the product, or the product to which the offer refers. The GTIN-12 is the 12-digit GS1 Identification Key composed of a U.P.C. Company Prefix, Item Reference, and Check Digit used to identify trade items. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin12"?: SchemaValue<Text, "schema:gtin12">;
    /** The GTIN-13 code of the product, or the product to which the offer refers. This is equivalent to 13-digit ISBN codes and EAN UCC-13. Former 12-digit UPC codes can be converted into a GTIN-13 code by simply adding a preceding zero. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin13"?: SchemaValue<Text, "schema:gtin13">;
    /** The GTIN-14 code of the product, or the product to which the offer refers. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin14"?: SchemaValue<Text, "schema:gtin14">;
    /** The GTIN-8 code of the product, or the product to which the offer refers. This code is also known as EAN/UCC-8 or 8-digit EAN. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin8"?: SchemaValue<Text, "schema:gtin8">;
    /** A product measurement, for example the inseam of pants, the wheel size of a bicycle, or the gauge of a screw. Usually an exact measurement, but can also be a range of measurements for adjustable products, for example belts and ski bindings. */
    "schema:hasMeasurement"?: SchemaValue<QuantitativeValue | IdReference, "schema:hasMeasurement">;
    /** Specifies a MerchantReturnPolicy that may be applicable. */
    "schema:hasMerchantReturnPolicy"?: SchemaValue<MerchantReturnPolicy | IdReference, "schema:hasMerchantReturnPolicy">;
    /** This links to a node or nodes indicating the exact quantity of the products included in an {@link https://schema.org/Offer Offer} or {@link https://schema.org/ProductCollection ProductCollection}. */
    "schema:includesObject"?: SchemaValue<TypeAndQuantityNode | IdReference, "schema:includesObject">;
    /**
     * The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.
     *
     * See also {@link https://schema.org/eligibleRegion eligibleRegion}.
     */
    "schema:ineligibleRegion"?: SchemaValue<GeoShape | Place | Text | IdReference, "schema:ineligibleRegion">;
    /** The current approximate inventory level for the item or items. */
    "schema:inventoryLevel"?: SchemaValue<QuantitativeValue | IdReference, "schema:inventoryLevel">;
    /** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
    "schema:itemCondition"?: SchemaValue<OfferItemCondition | IdReference, "schema:itemCondition">;
    /** An item being offered (or demanded). The transactional nature of the offer or demand is documented using {@link https://schema.org/businessFunction businessFunction}, e.g. sell, lease etc. While several common expected types are listed explicitly in this definition, others can be used. Using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:itemOffered"?: SchemaValue<AggregateOffer | CreativeWork | Event | MenuItem | Product | Service | Trip | IdReference, "schema:itemOffered">;
    /** Length of the lease for some {@link https://schema.org/Accommodation Accommodation}, either particular to some {@link https://schema.org/Offer Offer} or in some cases intrinsic to the property. */
    "schema:leaseLength"?: SchemaValue<Duration | QuantitativeValue | IdReference, "schema:leaseLength">;
    /** The Manufacturer Part Number (MPN) of the product, or the product to which the offer refers. */
    "schema:mpn"?: SchemaValue<Text, "schema:mpn">;
    /** A pointer to the organization or person making the offer. */
    "schema:offeredBy"?: SchemaValue<Organization | Person | IdReference, "schema:offeredBy">;
    /**
     * The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes.
     *
     * Usage guidelines:
     * - Use the {@link https://schema.org/priceCurrency priceCurrency} property (with standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR") instead of including {@link http://en.wikipedia.org/wiki/Dollar_sign#Currencies_that_use_the_dollar_or_peso_sign ambiguous symbols} such as '$' in the value.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     * - Note that both {@link http://www.w3.org/TR/xhtml-rdfa-primer/#using-the-content-attribute RDFa} and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting.
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     */
    "schema:price"?: SchemaValue<Number | Text, "schema:price">;
    /**
     * The currency of the price, or a price component when attached to {@link https://schema.org/PriceSpecification PriceSpecification} and its subtypes.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:priceCurrency"?: SchemaValue<Text, "schema:priceCurrency">;
    /** One or more detailed price specifications, indicating the unit price and delivery or payment charges. */
    "schema:priceSpecification"?: SchemaValue<PriceSpecification | IdReference, "schema:priceSpecification">;
    /** The date after which the price is no longer available. */
    "schema:priceValidUntil"?: SchemaValue<Date, "schema:priceValidUntil">;
    /** A review of the item. */
    "schema:review"?: SchemaValue<Review | IdReference, "schema:review">;
    /**
     * Review of the item.
     *
     * @deprecated Consider using https://schema.org/review instead.
     */
    "schema:reviews"?: SchemaValue<Review | IdReference, "schema:reviews">;
    /** An entity which offers (sells / leases / lends / loans) the services / goods. A seller may also be a provider. */
    "schema:seller"?: SchemaValue<Organization | Person | IdReference, "schema:seller">;
    /** The serial number or any alphanumeric identifier of a particular product. When attached to an offer, it is a shortcut for the serial number of the product included in the offer. */
    "schema:serialNumber"?: SchemaValue<Text, "schema:serialNumber">;
    /** Indicates information about the shipping policies and options associated with an {@link https://schema.org/Offer Offer}. */
    "schema:shippingDetails"?: SchemaValue<OfferShippingDetails | IdReference, "schema:shippingDetails">;
    /** The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service, or the product to which the offer refers. */
    "schema:sku"?: SchemaValue<Text, "schema:sku">;
    /** The date when the item becomes valid. */
    "schema:validFrom"?: SchemaValue<Date | DateTime, "schema:validFrom">;
    /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
    "schema:validThrough"?: SchemaValue<Date | DateTime, "schema:validThrough">;
    /** The warranty promise(s) included in the offer. */
    "schema:warranty"?: SchemaValue<WarrantyPromise | IdReference, "schema:warranty">;
}
interface OfferLeaf extends OfferBase {
    "@type": "schema:Offer";
}
/**
 * An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book.
 *
 * Note: As the {@link https://schema.org/businessFunction businessFunction} property, which identifies the form of offer (e.g. sell, lease, repair, dispose), defaults to http://purl.org/goodrelations/v1#Sell; an Offer without a defined businessFunction value can be assumed to be an offer to sell.
 *
 * For {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GTIN}-related fields, see {@link http://www.gs1.org/barcodes/support/check_digit_calculator Check Digit calculator} and {@link http://www.gs1us.org/resources/standards/gtin-validation-guide validation guide} from {@link http://www.gs1.org/ GS1}.
 */
export type Offer = OfferLeaf | AggregateOffer | OfferForLease | OfferForPurchase;

interface OfferCatalogLeaf extends ItemListBase {
    "@type": "schema:OfferCatalog";
}
/** An OfferCatalog is an ItemList that contains related Offers and/or further OfferCatalogs that are offeredBy the same provider. */
export type OfferCatalog = OfferCatalogLeaf;

interface OfferForLeaseLeaf extends OfferBase {
    "@type": "schema:OfferForLease";
}
/** An {@link https://schema.org/OfferForLease OfferForLease} in Schema.org represents an {@link https://schema.org/Offer Offer} to lease out something, i.e. an {@link https://schema.org/Offer Offer} whose {@link https://schema.org/businessFunction businessFunction} is {@link http://purl.org/goodrelations/v1#LeaseOut. lease out}. See {@link https://en.wikipedia.org/wiki/GoodRelations Good Relations} for background on the underlying concepts. */
export type OfferForLease = OfferForLeaseLeaf;

interface OfferForPurchaseLeaf extends OfferBase {
    "@type": "schema:OfferForPurchase";
}
/** An {@link https://schema.org/OfferForPurchase OfferForPurchase} in Schema.org represents an {@link https://schema.org/Offer Offer} to sell something, i.e. an {@link https://schema.org/Offer Offer} whose {@link https://schema.org/businessFunction businessFunction} is {@link http://purl.org/goodrelations/v1#Sell. sell}. See {@link https://en.wikipedia.org/wiki/GoodRelations Good Relations} for background on the underlying concepts. */
export type OfferForPurchase = OfferForPurchaseLeaf;

interface OfferItemConditionLeaf extends EnumerationBase {
    "@type": "schema:OfferItemCondition";
}
/** A list of possible conditions for the item. */
export type OfferItemCondition = "https://schema.org/DamagedCondition" | "schema:DamagedCondition" | "https://schema.org/NewCondition" | "schema:NewCondition" | "https://schema.org/RefurbishedCondition" | "schema:RefurbishedCondition" | "https://schema.org/UsedCondition" | "schema:UsedCondition" | OfferItemConditionLeaf;

interface OfferShippingDetailsBase extends ThingBase {
    /** The total delay between the receipt of the order and the goods reaching the final customer. */
    "schema:deliveryTime"?: SchemaValue<ShippingDeliveryTime | IdReference, "schema:deliveryTime">;
    /** Indicates when shipping to a particular {@link https://schema.org/shippingDestination shippingDestination} is not available. */
    "schema:doesNotShip"?: SchemaValue<Boolean, "schema:doesNotShip">;
    /** indicates (possibly multiple) shipping destinations. These can be defined in several ways e.g. postalCode ranges. */
    "schema:shippingDestination"?: SchemaValue<DefinedRegion | IdReference, "schema:shippingDestination">;
    /** Label to match an {@link https://schema.org/OfferShippingDetails OfferShippingDetails} with a {@link https://schema.org/ShippingRateSettings ShippingRateSettings} (within the context of a {@link https://schema.org/shippingSettingsLink shippingSettingsLink} cross-reference). */
    "schema:shippingLabel"?: SchemaValue<Text, "schema:shippingLabel">;
    /** The shipping rate is the cost of shipping to the specified destination. Typically, the maxValue and currency values (of the {@link https://schema.org/MonetaryAmount MonetaryAmount}) are most appropriate. */
    "schema:shippingRate"?: SchemaValue<MonetaryAmount | IdReference, "schema:shippingRate">;
    /** Link to a page containing {@link https://schema.org/ShippingRateSettings ShippingRateSettings} and {@link https://schema.org/DeliveryTimeSettings DeliveryTimeSettings} details. */
    "schema:shippingSettingsLink"?: SchemaValue<URL, "schema:shippingSettingsLink">;
    /** Label to match an {@link https://schema.org/OfferShippingDetails OfferShippingDetails} with a {@link https://schema.org/DeliveryTimeSettings DeliveryTimeSettings} (within the context of a {@link https://schema.org/shippingSettingsLink shippingSettingsLink} cross-reference). */
    "schema:transitTimeLabel"?: SchemaValue<Text, "schema:transitTimeLabel">;
}
interface OfferShippingDetailsLeaf extends OfferShippingDetailsBase {
    "@type": "schema:OfferShippingDetails";
}
/**
 * OfferShippingDetails represents information about shipping destinations.
 *
 * Multiple of these entities can be used to represent different shipping rates for different destinations:
 *
 * One entity for Alaska/Hawaii. A different one for continental US.A different one for all France.
 *
 * Multiple of these entities can be used to represent different shipping costs and delivery times.
 *
 * Two entities that are identical but differ in rate and time:
 *
 * e.g. Cheaper and slower: $5 in 5-7days or Fast and expensive: $15 in 1-2 days.
 */
export type OfferShippingDetails = OfferShippingDetailsLeaf;

interface OfficeEquipmentStoreLeaf extends LocalBusinessBase {
    "@type": "schema:OfficeEquipmentStore";
}
/** An office equipment store. */
export type OfficeEquipmentStore = OfficeEquipmentStoreLeaf | string;

interface OncologicLeaf extends LocalBusinessBase {
    "@type": "schema:Oncologic";
}
/** A specific branch of medical science that deals with benign and malignant tumors, including the study of their development, diagnosis, treatment and prevention. */
export type Oncologic = OncologicLeaf | string;

interface OnDemandEventLeaf extends PublicationEventBase {
    "@type": "schema:OnDemandEvent";
}
/** A publication event e.g. catch-up TV or radio podcast, during which a program is available on-demand. */
export type OnDemandEvent = OnDemandEventLeaf;

interface OpeningHoursSpecificationBase extends ThingBase {
    /** The closing hour of the place or service on the given day(s) of the week. */
    "schema:closes"?: SchemaValue<Time, "schema:closes">;
    /** The day of the week for which these opening hours are valid. */
    "schema:dayOfWeek"?: SchemaValue<DayOfWeek | IdReference, "schema:dayOfWeek">;
    /** The opening hour of the place or service on the given day(s) of the week. */
    "schema:opens"?: SchemaValue<Time, "schema:opens">;
    /** The date when the item becomes valid. */
    "schema:validFrom"?: SchemaValue<Date | DateTime, "schema:validFrom">;
    /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
    "schema:validThrough"?: SchemaValue<Date | DateTime, "schema:validThrough">;
}
interface OpeningHoursSpecificationLeaf extends OpeningHoursSpecificationBase {
    "@type": "schema:OpeningHoursSpecification";
}
/**
 * A structured value providing information about the opening hours of a place or a certain service inside a place.
 *
 * The place is __open__ if the {@link https://schema.org/opens opens} property is specified, and __closed__ otherwise.
 *
 * If the value for the {@link https://schema.org/closes closes} property is less than the value for the {@link https://schema.org/opens opens} property then the hour range is assumed to span over the next day.
 */
export type OpeningHoursSpecification = OpeningHoursSpecificationLeaf;

interface OpeningStateLeaf extends ElementBase {
    "@type": "uxi:OpeningState";
}
/** The opening state is entered when a closed element opens. It enters the open state afterwards. If UI elements are pushed out of the way by the opening animation, a skeleton of the appearing content is useful */
export type OpeningState = OpeningStateLeaf;

interface OpenStateLeaf extends ElementBase {
    "@type": "uxi:OpenState";
}
/** A UI element is in an open state when it can be either closed or open and its detailed content is visible */
export type OpenState = OpenStateLeaf;

interface OpinionNewsArticleLeaf extends NewsArticleBase {
    "@type": "schema:OpinionNewsArticle";
}
/** An {@link https://schema.org/OpinionNewsArticle OpinionNewsArticle} is a {@link https://schema.org/NewsArticle NewsArticle} that primarily expresses opinions rather than journalistic reporting of news and events. For example, a {@link https://schema.org/NewsArticle NewsArticle} consisting of a column or {@link https://schema.org/Blog Blog}/{@link https://schema.org/BlogPosting BlogPosting} entry in the Opinions section of a news publication. */
export type OpinionNewsArticle = OpinionNewsArticleLeaf;

interface OpticianLeaf extends LocalBusinessBase {
    "@type": "schema:Optician";
}
/** A store that sells reading glasses and similar devices for improving vision. */
export type Optician = OpticianLeaf | string;

interface OptometricLeaf extends LocalBusinessBase {
    "@type": "schema:Optometric";
}
/** The science or practice of testing visual acuity and prescribing corrective lenses. */
export type Optometric = OptometricLeaf | string;

interface OrderBase extends ThingBase {
    /** The offer(s) -- e.g., product, quantity and price combinations -- included in the order. */
    "schema:acceptedOffer"?: SchemaValue<Offer | IdReference, "schema:acceptedOffer">;
    /** The billing address for the order. */
    "schema:billingAddress"?: SchemaValue<PostalAddress | IdReference, "schema:billingAddress">;
    /** An entity that arranges for an exchange between a buyer and a seller. In most cases a broker never acquires or releases ownership of a product or service involved in an exchange. If it is not clear whether an entity is a broker, seller, or buyer, the latter two terms are preferred. */
    "schema:broker"?: SchemaValue<Organization | Person | IdReference, "schema:broker">;
    /** A number that confirms the given order or payment has been received. */
    "schema:confirmationNumber"?: SchemaValue<Text, "schema:confirmationNumber">;
    /** Party placing the order or paying the invoice. */
    "schema:customer"?: SchemaValue<Organization | Person | IdReference, "schema:customer">;
    /** Any discount applied (to an Order). */
    "schema:discount"?: SchemaValue<Number | Text, "schema:discount">;
    /** Code used to redeem a discount. */
    "schema:discountCode"?: SchemaValue<Text, "schema:discountCode">;
    /**
     * The currency of the discount.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:discountCurrency"?: SchemaValue<Text, "schema:discountCurrency">;
    /** Was the offer accepted as a gift for someone other than the buyer. */
    "schema:isGift"?: SchemaValue<Boolean, "schema:isGift">;
    /**
     * 'merchant' is an out-dated term for 'seller'.
     *
     * @deprecated Consider using https://schema.org/seller instead.
     */
    "schema:merchant"?: SchemaValue<Organization | Person | IdReference, "schema:merchant">;
    /** Date order was placed. */
    "schema:orderDate"?: SchemaValue<Date | DateTime, "schema:orderDate">;
    /** The delivery of the parcel related to this order or order item. */
    "schema:orderDelivery"?: SchemaValue<ParcelDelivery | IdReference, "schema:orderDelivery">;
    /** The item ordered. */
    "schema:orderedItem"?: SchemaValue<OrderItem | Product | Service | IdReference, "schema:orderedItem">;
    /** The identifier of the transaction. */
    "schema:orderNumber"?: SchemaValue<Text, "schema:orderNumber">;
    /** The current status of the order. */
    "schema:orderStatus"?: SchemaValue<OrderStatus | IdReference, "schema:orderStatus">;
    /** The order is being paid as part of the referenced Invoice. */
    "schema:partOfInvoice"?: SchemaValue<Invoice | IdReference, "schema:partOfInvoice">;
    /**
     * The date that payment is due.
     *
     * @deprecated Consider using https://schema.org/paymentDueDate instead.
     */
    "schema:paymentDue"?: SchemaValue<DateTime, "schema:paymentDue">;
    /** The date that payment is due. */
    "schema:paymentDueDate"?: SchemaValue<Date | DateTime, "schema:paymentDueDate">;
    /** The name of the credit card or other method of payment for the order. */
    "schema:paymentMethod"?: SchemaValue<PaymentMethod | IdReference, "schema:paymentMethod">;
    /** An identifier for the method of payment used (e.g. the last 4 digits of the credit card). */
    "schema:paymentMethodId"?: SchemaValue<Text, "schema:paymentMethodId">;
    /** The URL for sending a payment. */
    "schema:paymentUrl"?: SchemaValue<URL, "schema:paymentUrl">;
    /** An entity which offers (sells / leases / lends / loans) the services / goods. A seller may also be a provider. */
    "schema:seller"?: SchemaValue<Organization | Person | IdReference, "schema:seller">;
}
interface OrderLeaf extends OrderBase {
    "@type": "schema:Order";
}
/** An order is a confirmation of a transaction (a receipt), which can contain multiple line items, each represented by an Offer that has been accepted by the customer. */
export type Order = OrderLeaf;

interface OrderActionBase extends TradeActionBase {
    /** A sub property of instrument. The method of delivery. */
    "schema:deliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:deliveryMethod">;
}
interface OrderActionLeaf extends OrderActionBase {
    "@type": "schema:OrderAction";
}
/** An agent orders an object/product/service to be delivered/sent. */
export type OrderAction = OrderActionLeaf;

interface OrderItemBase extends ThingBase {
    /** The delivery of the parcel related to this order or order item. */
    "schema:orderDelivery"?: SchemaValue<ParcelDelivery | IdReference, "schema:orderDelivery">;
    /** The item ordered. */
    "schema:orderedItem"?: SchemaValue<OrderItem | Product | Service | IdReference, "schema:orderedItem">;
    /** The identifier of the order item. */
    "schema:orderItemNumber"?: SchemaValue<Text, "schema:orderItemNumber">;
    /** The current status of the order item. */
    "schema:orderItemStatus"?: SchemaValue<OrderStatus | IdReference, "schema:orderItemStatus">;
    /** The number of the item ordered. If the property is not set, assume the quantity is one. */
    "schema:orderQuantity"?: SchemaValue<Number, "schema:orderQuantity">;
}
interface OrderItemLeaf extends OrderItemBase {
    "@type": "schema:OrderItem";
}
/** An order item is a line of an order. It includes the quantity and shipping details of a bought offer. */
export type OrderItem = OrderItemLeaf;

interface OrderStatusLeaf extends EnumerationBase {
    "@type": "schema:OrderStatus";
}
/** Enumerated status values for Order. */
export type OrderStatus = "https://schema.org/OrderCancelled" | "schema:OrderCancelled" | "https://schema.org/OrderDelivered" | "schema:OrderDelivered" | "https://schema.org/OrderInTransit" | "schema:OrderInTransit" | "https://schema.org/OrderPaymentDue" | "schema:OrderPaymentDue" | "https://schema.org/OrderPickupAvailable" | "schema:OrderPickupAvailable" | "https://schema.org/OrderProblem" | "schema:OrderProblem" | "https://schema.org/OrderProcessing" | "schema:OrderProcessing" | "https://schema.org/OrderReturned" | "schema:OrderReturned" | OrderStatusLeaf;

interface OrganismUIElementLeaf extends UIElementBase {
    "@type": "uxi:OrganismUIElement";
}
/** An Organism as understood by the Atomic Design Methodology: https://atomicdesign.bradfrost.com */
export type OrganismUIElement = OrganismUIElementLeaf | Card | Footer | Header | Section;

interface OrganizationBase extends ThingBase {
    /** For a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization} or other news-related {@link https://schema.org/Organization Organization}, a statement about public engagement activities (for news media, the newsroom’s), including involving the public - digitally or otherwise -- in coverage decisions, reporting and activities after publication. */
    "schema:actionableFeedbackPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:actionableFeedbackPolicy">;
    /** Physical address of the item. */
    "schema:address"?: SchemaValue<PostalAddress | Text | IdReference, "schema:address">;
    /** The overall rating, based on a collection of reviews or ratings, of the item. */
    "schema:aggregateRating"?: SchemaValue<AggregateRating | IdReference, "schema:aggregateRating">;
    /** Alumni of an organization. */
    "schema:alumni"?: SchemaValue<Person | IdReference, "schema:alumni">;
    /** The geographic area where a service or offered item is provided. */
    "schema:areaServed"?: SchemaValue<AdministrativeArea | GeoShape | Place | Text | IdReference, "schema:areaServed">;
    /** An award won by or for this item. */
    "schema:award"?: SchemaValue<Text, "schema:award">;
    /**
     * Awards won by or for this item.
     *
     * @deprecated Consider using https://schema.org/award instead.
     */
    "schema:awards"?: SchemaValue<Text, "schema:awards">;
    /** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
    "schema:brand"?: SchemaValue<Brand | Organization | IdReference, "schema:brand">;
    /** A contact point for a person or organization. */
    "schema:contactPoint"?: SchemaValue<ContactPoint | IdReference, "schema:contactPoint">;
    /**
     * A contact point for a person or organization.
     *
     * @deprecated Consider using https://schema.org/contactPoint instead.
     */
    "schema:contactPoints"?: SchemaValue<ContactPoint | IdReference, "schema:contactPoints">;
    /** For an {@link https://schema.org/Organization Organization} (e.g. {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}), a statement describing (in news media, the newsroom’s) disclosure and correction policy for errors. */
    "schema:correctionsPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:correctionsPolicy">;
    /** A relationship between an organization and a department of that organization, also described as an organization (allowing different urls, logos, opening hours). For example: a store with a pharmacy, or a bakery with a cafe. */
    "schema:department"?: SchemaValue<Organization | IdReference, "schema:department">;
    /** The date that this organization was dissolved. */
    "schema:dissolutionDate"?: SchemaValue<Date, "schema:dissolutionDate">;
    /** Statement on diversity policy by an {@link https://schema.org/Organization Organization} e.g. a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}. For a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}, a statement describing the newsroom’s diversity policy on both staffing and sources, typically providing staffing data. */
    "schema:diversityPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:diversityPolicy">;
    /** For an {@link https://schema.org/Organization Organization} (often but not necessarily a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}), a report on staffing diversity issues. In a news context this might be for example ASNE or RTDNA (US) reports, or self-reported. */
    "schema:diversityStaffingReport"?: SchemaValue<Article | URL | IdReference, "schema:diversityStaffingReport">;
    /** The Dun & Bradstreet DUNS number for identifying an organization or business person. */
    "schema:duns"?: SchemaValue<Text, "schema:duns">;
    /** Email address. */
    "schema:email"?: SchemaValue<Text, "schema:email">;
    /** Someone working for this organization. */
    "schema:employee"?: SchemaValue<Person | IdReference, "schema:employee">;
    /**
     * People working for this organization.
     *
     * @deprecated Consider using https://schema.org/employee instead.
     */
    "schema:employees"?: SchemaValue<Person | IdReference, "schema:employees">;
    /** Statement about ethics policy, e.g. of a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization} regarding journalistic and publishing practices, or of a {@link https://schema.org/Restaurant Restaurant}, a page describing food source policies. In the case of a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}, an ethicsPolicy is typically a statement describing the personal, organizational, and corporate standards of behavior expected by the organization. */
    "schema:ethicsPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:ethicsPolicy">;
    /** Upcoming or past event associated with this place, organization, or action. */
    "schema:event"?: SchemaValue<Event | IdReference, "schema:event">;
    /**
     * Upcoming or past events associated with this place or organization.
     *
     * @deprecated Consider using https://schema.org/event instead.
     */
    "schema:events"?: SchemaValue<Event | IdReference, "schema:events">;
    /** The fax number. */
    "schema:faxNumber"?: SchemaValue<Text, "schema:faxNumber">;
    /** A person who founded this organization. */
    "schema:founder"?: SchemaValue<Person | IdReference, "schema:founder">;
    /**
     * A person who founded this organization.
     *
     * @deprecated Consider using https://schema.org/founder instead.
     */
    "schema:founders"?: SchemaValue<Person | IdReference, "schema:founders">;
    /** The date that this organization was founded. */
    "schema:foundingDate"?: SchemaValue<Date, "schema:foundingDate">;
    /** The place where the Organization was founded. */
    "schema:foundingLocation"?: SchemaValue<Place | IdReference, "schema:foundingLocation">;
    /** A person or organization that supports (sponsors) something through some kind of financial contribution. */
    "schema:funder"?: SchemaValue<Organization | Person | IdReference, "schema:funder">;
    /** The {@link http://www.gs1.org/gln Global Location Number} (GLN, sometimes also referred to as International Location Number or ILN) of the respective organization, person, or place. The GLN is a 13-digit number used to identify parties and physical locations. */
    "schema:globalLocationNumber"?: SchemaValue<Text, "schema:globalLocationNumber">;
    /** A credential awarded to the Person or Organization. */
    "schema:hasCredential"?: SchemaValue<EducationalOccupationalCredential | IdReference, "schema:hasCredential">;
    /** Specifies a MerchantReturnPolicy that may be applicable. */
    "schema:hasMerchantReturnPolicy"?: SchemaValue<MerchantReturnPolicy | IdReference, "schema:hasMerchantReturnPolicy">;
    /** Indicates an OfferCatalog listing for this Organization, Person, or Service. */
    "schema:hasOfferCatalog"?: SchemaValue<OfferCatalog | IdReference, "schema:hasOfferCatalog">;
    /** Points-of-Sales operated by the organization or person. */
    "schema:hasPOS"?: SchemaValue<Place | IdReference, "schema:hasPOS">;
    /** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. The most specific child type of InteractionCounter should be used. */
    "schema:interactionStatistic"?: SchemaValue<InteractionCounter | IdReference, "schema:interactionStatistic">;
    /** The International Standard of Industrial Classification of All Economic Activities (ISIC), Revision 4 code for a particular organization, business person, or place. */
    "schema:isicV4"?: SchemaValue<Text, "schema:isicV4">;
    /** Of a {@link https://schema.org/Person Person}, and less typically of an {@link https://schema.org/Organization Organization}, to indicate a topic that is known about - suggesting possible expertise but not implying it. We do not distinguish skill levels here, or relate this to educational content, events, objectives or {@link https://schema.org/JobPosting JobPosting} descriptions. */
    "schema:knowsAbout"?: SchemaValue<Text | Thing | URL | IdReference, "schema:knowsAbout">;
    /** Of a {@link https://schema.org/Person Person}, and less typically of an {@link https://schema.org/Organization Organization}, to indicate a known language. We do not distinguish skill levels or reading/writing/speaking/signing here. Use language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. */
    "schema:knowsLanguage"?: SchemaValue<Language | Text | IdReference, "schema:knowsLanguage">;
    /** The official name of the organization, e.g. the registered company name. */
    "schema:legalName"?: SchemaValue<Text, "schema:legalName">;
    /** An organization identifier that uniquely identifies a legal entity as defined in ISO 17442. */
    "schema:leiCode"?: SchemaValue<Text, "schema:leiCode">;
    /** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
    "schema:location"?: SchemaValue<Place | PostalAddress | Text | VirtualLocation | IdReference, "schema:location">;
    /** An associated logo. */
    "schema:logo"?: SchemaValue<ImageObject | URL | IdReference, "schema:logo">;
    /** A pointer to products or services offered by the organization or person. */
    "schema:makesOffer"?: SchemaValue<Offer | IdReference, "schema:makesOffer">;
    /** A member of an Organization or a ProgramMembership. Organizations can be members of organizations; ProgramMembership is typically for individuals. */
    "schema:member"?: SchemaValue<Organization | Person | IdReference, "schema:member">;
    /** An Organization (or ProgramMembership) to which this Person or Organization belongs. */
    "schema:memberOf"?: SchemaValue<Organization | ProgramMembership | IdReference, "schema:memberOf">;
    /**
     * A member of this organization.
     *
     * @deprecated Consider using https://schema.org/member instead.
     */
    "schema:members"?: SchemaValue<Organization | Person | IdReference, "schema:members">;
    /** The North American Industry Classification System (NAICS) code for a particular organization or business person. */
    "schema:naics"?: SchemaValue<Text, "schema:naics">;
    /** nonprofit Status indicates the legal status of a non-profit organization in its primary place of business. */
    "schema:nonprofitStatus"?: SchemaValue<NonprofitType | IdReference, "schema:nonprofitStatus">;
    /** The number of employees in an organization e.g. business. */
    "schema:numberOfEmployees"?: SchemaValue<QuantitativeValue | IdReference, "schema:numberOfEmployees">;
    /** For an {@link https://schema.org/Organization Organization} (often but not necessarily a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}), a description of organizational ownership structure; funding and grants. In a news/media setting, this is with particular reference to editorial independence. Note that the {@link https://schema.org/funder funder} is also available and can be used to make basic funder information machine-readable. */
    "schema:ownershipFundingInfo"?: SchemaValue<AboutPage | CreativeWork | Text | URL | IdReference, "schema:ownershipFundingInfo">;
    /** Products owned by the organization or person. */
    "schema:owns"?: SchemaValue<OwnershipInfo | Product | IdReference, "schema:owns">;
    /** The larger organization that this organization is a {@link https://schema.org/subOrganization subOrganization} of, if any. */
    "schema:parentOrganization"?: SchemaValue<Organization | IdReference, "schema:parentOrganization">;
    /**
     * The publishingPrinciples property indicates (typically via {@link https://schema.org/URL URL}) a document describing the editorial principles of an {@link https://schema.org/Organization Organization} (or individual e.g. a {@link https://schema.org/Person Person} writing a blog) that relate to their activities as a publisher, e.g. ethics or diversity policies. When applied to a {@link https://schema.org/CreativeWork CreativeWork} (e.g. {@link https://schema.org/NewsArticle NewsArticle}) the principles are those of the party primarily responsible for the creation of the {@link https://schema.org/CreativeWork CreativeWork}.
     *
     * While such policies are most typically expressed in natural language, sometimes related information (e.g. indicating a {@link https://schema.org/funder funder}) can be expressed using schema.org terminology.
     */
    "schema:publishingPrinciples"?: SchemaValue<CreativeWork | URL | IdReference, "schema:publishingPrinciples">;
    /** A review of the item. */
    "schema:review"?: SchemaValue<Review | IdReference, "schema:review">;
    /**
     * Review of the item.
     *
     * @deprecated Consider using https://schema.org/review instead.
     */
    "schema:reviews"?: SchemaValue<Review | IdReference, "schema:reviews">;
    /** A pointer to products or services sought by the organization or person (demand). */
    "schema:seeks"?: SchemaValue<Demand | IdReference, "schema:seeks">;
    /**
     * The geographic area where the service is provided.
     *
     * @deprecated Consider using https://schema.org/areaServed instead.
     */
    "schema:serviceArea"?: SchemaValue<AdministrativeArea | GeoShape | Place | IdReference, "schema:serviceArea">;
    /** A slogan or motto associated with the item. */
    "schema:slogan"?: SchemaValue<Text, "schema:slogan">;
    /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
    "schema:sponsor"?: SchemaValue<Organization | Person | IdReference, "schema:sponsor">;
    /** A relationship between two organizations where the first includes the second, e.g., as a subsidiary. See also: the more specific 'department' property. */
    "schema:subOrganization"?: SchemaValue<Organization | IdReference, "schema:subOrganization">;
    /** The Tax / Fiscal ID of the organization or person, e.g. the TIN in the US or the CIF/NIF in Spain. */
    "schema:taxID"?: SchemaValue<Text, "schema:taxID">;
    /** The telephone number. */
    "schema:telephone"?: SchemaValue<Text, "schema:telephone">;
    /** For an {@link https://schema.org/Organization Organization} (typically a {@link https://schema.org/NewsMediaOrganization NewsMediaOrganization}), a statement about policy on use of unnamed sources and the decision process required. */
    "schema:unnamedSourcesPolicy"?: SchemaValue<CreativeWork | URL | IdReference, "schema:unnamedSourcesPolicy">;
    /** The Value-added Tax ID of the organization or person. */
    "schema:vatID"?: SchemaValue<Text, "schema:vatID">;
}
interface OrganizationLeaf extends OrganizationBase {
    "@type": "schema:Organization";
}
/** An organization such as a school, NGO, corporation, club, etc. */
export type Organization = OrganizationLeaf | Airline | Consortium | Corporation | EducationalOrganization | FundingScheme | GovernmentOrganization | LibrarySystem | LocalBusiness | MedicalOrganization | NewsMediaOrganization | NGO | PerformingGroup | Project | ResearchOrganization | SportsOrganization | WorkersUnion | string;

interface OrganizeActionLeaf extends ActionBase {
    "@type": "schema:OrganizeAction";
}
/** The act of manipulating/administering/supervising/controlling one or more objects. */
export type OrganizeAction = OrganizeActionLeaf | AllocateAction | ApplyAction | BookmarkAction | PlanAction;

interface OtolaryngologicLeaf extends LocalBusinessBase {
    "@type": "schema:Otolaryngologic";
}
/** A specific branch of medical science that is concerned with the ear, nose and throat and their respective disease states. */
export type Otolaryngologic = OtolaryngologicLeaf | string;

interface OutletStoreLeaf extends LocalBusinessBase {
    "@type": "schema:OutletStore";
}
/** An outlet store. */
export type OutletStore = OutletStoreLeaf | string;

interface OwnershipInfoBase extends ThingBase {
    /** The organization or person from which the product was acquired. */
    "schema:acquiredFrom"?: SchemaValue<Organization | Person | IdReference, "schema:acquiredFrom">;
    /** The date and time of obtaining the product. */
    "schema:ownedFrom"?: SchemaValue<DateTime, "schema:ownedFrom">;
    /** The date and time of giving up ownership on the product. */
    "schema:ownedThrough"?: SchemaValue<DateTime, "schema:ownedThrough">;
    /** The product that this structured value is referring to. */
    "schema:typeOfGood"?: SchemaValue<Product | Service | IdReference, "schema:typeOfGood">;
}
interface OwnershipInfoLeaf extends OwnershipInfoBase {
    "@type": "schema:OwnershipInfo";
}
/** A structured value providing information about when a certain organization or person owned a certain product. */
export type OwnershipInfo = OwnershipInfoLeaf;

interface PageLeaf extends ElementBase {
    "@type": "uxi:Page";
}
/** A page is a Structural Element that used to describe the data that is found at a single URL. With responsive applications and single-page web apps loading and changing that data is possible. Colloquially, the term is often used to summarize content structure, like Master/Detail-page, or may refer to a number of sub-pages, e.g. if a checkout process is called 'checkout page'. */
export type Page = PageLeaf;

interface PaginationLeaf extends UIElementBase {
    "@type": "uxi:Pagination";
}
/** A Pagination is a type of Molecule UI Element which is used to break down long content into pages, usually on websites. It often features a back-and-forth navigation, the current page number and close page numbers. Pagination can be placed both on top or at the bottom of the paginated content. */
export type Pagination = PaginationLeaf;

interface PaintActionLeaf extends ActionBase {
    "@type": "schema:PaintAction";
}
/** The act of producing a painting, typically with paint and canvas as instruments. */
export type PaintAction = PaintActionLeaf;

interface PaintingLeaf extends CreativeWorkBase {
    "@type": "schema:Painting";
}
/** A painting. */
export type Painting = PaintingLeaf;

interface PalliativeProcedureBase extends MedicalTherapyBase, MedicalProcedureBase {
}
interface PalliativeProcedureLeaf extends PalliativeProcedureBase {
    "@type": "schema:PalliativeProcedure";
}
/** A medical procedure intended primarily for palliative purposes, aimed at relieving the symptoms of an underlying health condition. */
export type PalliativeProcedure = PalliativeProcedureLeaf;

interface ParcelDeliveryBase extends ThingBase {
    /**
     * 'carrier' is an out-dated term indicating the 'provider' for parcel delivery and flights.
     *
     * @deprecated Consider using https://schema.org/provider instead.
     */
    "schema:carrier"?: SchemaValue<Organization | IdReference, "schema:carrier">;
    /** Destination address. */
    "schema:deliveryAddress"?: SchemaValue<PostalAddress | IdReference, "schema:deliveryAddress">;
    /** New entry added as the package passes through each leg of its journey (from shipment to final delivery). */
    "schema:deliveryStatus"?: SchemaValue<DeliveryEvent | IdReference, "schema:deliveryStatus">;
    /** The earliest date the package may arrive. */
    "schema:expectedArrivalFrom"?: SchemaValue<Date | DateTime, "schema:expectedArrivalFrom">;
    /** The latest date the package may arrive. */
    "schema:expectedArrivalUntil"?: SchemaValue<Date | DateTime, "schema:expectedArrivalUntil">;
    /** Method used for delivery or shipping. */
    "schema:hasDeliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:hasDeliveryMethod">;
    /** Item(s) being shipped. */
    "schema:itemShipped"?: SchemaValue<Product | IdReference, "schema:itemShipped">;
    /** Shipper's address. */
    "schema:originAddress"?: SchemaValue<PostalAddress | IdReference, "schema:originAddress">;
    /** The overall order the items in this delivery were included in. */
    "schema:partOfOrder"?: SchemaValue<Order | IdReference, "schema:partOfOrder">;
    /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
    "schema:provider"?: SchemaValue<Organization | Person | IdReference, "schema:provider">;
    /** Shipper tracking number. */
    "schema:trackingNumber"?: SchemaValue<Text, "schema:trackingNumber">;
    /** Tracking url for the parcel delivery. */
    "schema:trackingUrl"?: SchemaValue<URL, "schema:trackingUrl">;
}
interface ParcelDeliveryLeaf extends ParcelDeliveryBase {
    "@type": "schema:ParcelDelivery";
}
/** The delivery of a parcel either via the postal service or a commercial service. */
export type ParcelDelivery = ParcelDeliveryLeaf;

interface ParentAudienceBase extends PeopleAudienceBase {
    /** Maximal age of the child. */
    "schema:childMaxAge"?: SchemaValue<Number, "schema:childMaxAge">;
    /** Minimal age of the child. */
    "schema:childMinAge"?: SchemaValue<Number, "schema:childMinAge">;
}
interface ParentAudienceLeaf extends ParentAudienceBase {
    "@type": "schema:ParentAudience";
}
/** A set of characteristics describing parents, who can be interested in viewing some content. */
export type ParentAudience = ParentAudienceLeaf;

interface ParkLeaf extends CivicStructureBase {
    "@type": "schema:Park";
}
/** A park. */
export type Park = ParkLeaf | string;

interface ParkingFacilityLeaf extends CivicStructureBase {
    "@type": "schema:ParkingFacility";
}
/** A parking lot or other parking facility. */
export type ParkingFacility = ParkingFacilityLeaf | string;

interface PartialStateLeaf extends ElementBase {
    "@type": "uxi:PartialState";
}
/** A UI element is in a partial state when some data is available, but it's not complete. Data can be streaming and appended, or users can manually hit a 'load more' button. Another example would be the 'user is typing' indicator in chat applications */
export type PartialState = PartialStateLeaf;

interface PathologyTestBase extends MedicalTestBase {
    /** The type of tissue sample required for the test. */
    "schema:tissueSample"?: SchemaValue<Text, "schema:tissueSample">;
}
interface PathologyTestLeaf extends PathologyTestBase {
    "@type": "schema:PathologyTest";
}
/** A medical test performed by a laboratory that typically involves examination of a tissue sample by a pathologist. */
export type PathologyTest = PathologyTestLeaf;

interface PatientBase extends PersonBase, MedicalAudienceBase {
    /** One or more alternative conditions considered in the differential diagnosis process as output of a diagnosis process. */
    "schema:diagnosis"?: SchemaValue<MedicalCondition | IdReference, "schema:diagnosis">;
    /** Specifying a drug or medicine used in a medication procedure. */
    "schema:drug"?: SchemaValue<Drug | IdReference, "schema:drug">;
    /** Specifying the health condition(s) of a patient, medical study, or other target audience. */
    "schema:healthCondition"?: SchemaValue<MedicalCondition | IdReference, "schema:healthCondition">;
}
interface PatientLeaf extends PatientBase {
    "@type": "schema:Patient";
}
/** A patient is any person recipient of health care services. */
export type Patient = PatientLeaf | string;

interface PauseActionLeaf extends UIActionBase {
    "@type": "uxi:PauseAction";
}
/** A pause action can be used to halt media playback so that a start action will re-start playback from the point where it was paused. Can also be used to 'pause' a game - and save progress, adjust graphics etc. */
export type PauseAction = PauseActionLeaf;

interface PawnShopLeaf extends LocalBusinessBase {
    "@type": "schema:PawnShop";
}
/** A shop that will buy, or lend money against the security of, personal possessions. */
export type PawnShop = PawnShopLeaf | string;

interface PayActionBase extends TradeActionBase {
    /** A sub property of participant. The participant who is at the receiving end of the action. */
    "schema:recipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:recipient">;
}
interface PayActionLeaf extends PayActionBase {
    "@type": "schema:PayAction";
}
/** An agent pays a price to a participant. */
export type PayAction = PayActionLeaf;

interface PaymentCardBase extends FinancialProductBase, EnumerationBase {
    /** A cardholder benefit that pays the cardholder a small percentage of their net expenditures. */
    "schema:cashBack"?: SchemaValue<Boolean | Number, "schema:cashBack">;
    /** A secure method for consumers to purchase products or services via debit, credit or smartcards by using RFID or NFC technology. */
    "schema:contactlessPayment"?: SchemaValue<Boolean, "schema:contactlessPayment">;
    /** A floor limit is the amount of money above which credit card transactions must be authorized. */
    "schema:floorLimit"?: SchemaValue<MonetaryAmount | IdReference, "schema:floorLimit">;
    /** The minimum payment is the lowest amount of money that one is required to pay on a credit card statement each month. */
    "schema:monthlyMinimumRepaymentAmount"?: SchemaValue<MonetaryAmount | Number | IdReference, "schema:monthlyMinimumRepaymentAmount">;
}
interface PaymentCardLeaf extends PaymentCardBase {
    "@type": "schema:PaymentCard";
}
/** A payment method using a credit, debit, store or other card to associate the payment with an account. */
export type PaymentCard = PaymentCardLeaf | CreditCard;

interface PaymentChargeSpecificationBase extends PriceSpecificationBase {
    /** The delivery method(s) to which the delivery charge or payment charge specification applies. */
    "schema:appliesToDeliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:appliesToDeliveryMethod">;
    /** The payment method(s) to which the payment charge specification applies. */
    "schema:appliesToPaymentMethod"?: SchemaValue<PaymentMethod | IdReference, "schema:appliesToPaymentMethod">;
}
interface PaymentChargeSpecificationLeaf extends PaymentChargeSpecificationBase {
    "@type": "schema:PaymentChargeSpecification";
}
/** The costs of settling the payment using a particular payment method. */
export type PaymentChargeSpecification = PaymentChargeSpecificationLeaf;

interface PaymentMethodLeaf extends EnumerationBase {
    "@type": "schema:PaymentMethod";
}
/**
 * A payment method is a standardized procedure for transferring the monetary amount for a purchase. Payment methods are characterized by the legal and technical structures used, and by the organization or group carrying out the transaction.
 *
 * Commonly used values:
 * - http://purl.org/goodrelations/v1#ByBankTransferInAdvance
 * - http://purl.org/goodrelations/v1#ByInvoice
 * - http://purl.org/goodrelations/v1#Cash
 * - http://purl.org/goodrelations/v1#CheckInAdvance
 * - http://purl.org/goodrelations/v1#COD
 * - http://purl.org/goodrelations/v1#DirectDebit
 * - http://purl.org/goodrelations/v1#GoogleCheckout
 * - http://purl.org/goodrelations/v1#PayPal
 * - http://purl.org/goodrelations/v1#PaySwarm
 */
export type PaymentMethod = PaymentMethodLeaf | PaymentCard;

interface PaymentServiceLeaf extends FinancialProductBase {
    "@type": "schema:PaymentService";
}
/** A Service to transfer funds from a person or organization to a beneficiary person or organization. */
export type PaymentService = PaymentServiceLeaf;

interface PaymentStatusTypeLeaf extends EnumerationBase {
    "@type": "schema:PaymentStatusType";
}
/** A specific payment status. For example, PaymentDue, PaymentComplete, etc. */
export type PaymentStatusType = "https://schema.org/PaymentAutomaticallyApplied" | "schema:PaymentAutomaticallyApplied" | "https://schema.org/PaymentComplete" | "schema:PaymentComplete" | "https://schema.org/PaymentDeclined" | "schema:PaymentDeclined" | "https://schema.org/PaymentDue" | "schema:PaymentDue" | "https://schema.org/PaymentPastDue" | "schema:PaymentPastDue" | PaymentStatusTypeLeaf;

interface PediatricLeaf extends LocalBusinessBase {
    "@type": "schema:Pediatric";
}
/** A specific branch of medical science that specializes in the care of infants, children and adolescents. */
export type Pediatric = PediatricLeaf | string;

interface PeopleAudienceBase extends AudienceBase {
    /** Specifying the health condition(s) of a patient, medical study, or other target audience. */
    "schema:healthCondition"?: SchemaValue<MedicalCondition | IdReference, "schema:healthCondition">;
    /** Audiences defined by a person's gender. */
    "schema:requiredGender"?: SchemaValue<Text, "schema:requiredGender">;
    /** Audiences defined by a person's maximum age. */
    "schema:requiredMaxAge"?: SchemaValue<Integer, "schema:requiredMaxAge">;
    /** Audiences defined by a person's minimum age. */
    "schema:requiredMinAge"?: SchemaValue<Integer, "schema:requiredMinAge">;
    /** The age or age range for the intended audience or person, for example 3-12 months for infants, 1-5 years for toddlers. */
    "schema:suggestedAge"?: SchemaValue<QuantitativeValue | IdReference, "schema:suggestedAge">;
    /** The suggested gender of the intended person or audience, for example "male", "female", or "unisex". */
    "schema:suggestedGender"?: SchemaValue<GenderType | Text | IdReference, "schema:suggestedGender">;
    /** Maximum recommended age in years for the audience or user. */
    "schema:suggestedMaxAge"?: SchemaValue<Number, "schema:suggestedMaxAge">;
    /** A suggested range of body measurements for the intended audience or person, for example inseam between 32 and 34 inches or height between 170 and 190 cm. Typically found on a size chart for wearable products. */
    "schema:suggestedMeasurement"?: SchemaValue<QuantitativeValue | IdReference, "schema:suggestedMeasurement">;
    /** Minimum recommended age in years for the audience or user. */
    "schema:suggestedMinAge"?: SchemaValue<Number, "schema:suggestedMinAge">;
}
interface PeopleAudienceLeaf extends PeopleAudienceBase {
    "@type": "schema:PeopleAudience";
}
/** A set of characteristics belonging to people, e.g. who compose an item's target audience. */
export type PeopleAudience = PeopleAudienceLeaf | MedicalAudience | ParentAudience;

interface PerformActionBase extends PlayActionBase {
    /** A sub property of location. The entertainment business where the action occurred. */
    "schema:entertainmentBusiness"?: SchemaValue<EntertainmentBusiness | IdReference, "schema:entertainmentBusiness">;
}
interface PerformActionLeaf extends PerformActionBase {
    "@type": "schema:PerformAction";
}
/** The act of participating in performance arts. */
export type PerformAction = PerformActionLeaf;

interface PerformingArtsTheaterLeaf extends CivicStructureBase {
    "@type": "schema:PerformingArtsTheater";
}
/** A theater or other performing art center. */
export type PerformingArtsTheater = PerformingArtsTheaterLeaf | string;

interface PerformingGroupLeaf extends OrganizationBase {
    "@type": "schema:PerformingGroup";
}
/** A performance group, such as a band, an orchestra, or a circus. */
export type PerformingGroup = PerformingGroupLeaf | DanceGroup | MusicGroup | TheaterGroup | string;

interface PeriodicalLeaf extends CreativeWorkSeriesBase {
    "@type": "schema:Periodical";
}
/**
 * A publication in any medium issued in successive parts bearing numerical or chronological designations and intended, such as a magazine, scholarly journal, or newspaper to continue indefinitely.
 *
 * See also {@link http://blog.schema.org/2014/09/schemaorg-support-for-bibliographic_2.html blog post}.
 */
export type Periodical = PeriodicalLeaf | ComicSeries | Newspaper;

interface PermitBase extends ThingBase {
    /** The organization issuing the ticket or permit. */
    "schema:issuedBy"?: SchemaValue<Organization | IdReference, "schema:issuedBy">;
    /** The service through with the permit was granted. */
    "schema:issuedThrough"?: SchemaValue<Service | IdReference, "schema:issuedThrough">;
    /** The target audience for this permit. */
    "schema:permitAudience"?: SchemaValue<Audience | IdReference, "schema:permitAudience">;
    /** The duration of validity of a permit or similar thing. */
    "schema:validFor"?: SchemaValue<Duration | IdReference, "schema:validFor">;
    /** The date when the item becomes valid. */
    "schema:validFrom"?: SchemaValue<Date | DateTime, "schema:validFrom">;
    /** The geographic area where a permit or similar thing is valid. */
    "schema:validIn"?: SchemaValue<AdministrativeArea | IdReference, "schema:validIn">;
    /** The date when the item is no longer valid. */
    "schema:validUntil"?: SchemaValue<Date, "schema:validUntil">;
}
interface PermitLeaf extends PermitBase {
    "@type": "schema:Permit";
}
/** A permit issued by an organization, e.g. a parking pass. */
export type Permit = PermitLeaf | GovernmentPermit;

interface PersonBase extends ThingBase {
    /** An additional name for a Person, can be used for a middle name. */
    "schema:additionalName"?: SchemaValue<Text, "schema:additionalName">;
    /** Physical address of the item. */
    "schema:address"?: SchemaValue<PostalAddress | Text | IdReference, "schema:address">;
    /** An organization that this person is affiliated with. For example, a school/university, a club, or a team. */
    "schema:affiliation"?: SchemaValue<Organization | IdReference, "schema:affiliation">;
    /** An organization that the person is an alumni of. */
    "schema:alumniOf"?: SchemaValue<EducationalOrganization | Organization | IdReference, "schema:alumniOf">;
    /** An award won by or for this item. */
    "schema:award"?: SchemaValue<Text, "schema:award">;
    /**
     * Awards won by or for this item.
     *
     * @deprecated Consider using https://schema.org/award instead.
     */
    "schema:awards"?: SchemaValue<Text, "schema:awards">;
    /** Date of birth. */
    "schema:birthDate"?: SchemaValue<Date, "schema:birthDate">;
    /** The place where the person was born. */
    "schema:birthPlace"?: SchemaValue<Place | IdReference, "schema:birthPlace">;
    /** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
    "schema:brand"?: SchemaValue<Brand | Organization | IdReference, "schema:brand">;
    /** A {@link https://en.wikipedia.org/wiki/Call_sign callsign}, as used in broadcasting and radio communications to identify people, radio and TV stations, or vehicles. */
    "schema:callSign"?: SchemaValue<Text, "schema:callSign">;
    /** A child of the person. */
    "schema:children"?: SchemaValue<Person | IdReference, "schema:children">;
    /** A colleague of the person. */
    "schema:colleague"?: SchemaValue<Person | URL | IdReference, "schema:colleague">;
    /**
     * A colleague of the person.
     *
     * @deprecated Consider using https://schema.org/colleague instead.
     */
    "schema:colleagues"?: SchemaValue<Person | IdReference, "schema:colleagues">;
    /** A contact point for a person or organization. */
    "schema:contactPoint"?: SchemaValue<ContactPoint | IdReference, "schema:contactPoint">;
    /**
     * A contact point for a person or organization.
     *
     * @deprecated Consider using https://schema.org/contactPoint instead.
     */
    "schema:contactPoints"?: SchemaValue<ContactPoint | IdReference, "schema:contactPoints">;
    /** Date of death. */
    "schema:deathDate"?: SchemaValue<Date, "schema:deathDate">;
    /** The place where the person died. */
    "schema:deathPlace"?: SchemaValue<Place | IdReference, "schema:deathPlace">;
    /** The Dun & Bradstreet DUNS number for identifying an organization or business person. */
    "schema:duns"?: SchemaValue<Text, "schema:duns">;
    /** Email address. */
    "schema:email"?: SchemaValue<Text, "schema:email">;
    /** Family name. In the U.S., the last name of a Person. */
    "schema:familyName"?: SchemaValue<Text, "schema:familyName">;
    /** The fax number. */
    "schema:faxNumber"?: SchemaValue<Text, "schema:faxNumber">;
    /** The most generic uni-directional social relation. */
    "schema:follows"?: SchemaValue<Person | IdReference, "schema:follows">;
    /** A person or organization that supports (sponsors) something through some kind of financial contribution. */
    "schema:funder"?: SchemaValue<Organization | Person | IdReference, "schema:funder">;
    /** Gender of something, typically a {@link https://schema.org/Person Person}, but possibly also fictional characters, animals, etc. While https://schema.org/Male and https://schema.org/Female may be used, text strings are also acceptable for people who do not identify as a binary gender. The {@link https://schema.org/gender gender} property can also be used in an extended sense to cover e.g. the gender of sports teams. As with the gender of individuals, we do not try to enumerate all possibilities. A mixed-gender {@link https://schema.org/SportsTeam SportsTeam} can be indicated with a text value of "Mixed". */
    "schema:gender"?: SchemaValue<GenderType | Text | IdReference, "schema:gender">;
    /** Given name. In the U.S., the first name of a Person. */
    "schema:givenName"?: SchemaValue<Text, "schema:givenName">;
    /** The {@link http://www.gs1.org/gln Global Location Number} (GLN, sometimes also referred to as International Location Number or ILN) of the respective organization, person, or place. The GLN is a 13-digit number used to identify parties and physical locations. */
    "schema:globalLocationNumber"?: SchemaValue<Text, "schema:globalLocationNumber">;
    /** A credential awarded to the Person or Organization. */
    "schema:hasCredential"?: SchemaValue<EducationalOccupationalCredential | IdReference, "schema:hasCredential">;
    /** The Person's occupation. For past professions, use Role for expressing dates. */
    "schema:hasOccupation"?: SchemaValue<Occupation | IdReference, "schema:hasOccupation">;
    /** Indicates an OfferCatalog listing for this Organization, Person, or Service. */
    "schema:hasOfferCatalog"?: SchemaValue<OfferCatalog | IdReference, "schema:hasOfferCatalog">;
    /** Points-of-Sales operated by the organization or person. */
    "schema:hasPOS"?: SchemaValue<Place | IdReference, "schema:hasPOS">;
    /** The height of the item. */
    "schema:height"?: SchemaValue<Distance | QuantitativeValue | IdReference, "schema:height">;
    /** A contact location for a person's residence. */
    "schema:homeLocation"?: SchemaValue<ContactPoint | Place | IdReference, "schema:homeLocation">;
    /** An honorific prefix preceding a Person's name such as Dr/Mrs/Mr. */
    "schema:honorificPrefix"?: SchemaValue<Text, "schema:honorificPrefix">;
    /** An honorific suffix following a Person's name such as M.D. /PhD/MSCSW. */
    "schema:honorificSuffix"?: SchemaValue<Text, "schema:honorificSuffix">;
    /** The number of interactions for the CreativeWork using the WebSite or SoftwareApplication. The most specific child type of InteractionCounter should be used. */
    "schema:interactionStatistic"?: SchemaValue<InteractionCounter | IdReference, "schema:interactionStatistic">;
    /** The International Standard of Industrial Classification of All Economic Activities (ISIC), Revision 4 code for a particular organization, business person, or place. */
    "schema:isicV4"?: SchemaValue<Text, "schema:isicV4">;
    /** The job title of the person (for example, Financial Manager). */
    "schema:jobTitle"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:jobTitle">;
    /** The most generic bi-directional social/work relation. */
    "schema:knows"?: SchemaValue<Person | IdReference, "schema:knows">;
    /** Of a {@link https://schema.org/Person Person}, and less typically of an {@link https://schema.org/Organization Organization}, to indicate a topic that is known about - suggesting possible expertise but not implying it. We do not distinguish skill levels here, or relate this to educational content, events, objectives or {@link https://schema.org/JobPosting JobPosting} descriptions. */
    "schema:knowsAbout"?: SchemaValue<Text | Thing | URL | IdReference, "schema:knowsAbout">;
    /** Of a {@link https://schema.org/Person Person}, and less typically of an {@link https://schema.org/Organization Organization}, to indicate a known language. We do not distinguish skill levels or reading/writing/speaking/signing here. Use language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. */
    "schema:knowsLanguage"?: SchemaValue<Language | Text | IdReference, "schema:knowsLanguage">;
    /** A pointer to products or services offered by the organization or person. */
    "schema:makesOffer"?: SchemaValue<Offer | IdReference, "schema:makesOffer">;
    /** An Organization (or ProgramMembership) to which this Person or Organization belongs. */
    "schema:memberOf"?: SchemaValue<Organization | ProgramMembership | IdReference, "schema:memberOf">;
    /** The North American Industry Classification System (NAICS) code for a particular organization or business person. */
    "schema:naics"?: SchemaValue<Text, "schema:naics">;
    /** Nationality of the person. */
    "schema:nationality"?: SchemaValue<Country | IdReference, "schema:nationality">;
    /** The total financial value of the person as calculated by subtracting assets from liabilities. */
    "schema:netWorth"?: SchemaValue<MonetaryAmount | PriceSpecification | IdReference, "schema:netWorth">;
    /** Products owned by the organization or person. */
    "schema:owns"?: SchemaValue<OwnershipInfo | Product | IdReference, "schema:owns">;
    /** A parent of this person. */
    "schema:parent"?: SchemaValue<Person | IdReference, "schema:parent">;
    /**
     * A parents of the person.
     *
     * @deprecated Consider using https://schema.org/parent instead.
     */
    "schema:parents"?: SchemaValue<Person | IdReference, "schema:parents">;
    /** Event that this person is a performer or participant in. */
    "schema:performerIn"?: SchemaValue<Event | IdReference, "schema:performerIn">;
    /**
     * The publishingPrinciples property indicates (typically via {@link https://schema.org/URL URL}) a document describing the editorial principles of an {@link https://schema.org/Organization Organization} (or individual e.g. a {@link https://schema.org/Person Person} writing a blog) that relate to their activities as a publisher, e.g. ethics or diversity policies. When applied to a {@link https://schema.org/CreativeWork CreativeWork} (e.g. {@link https://schema.org/NewsArticle NewsArticle}) the principles are those of the party primarily responsible for the creation of the {@link https://schema.org/CreativeWork CreativeWork}.
     *
     * While such policies are most typically expressed in natural language, sometimes related information (e.g. indicating a {@link https://schema.org/funder funder}) can be expressed using schema.org terminology.
     */
    "schema:publishingPrinciples"?: SchemaValue<CreativeWork | URL | IdReference, "schema:publishingPrinciples">;
    /** The most generic familial relation. */
    "schema:relatedTo"?: SchemaValue<Person | IdReference, "schema:relatedTo">;
    /** A pointer to products or services sought by the organization or person (demand). */
    "schema:seeks"?: SchemaValue<Demand | IdReference, "schema:seeks">;
    /** A sibling of the person. */
    "schema:sibling"?: SchemaValue<Person | IdReference, "schema:sibling">;
    /**
     * A sibling of the person.
     *
     * @deprecated Consider using https://schema.org/sibling instead.
     */
    "schema:siblings"?: SchemaValue<Person | IdReference, "schema:siblings">;
    /** A person or organization that supports a thing through a pledge, promise, or financial contribution. e.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
    "schema:sponsor"?: SchemaValue<Organization | Person | IdReference, "schema:sponsor">;
    /** The person's spouse. */
    "schema:spouse"?: SchemaValue<Person | IdReference, "schema:spouse">;
    /** The Tax / Fiscal ID of the organization or person, e.g. the TIN in the US or the CIF/NIF in Spain. */
    "schema:taxID"?: SchemaValue<Text, "schema:taxID">;
    /** The telephone number. */
    "schema:telephone"?: SchemaValue<Text, "schema:telephone">;
    /** The Value-added Tax ID of the organization or person. */
    "schema:vatID"?: SchemaValue<Text, "schema:vatID">;
    /** The weight of the product or person. */
    "schema:weight"?: SchemaValue<QuantitativeValue | IdReference, "schema:weight">;
    /** A contact location for a person's place of work. */
    "schema:workLocation"?: SchemaValue<ContactPoint | Place | IdReference, "schema:workLocation">;
    /** Organizations that the person works for. */
    "schema:worksFor"?: SchemaValue<Organization | IdReference, "schema:worksFor">;
}
interface PersonLeaf extends PersonBase {
    "@type": "schema:Person";
}
/** A person (alive, dead, undead, or fictional). */
export type Person = PersonLeaf | Patient | string;

interface PetStoreLeaf extends LocalBusinessBase {
    "@type": "schema:PetStore";
}
/** A pet store. */
export type PetStore = PetStoreLeaf | string;

interface PharmacyBase extends MedicalOrganizationBase, LocalBusinessBase {
}
interface PharmacyLeaf extends PharmacyBase {
    "@type": "schema:Pharmacy";
}
/** A pharmacy or drugstore. */
export type Pharmacy = PharmacyLeaf | string;

interface PhotographLeaf extends CreativeWorkBase {
    "@type": "schema:Photograph";
}
/** A photograph. */
export type Photograph = PhotographLeaf;

interface PhotographActionLeaf extends ActionBase {
    "@type": "schema:PhotographAction";
}
/** The act of capturing still images of objects using a camera. */
export type PhotographAction = PhotographActionLeaf;

interface PhysicalActivityBase extends MedicalEntityBase {
    /** The anatomy of the underlying organ system or structures associated with this entity. */
    "schema:associatedAnatomy"?: SchemaValue<AnatomicalStructure | AnatomicalSystem | SuperficialAnatomy | IdReference, "schema:associatedAnatomy">;
    /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
    "schema:category"?: SchemaValue<PhysicalActivityCategory | Text | Thing | URL | IdReference, "schema:category">;
    /** The characteristics of associated patients, such as age, gender, race etc. */
    "schema:epidemiology"?: SchemaValue<Text, "schema:epidemiology">;
    /** Changes in the normal mechanical, physical, and biochemical functions that are associated with this activity or condition. */
    "schema:pathophysiology"?: SchemaValue<Text, "schema:pathophysiology">;
}
interface PhysicalActivityLeaf extends PhysicalActivityBase {
    "@type": "schema:PhysicalActivity";
}
/** Any bodily activity that enhances or maintains physical fitness and overall health and wellness. Includes activity that is part of daily living and routine, structured exercise, and exercise prescribed as part of a medical treatment or recovery plan. */
export type PhysicalActivity = PhysicalActivityLeaf | ExercisePlan;

interface PhysicalActivityCategoryLeaf extends EnumerationBase {
    "@type": "schema:PhysicalActivityCategory";
}
/** Categories of physical activity, organized by physiologic classification. */
export type PhysicalActivityCategory = "https://schema.org/AerobicActivity" | "schema:AerobicActivity" | "https://schema.org/AnaerobicActivity" | "schema:AnaerobicActivity" | "https://schema.org/Balance" | "schema:Balance" | "https://schema.org/Flexibility" | "schema:Flexibility" | "https://schema.org/LeisureTimeActivity" | "schema:LeisureTimeActivity" | "https://schema.org/OccupationalActivity" | "schema:OccupationalActivity" | "https://schema.org/StrengthTraining" | "schema:StrengthTraining" | PhysicalActivityCategoryLeaf;

interface PhysicalExamBase extends EnumerationBase, MedicalProcedureBase {
}
interface PhysicalExamLeaf extends PhysicalExamBase {
    "@type": "schema:PhysicalExam";
}
/** A type of physical examination of a patient performed by a physician. */
export type PhysicalExam = "https://schema.org/Abdomen" | "schema:Abdomen" | "https://schema.org/Appearance" | "schema:Appearance" | "https://schema.org/CardiovascularExam" | "schema:CardiovascularExam" | "https://schema.org/Ear" | "schema:Ear" | "https://schema.org/Eye" | "schema:Eye" | "https://schema.org/Genitourinary" | "schema:Genitourinary" | "https://schema.org/Head" | "schema:Head" | "https://schema.org/Lung" | "schema:Lung" | "https://schema.org/MusculoskeletalExam" | "schema:MusculoskeletalExam" | "https://schema.org/Neck" | "schema:Neck" | "https://schema.org/Neuro" | "schema:Neuro" | "https://schema.org/Nose" | "schema:Nose" | "https://schema.org/Skin" | "schema:Skin" | "https://schema.org/Throat" | "schema:Throat" | PhysicalExamLeaf;

interface PhysicalTherapyLeaf extends MedicalTherapyBase {
    "@type": "schema:PhysicalTherapy";
}
/** A process of progressive physical care and rehabilitation aimed at improving a health condition. */
export type PhysicalTherapy = PhysicalTherapyLeaf;

interface PhysicianBase extends MedicalOrganizationBase, LocalBusinessBase {
    /** A medical service available from this provider. */
    "schema:availableService"?: SchemaValue<MedicalProcedure | MedicalTest | MedicalTherapy | IdReference, "schema:availableService">;
    /** A hospital with which the physician or office is affiliated. */
    "schema:hospitalAffiliation"?: SchemaValue<Hospital | IdReference, "schema:hospitalAffiliation">;
    /** A medical specialty of the provider. */
    "schema:medicalSpecialty"?: SchemaValue<MedicalSpecialty | IdReference, "schema:medicalSpecialty">;
}
interface PhysicianLeaf extends PhysicianBase {
    "@type": "schema:Physician";
}
/** A doctor's office. */
export type Physician = PhysicianLeaf | string;

interface PhysiotherapyLeaf extends LocalBusinessBase {
    "@type": "schema:Physiotherapy";
}
/** The practice of treatment of disease, injury, or deformity by physical methods such as massage, heat treatment, and exercise rather than by drugs or surgery.. */
export type Physiotherapy = PhysiotherapyLeaf | string;

interface PlaceBase extends ThingBase {
    /**
     * A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.
     *
     * Note: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
     */
    "schema:additionalProperty"?: SchemaValue<PropertyValue | IdReference, "schema:additionalProperty">;
    /** Physical address of the item. */
    "schema:address"?: SchemaValue<PostalAddress | Text | IdReference, "schema:address">;
    /** The overall rating, based on a collection of reviews or ratings, of the item. */
    "schema:aggregateRating"?: SchemaValue<AggregateRating | IdReference, "schema:aggregateRating">;
    /** An amenity feature (e.g. a characteristic or service) of the Accommodation. This generic property does not make a statement about whether the feature is included in an offer for the main accommodation or available at extra costs. */
    "schema:amenityFeature"?: SchemaValue<LocationFeatureSpecification | IdReference, "schema:amenityFeature">;
    /**
     * A short textual code (also called "store code") that uniquely identifies a place of business. The code is typically assigned by the parentOrganization and used in structured URLs.
     *
     * For example, in the URL http://www.starbucks.co.uk/store-locator/etc/detail/3047 the code "3047" is a branchCode for a particular branch.
     */
    "schema:branchCode"?: SchemaValue<Text, "schema:branchCode">;
    /**
     * The basic containment relation between a place and one that contains it.
     *
     * @deprecated Consider using https://schema.org/containedInPlace instead.
     */
    "schema:containedIn"?: SchemaValue<Place | IdReference, "schema:containedIn">;
    /** The basic containment relation between a place and one that contains it. */
    "schema:containedInPlace"?: SchemaValue<Place | IdReference, "schema:containedInPlace">;
    /** The basic containment relation between a place and another that it contains. */
    "schema:containsPlace"?: SchemaValue<Place | IdReference, "schema:containsPlace">;
    /** Upcoming or past event associated with this place, organization, or action. */
    "schema:event"?: SchemaValue<Event | IdReference, "schema:event">;
    /**
     * Upcoming or past events associated with this place or organization.
     *
     * @deprecated Consider using https://schema.org/event instead.
     */
    "schema:events"?: SchemaValue<Event | IdReference, "schema:events">;
    /** The fax number. */
    "schema:faxNumber"?: SchemaValue<Text, "schema:faxNumber">;
    /** The geo coordinates of the place. */
    "schema:geo"?: SchemaValue<GeoCoordinates | GeoShape | IdReference, "schema:geo">;
    /** Represents a relationship between two geometries (or the places they represent), relating a containing geometry to a contained geometry. "a contains b iff no points of b lie in the exterior of a, and at least one point of the interior of b lies in the interior of a". As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoContains"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoContains">;
    /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that covers it. As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoCoveredBy"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoCoveredBy">;
    /** Represents a relationship between two geometries (or the places they represent), relating a covering geometry to a covered geometry. "Every point of b is a point of (the interior or boundary of) a". As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoCovers"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoCovers">;
    /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that crosses it: "a crosses b: they have some but not all interior points in common, and the dimension of the intersection is less than that of at least one of them". As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoCrosses"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoCrosses">;
    /** Represents spatial relations in which two geometries (or the places they represent) are topologically disjoint: they have no point in common. They form a set of disconnected geometries." (a symmetric relationship, as defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}) */
    "schema:geoDisjoint"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoDisjoint">;
    /** Represents spatial relations in which two geometries (or the places they represent) are topologically equal, as defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. "Two geometries are topologically equal if their interiors intersect and no part of the interior or boundary of one geometry intersects the exterior of the other" (a symmetric relationship) */
    "schema:geoEquals"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoEquals">;
    /** Represents spatial relations in which two geometries (or the places they represent) have at least one point in common. As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoIntersects"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoIntersects">;
    /** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that geospatially overlaps it, i.e. they have some but not all points in common. As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoOverlaps"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoOverlaps">;
    /** Represents spatial relations in which two geometries (or the places they represent) touch: they have at least one boundary point in common, but no interior points." (a symmetric relationship, as defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM} ) */
    "schema:geoTouches"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoTouches">;
    /** Represents a relationship between two geometries (or the places they represent), relating a geometry to one that contains it, i.e. it is inside (i.e. within) its interior. As defined in {@link https://en.wikipedia.org/wiki/DE-9IM DE-9IM}. */
    "schema:geoWithin"?: SchemaValue<GeospatialGeometry | Place | IdReference, "schema:geoWithin">;
    /** The {@link http://www.gs1.org/gln Global Location Number} (GLN, sometimes also referred to as International Location Number or ILN) of the respective organization, person, or place. The GLN is a 13-digit number used to identify parties and physical locations. */
    "schema:globalLocationNumber"?: SchemaValue<Text, "schema:globalLocationNumber">;
    /** Indicates whether some facility (e.g. {@link https://schema.org/FoodEstablishment FoodEstablishment}, {@link https://schema.org/CovidTestingFacility CovidTestingFacility}) offers a service that can be used by driving through in a car. In the case of {@link https://schema.org/CovidTestingFacility CovidTestingFacility} such facilities could potentially help with social distancing from other potentially-infected users. */
    "schema:hasDriveThroughService"?: SchemaValue<Boolean, "schema:hasDriveThroughService">;
    /** A URL to a map of the place. */
    "schema:hasMap"?: SchemaValue<Map | URL | IdReference, "schema:hasMap">;
    /** A flag to signal that the item, event, or place is accessible for free. */
    "schema:isAccessibleForFree"?: SchemaValue<Boolean, "schema:isAccessibleForFree">;
    /** The International Standard of Industrial Classification of All Economic Activities (ISIC), Revision 4 code for a particular organization, business person, or place. */
    "schema:isicV4"?: SchemaValue<Text, "schema:isicV4">;
    /** The latitude of a location. For example `37.42242` ({@link https://en.wikipedia.org/wiki/World_Geodetic_System WGS 84}). */
    "schema:latitude"?: SchemaValue<Number | Text, "schema:latitude">;
    /** An associated logo. */
    "schema:logo"?: SchemaValue<ImageObject | URL | IdReference, "schema:logo">;
    /** The longitude of a location. For example `-122.08585` ({@link https://en.wikipedia.org/wiki/World_Geodetic_System WGS 84}). */
    "schema:longitude"?: SchemaValue<Number | Text, "schema:longitude">;
    /**
     * A URL to a map of the place.
     *
     * @deprecated Consider using https://schema.org/hasMap instead.
     */
    "schema:map"?: SchemaValue<URL, "schema:map">;
    /**
     * A URL to a map of the place.
     *
     * @deprecated Consider using https://schema.org/hasMap instead.
     */
    "schema:maps"?: SchemaValue<URL, "schema:maps">;
    /** The total number of individuals that may attend an event or venue. */
    "schema:maximumAttendeeCapacity"?: SchemaValue<Integer, "schema:maximumAttendeeCapacity">;
    /** The opening hours of a certain place. */
    "schema:openingHoursSpecification"?: SchemaValue<OpeningHoursSpecification | IdReference, "schema:openingHoursSpecification">;
    /** A photograph of this place. */
    "schema:photo"?: SchemaValue<ImageObject | Photograph | IdReference, "schema:photo">;
    /**
     * Photographs of this place.
     *
     * @deprecated Consider using https://schema.org/photo instead.
     */
    "schema:photos"?: SchemaValue<ImageObject | Photograph | IdReference, "schema:photos">;
    /** A flag to signal that the {@link https://schema.org/Place Place} is open to public visitors. If this property is omitted there is no assumed default boolean value */
    "schema:publicAccess"?: SchemaValue<Boolean, "schema:publicAccess">;
    /** A review of the item. */
    "schema:review"?: SchemaValue<Review | IdReference, "schema:review">;
    /**
     * Review of the item.
     *
     * @deprecated Consider using https://schema.org/review instead.
     */
    "schema:reviews"?: SchemaValue<Review | IdReference, "schema:reviews">;
    /** A slogan or motto associated with the item. */
    "schema:slogan"?: SchemaValue<Text, "schema:slogan">;
    /** Indicates whether it is allowed to smoke in the place, e.g. in the restaurant, hotel or hotel room. */
    "schema:smokingAllowed"?: SchemaValue<Boolean, "schema:smokingAllowed">;
    /**
     * The special opening hours of a certain place.
     *
     * Use this to explicitly override general opening hours brought in scope by {@link https://schema.org/openingHoursSpecification openingHoursSpecification} or {@link https://schema.org/openingHours openingHours}.
     */
    "schema:specialOpeningHoursSpecification"?: SchemaValue<OpeningHoursSpecification | IdReference, "schema:specialOpeningHoursSpecification">;
    /** The telephone number. */
    "schema:telephone"?: SchemaValue<Text, "schema:telephone">;
    /** A page providing information on how to book a tour of some {@link https://schema.org/Place Place}, such as an {@link https://schema.org/Accommodation Accommodation} or {@link https://schema.org/ApartmentComplex ApartmentComplex} in a real estate setting, as well as other kinds of tours as appropriate. */
    "schema:tourBookingPage"?: SchemaValue<URL, "schema:tourBookingPage">;
}
interface PlaceLeaf extends PlaceBase {
    "@type": "schema:Place";
}
/** Entities that have a somewhat fixed, physical extension. */
export type Place = PlaceLeaf | Accommodation | AdministrativeArea | CivicStructure | Landform | LandmarksOrHistoricalBuildings | LocalBusiness | Residence | TouristAttraction | TouristDestination | string;

interface PlaceholderLeaf extends ElementBase {
    "@type": "uxi:Placeholder";
}
/** A Placeholder is a Structural Element that is displayed in the position of the 'actual' content. A UI Element in the skeleton state is one example, another example would be placeholder text that shows 'Jane Doe' in an input field for user name. */
export type Placeholder = PlaceholderLeaf;

interface PlaceOfWorshipLeaf extends CivicStructureBase {
    "@type": "schema:PlaceOfWorship";
}
/** Place of worship, such as a church, synagogue, or mosque. */
export type PlaceOfWorship = PlaceOfWorshipLeaf | BuddhistTemple | Church | HinduTemple | Mosque | Synagogue | string;

interface PlanActionBase extends ActionBase {
    /** The time the object is scheduled to. */
    "schema:scheduledTime"?: SchemaValue<DateTime, "schema:scheduledTime">;
}
interface PlanActionLeaf extends PlanActionBase {
    "@type": "schema:PlanAction";
}
/** The act of planning the execution of an event/task/action/reservation/plan to a future date. */
export type PlanAction = PlanActionLeaf | CancelAction | ReserveAction | ScheduleAction;

interface PlasticSurgeryLeaf extends LocalBusinessBase {
    "@type": "schema:PlasticSurgery";
}
/** A specific branch of medical science that pertains to therapeutic or cosmetic repair or re-formation of missing, injured or malformed tissues or body parts by manual and instrumental means. */
export type PlasticSurgery = PlasticSurgeryLeaf | string;

interface PlayLeaf extends CreativeWorkBase {
    "@type": "schema:Play";
}
/** A play is a form of literature, usually consisting of dialogue between characters, intended for theatrical performance rather than just reading. Note: A performance of a Play would be a {@link https://schema.org/TheaterEvent TheaterEvent} or {@link https://schema.org/BroadcastEvent BroadcastEvent} - the _Play_ being the {@link https://schema.org/workPerformed workPerformed}. */
export type Play = PlayLeaf;

interface PlayActionBase extends ActionBase {
    /** An intended audience, i.e. a group for whom something was created. */
    "schema:audience"?: SchemaValue<Audience | IdReference, "schema:audience">;
    /** Upcoming or past event associated with this place, organization, or action. */
    "schema:event"?: SchemaValue<Event | IdReference, "schema:event">;
}
interface PlayActionLeaf extends PlayActionBase {
    "@type": "schema:PlayAction";
}
/**
 * The act of playing/exercising/training/performing for enjoyment, leisure, recreation, Competition or exercise.
 *
 * Related actions:
 * - {@link https://schema.org/ListenAction ListenAction}: Unlike ListenAction (which is under ConsumeAction), PlayAction refers to performing for an audience or at an event, rather than consuming music.
 * - {@link https://schema.org/WatchAction WatchAction}: Unlike WatchAction (which is under ConsumeAction), PlayAction refers to showing/displaying for an audience or at an event, rather than consuming visual content.
 */
export type PlayAction = PlayActionLeaf | ExerciseAction | PerformAction;

interface PlaygroundLeaf extends CivicStructureBase {
    "@type": "schema:Playground";
}
/** A playground. */
export type Playground = PlaygroundLeaf | string;

interface PlumberLeaf extends LocalBusinessBase {
    "@type": "schema:Plumber";
}
/** A plumbing service. */
export type Plumber = PlumberLeaf | string;

interface PodcastEpisodeLeaf extends EpisodeBase {
    "@type": "schema:PodcastEpisode";
}
/** A single episode of a podcast series. */
export type PodcastEpisode = PodcastEpisodeLeaf;

interface PodcastSeasonLeaf extends CreativeWorkSeasonBase {
    "@type": "schema:PodcastSeason";
}
/** A single season of a podcast. Many podcasts do not break down into separate seasons. In that case, PodcastSeries should be used. */
export type PodcastSeason = PodcastSeasonLeaf;

interface PodcastSeriesBase extends CreativeWorkSeriesBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /** The URL for a feed, e.g. associated with a podcast series, blog, or series of date-stamped updates. This is usually RSS or Atom. */
    "schema:webFeed"?: SchemaValue<DataFeed | URL | IdReference, "schema:webFeed">;
}
interface PodcastSeriesLeaf extends PodcastSeriesBase {
    "@type": "schema:PodcastSeries";
}
/** A podcast is an episodic series of digital audio or video files which a user can download and listen to. */
export type PodcastSeries = PodcastSeriesLeaf;

interface PodiatricLeaf extends LocalBusinessBase {
    "@type": "schema:Podiatric";
}
/** Podiatry is the care of the human foot, especially the diagnosis and treatment of foot disorders. */
export type Podiatric = PodiatricLeaf | string;

interface PointActionLeaf extends UIActionBase {
    "@type": "uxi:PointAction";
}
/** A point action can be done by moving the mouse, moving or hovering the finger over a touch screen, and other physical devices that detect a user's hand movement, e.g. game controllers */
export type PointAction = PointActionLeaf;

interface PoliceStationBase extends CivicStructureBase, LocalBusinessBase {
}
interface PoliceStationLeaf extends PoliceStationBase {
    "@type": "schema:PoliceStation";
}
/** A police station. */
export type PoliceStation = PoliceStationLeaf | string;

interface PondLeaf extends PlaceBase {
    "@type": "schema:Pond";
}
/** A pond. */
export type Pond = PondLeaf | string;

interface PostalAddressBase extends ContactPointBase {
    /** The country. For example, USA. You can also provide the two-letter {@link http://en.wikipedia.org/wiki/ISO_3166-1 ISO 3166-1 alpha-2 country code}. */
    "schema:addressCountry"?: SchemaValue<Country | Text | IdReference, "schema:addressCountry">;
    /** The locality in which the street address is, and which is in the region. For example, Mountain View. */
    "schema:addressLocality"?: SchemaValue<Text, "schema:addressLocality">;
    /** The region in which the locality is, and which is in the country. For example, California or another appropriate first-level {@link https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country Administrative division} */
    "schema:addressRegion"?: SchemaValue<Text, "schema:addressRegion">;
    /** The postal code. For example, 94043. */
    "schema:postalCode"?: SchemaValue<Text, "schema:postalCode">;
    /** The post office box number for PO box addresses. */
    "schema:postOfficeBoxNumber"?: SchemaValue<Text, "schema:postOfficeBoxNumber">;
    /** The street address. For example, 1600 Amphitheatre Pkwy. */
    "schema:streetAddress"?: SchemaValue<Text, "schema:streetAddress">;
}
interface PostalAddressLeaf extends PostalAddressBase {
    "@type": "schema:PostalAddress";
}
/** The mailing address. */
export type PostalAddress = PostalAddressLeaf;

interface PostalCodeRangeSpecificationBase extends ThingBase {
    /** First postal code in a range (included). */
    "schema:postalCodeBegin"?: SchemaValue<Text, "schema:postalCodeBegin">;
    /** Last postal code in the range (included). Needs to be after {@link https://schema.org/postalCodeBegin postalCodeBegin}. */
    "schema:postalCodeEnd"?: SchemaValue<Text, "schema:postalCodeEnd">;
}
interface PostalCodeRangeSpecificationLeaf extends PostalCodeRangeSpecificationBase {
    "@type": "schema:PostalCodeRangeSpecification";
}
/** Indicates a range of postalcodes, usually defined as the set of valid codes between {@link https://schema.org/postalCodeBegin postalCodeBegin} and {@link https://schema.org/postalCodeEnd postalCodeEnd}, inclusively. */
export type PostalCodeRangeSpecification = PostalCodeRangeSpecificationLeaf;

interface PosterLeaf extends CreativeWorkBase {
    "@type": "schema:Poster";
}
/** A large, usually printed placard, bill, or announcement, often illustrated, that is posted to advertise or publicize something. */
export type Poster = PosterLeaf;

interface PostOfficeLeaf extends LocalBusinessBase {
    "@type": "schema:PostOffice";
}
/** A post office. */
export type PostOffice = PostOfficeLeaf | string;

interface PreOrderActionLeaf extends TradeActionBase {
    "@type": "schema:PreOrderAction";
}
/** An agent orders a (not yet released) object/product/service to be delivered/sent. */
export type PreOrderAction = PreOrderActionLeaf;

interface PrependActionLeaf extends InsertActionBase {
    "@type": "schema:PrependAction";
}
/** The act of inserting at the beginning if an ordered collection. */
export type PrependAction = PrependActionLeaf;

interface PreschoolLeaf extends EducationalOrganizationBase {
    "@type": "schema:Preschool";
}
/** A preschool. */
export type Preschool = PreschoolLeaf | string;

interface PresentationDigitalDocumentLeaf extends DigitalDocumentBase {
    "@type": "schema:PresentationDigitalDocument";
}
/** A file containing slides or used for a presentation. */
export type PresentationDigitalDocument = PresentationDigitalDocumentLeaf;

interface PressedStateLeaf extends ElementBase {
    "@type": "uxi:PressedState";
}
/** When the user presses an interactive element, it enters the pressed state. Different from clicking, which is pressing and releasing */
export type PressedState = PressedStateLeaf;

interface PreventionIndicationLeaf extends MedicalEntityBase {
    "@type": "schema:PreventionIndication";
}
/** An indication for preventing an underlying condition, symptom, etc. */
export type PreventionIndication = PreventionIndicationLeaf;

interface PriceComponentTypeEnumerationLeaf extends EnumerationBase {
    "@type": "schema:PriceComponentTypeEnumeration";
}
/** Enumerates different price components that together make up the total price for an offered product. */
export type PriceComponentTypeEnumeration = "https://schema.org/ActivationFee" | "schema:ActivationFee" | "https://schema.org/CleaningFee" | "schema:CleaningFee" | "https://schema.org/DistanceFee" | "schema:DistanceFee" | "https://schema.org/Downpayment" | "schema:Downpayment" | "https://schema.org/Installment" | "schema:Installment" | "https://schema.org/Subscription" | "schema:Subscription" | PriceComponentTypeEnumerationLeaf;

interface PriceSpecificationBase extends ThingBase {
    /** The interval and unit of measurement of ordering quantities for which the offer or price specification is valid. This allows e.g. specifying that a certain freight charge is valid only for a certain quantity. */
    "schema:eligibleQuantity"?: SchemaValue<QuantitativeValue | IdReference, "schema:eligibleQuantity">;
    /** The transaction volume, in a monetary unit, for which the offer or price specification is valid, e.g. for indicating a minimal purchasing volume, to express free shipping above a certain order volume, or to limit the acceptance of credit cards to purchases to a certain minimal amount. */
    "schema:eligibleTransactionVolume"?: SchemaValue<PriceSpecification | IdReference, "schema:eligibleTransactionVolume">;
    /** The highest price if the price is a range. */
    "schema:maxPrice"?: SchemaValue<Number, "schema:maxPrice">;
    /** The lowest price if the price is a range. */
    "schema:minPrice"?: SchemaValue<Number, "schema:minPrice">;
    /**
     * The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes.
     *
     * Usage guidelines:
     * - Use the {@link https://schema.org/priceCurrency priceCurrency} property (with standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR") instead of including {@link http://en.wikipedia.org/wiki/Dollar_sign#Currencies_that_use_the_dollar_or_peso_sign ambiguous symbols} such as '$' in the value.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     * - Note that both {@link http://www.w3.org/TR/xhtml-rdfa-primer/#using-the-content-attribute RDFa} and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting.
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     */
    "schema:price"?: SchemaValue<Number | Text, "schema:price">;
    /**
     * The currency of the price, or a price component when attached to {@link https://schema.org/PriceSpecification PriceSpecification} and its subtypes.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:priceCurrency"?: SchemaValue<Text, "schema:priceCurrency">;
    /** The date when the item becomes valid. */
    "schema:validFrom"?: SchemaValue<Date | DateTime, "schema:validFrom">;
    /** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
    "schema:validThrough"?: SchemaValue<Date | DateTime, "schema:validThrough">;
    /** Specifies whether the applicable value-added tax (VAT) is included in the price specification or not. */
    "schema:valueAddedTaxIncluded"?: SchemaValue<Boolean, "schema:valueAddedTaxIncluded">;
}
interface PriceSpecificationLeaf extends PriceSpecificationBase {
    "@type": "schema:PriceSpecification";
}
/** A structured value representing a price or price range. Typically, only the subclasses of this type are used for markup. It is recommended to use {@link https://schema.org/MonetaryAmount MonetaryAmount} to describe independent amounts of money such as a salary, credit card limits, etc. */
export type PriceSpecification = PriceSpecificationLeaf | CompoundPriceSpecification | DeliveryChargeSpecification | PaymentChargeSpecification | UnitPriceSpecification;

interface PriceTypeEnumerationLeaf extends EnumerationBase {
    "@type": "schema:PriceTypeEnumeration";
}
/** Enumerates different price types, for example list price, invoice price, and sale price. */
export type PriceTypeEnumeration = "https://schema.org/InvoicePrice" | "schema:InvoicePrice" | "https://schema.org/ListPrice" | "schema:ListPrice" | "https://schema.org/MinimumAdvertisedPrice" | "schema:MinimumAdvertisedPrice" | "https://schema.org/MSRP" | "schema:MSRP" | "https://schema.org/SalePrice" | "schema:SalePrice" | "https://schema.org/SRP" | "schema:SRP" | PriceTypeEnumerationLeaf;

interface PrimaryCareLeaf extends LocalBusinessBase {
    "@type": "schema:PrimaryCare";
}
/** The medical care by a physician, or other health-care professional, who is the patient's first contact with the health-care system and who may recommend a specialist if necessary. */
export type PrimaryCare = PrimaryCareLeaf | string;

interface ProductBase extends ThingBase {
    /**
     * A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.
     *
     * Note: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
     */
    "schema:additionalProperty"?: SchemaValue<PropertyValue | IdReference, "schema:additionalProperty">;
    /** The overall rating, based on a collection of reviews or ratings, of the item. */
    "schema:aggregateRating"?: SchemaValue<AggregateRating | IdReference, "schema:aggregateRating">;
    /** An intended audience, i.e. a group for whom something was created. */
    "schema:audience"?: SchemaValue<Audience | IdReference, "schema:audience">;
    /** An award won by or for this item. */
    "schema:award"?: SchemaValue<Text, "schema:award">;
    /**
     * Awards won by or for this item.
     *
     * @deprecated Consider using https://schema.org/award instead.
     */
    "schema:awards"?: SchemaValue<Text, "schema:awards">;
    /** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
    "schema:brand"?: SchemaValue<Brand | Organization | IdReference, "schema:brand">;
    /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
    "schema:category"?: SchemaValue<PhysicalActivityCategory | Text | Thing | URL | IdReference, "schema:category">;
    /** The color of the product. */
    "schema:color"?: SchemaValue<Text, "schema:color">;
    /** The place where the product was assembled. */
    "schema:countryOfAssembly"?: SchemaValue<Text, "schema:countryOfAssembly">;
    /** The place where the item (typically {@link https://schema.org/Product Product}) was last processed and tested before importation. */
    "schema:countryOfLastProcessing"?: SchemaValue<Text, "schema:countryOfLastProcessing">;
    /**
     * The country of origin of something, including products as well as creative works such as movie and TV content.
     *
     * In the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of {@link https://schema.org/CreativeWork CreativeWork} it is difficult to provide fully general guidance, and properties such as {@link https://schema.org/contentLocation contentLocation} and {@link https://schema.org/locationCreated locationCreated} may be more applicable.
     *
     * In the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot be fully enumerated here.
     */
    "schema:countryOfOrigin"?: SchemaValue<Country | IdReference, "schema:countryOfOrigin">;
    /** The depth of the item. */
    "schema:depth"?: SchemaValue<Distance | QuantitativeValue | IdReference, "schema:depth">;
    /** A Global Trade Item Number ({@link https://www.gs1.org/standards/id-keys/gtin GTIN}). GTINs identify trade items, including products and services, using numeric identification codes. The {@link https://schema.org/gtin gtin} property generalizes the earlier {@link https://schema.org/gtin8 gtin8}, {@link https://schema.org/gtin12 gtin12}, {@link https://schema.org/gtin13 gtin13}, and {@link https://schema.org/gtin14 gtin14} properties. The GS1 {@link https://www.gs1.org/standards/Digital-Link/ digital link specifications} express GTINs as URLs. A correct {@link https://schema.org/gtin gtin} value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a {@link https://www.gs1.org/services/check-digit-calculator valid GS1 check digit} and meet the other rules for valid GTINs. See also {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1's GTIN Summary} and {@link https://en.wikipedia.org/wiki/Global_Trade_Item_Number Wikipedia} for more details. Left-padding of the gtin values is not required or encouraged. */
    "schema:gtin"?: SchemaValue<Text, "schema:gtin">;
    /** The GTIN-12 code of the product, or the product to which the offer refers. The GTIN-12 is the 12-digit GS1 Identification Key composed of a U.P.C. Company Prefix, Item Reference, and Check Digit used to identify trade items. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin12"?: SchemaValue<Text, "schema:gtin12">;
    /** The GTIN-13 code of the product, or the product to which the offer refers. This is equivalent to 13-digit ISBN codes and EAN UCC-13. Former 12-digit UPC codes can be converted into a GTIN-13 code by simply adding a preceding zero. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin13"?: SchemaValue<Text, "schema:gtin13">;
    /** The GTIN-14 code of the product, or the product to which the offer refers. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin14"?: SchemaValue<Text, "schema:gtin14">;
    /** The GTIN-8 code of the product, or the product to which the offer refers. This code is also known as EAN/UCC-8 or 8-digit EAN. See {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary} for more details. */
    "schema:gtin8"?: SchemaValue<Text, "schema:gtin8">;
    /** Defines the energy efficiency Category (also known as "class" or "rating") for a product according to an international energy efficiency standard. */
    "schema:hasEnergyConsumptionDetails"?: SchemaValue<EnergyConsumptionDetails | IdReference, "schema:hasEnergyConsumptionDetails">;
    /** A product measurement, for example the inseam of pants, the wheel size of a bicycle, or the gauge of a screw. Usually an exact measurement, but can also be a range of measurements for adjustable products, for example belts and ski bindings. */
    "schema:hasMeasurement"?: SchemaValue<QuantitativeValue | IdReference, "schema:hasMeasurement">;
    /** Specifies a MerchantReturnPolicy that may be applicable. */
    "schema:hasMerchantReturnPolicy"?: SchemaValue<MerchantReturnPolicy | IdReference, "schema:hasMerchantReturnPolicy">;
    /** The height of the item. */
    "schema:height"?: SchemaValue<Distance | QuantitativeValue | IdReference, "schema:height">;
    /** Indicates the {@link https://schema.org/productGroupID productGroupID} for a {@link https://schema.org/ProductGroup ProductGroup} that this product {@link https://schema.org/isVariantOf isVariantOf}. */
    "schema:inProductGroupWithID"?: SchemaValue<Text, "schema:inProductGroupWithID">;
    /** A pointer to another product (or multiple products) for which this product is an accessory or spare part. */
    "schema:isAccessoryOrSparePartFor"?: SchemaValue<Product | IdReference, "schema:isAccessoryOrSparePartFor">;
    /** A pointer to another product (or multiple products) for which this product is a consumable. */
    "schema:isConsumableFor"?: SchemaValue<Product | IdReference, "schema:isConsumableFor">;
    /** A pointer to another, somehow related product (or multiple products). */
    "schema:isRelatedTo"?: SchemaValue<Product | Service | IdReference, "schema:isRelatedTo">;
    /** A pointer to another, functionally similar product (or multiple products). */
    "schema:isSimilarTo"?: SchemaValue<Product | Service | IdReference, "schema:isSimilarTo">;
    /** Indicates the kind of product that this is a variant of. In the case of {@link https://schema.org/ProductModel ProductModel}, this is a pointer (from a ProductModel) to a base product from which this product is a variant. It is safe to infer that the variant inherits all product features from the base model, unless defined locally. This is not transitive. In the case of a {@link https://schema.org/ProductGroup ProductGroup}, the group description also serves as a template, representing a set of Products that vary on explicitly defined, specific dimensions only (so it defines both a set of variants, as well as which values distinguish amongst those variants). When used with {@link https://schema.org/ProductGroup ProductGroup}, this property can apply to any {@link https://schema.org/Product Product} included in the group. */
    "schema:isVariantOf"?: SchemaValue<ProductGroup | ProductModel | IdReference, "schema:isVariantOf">;
    /** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
    "schema:itemCondition"?: SchemaValue<OfferItemCondition | IdReference, "schema:itemCondition">;
    /** An associated logo. */
    "schema:logo"?: SchemaValue<ImageObject | URL | IdReference, "schema:logo">;
    /** The manufacturer of the product. */
    "schema:manufacturer"?: SchemaValue<Organization | IdReference, "schema:manufacturer">;
    /** A material that something is made from, e.g. leather, wool, cotton, paper. */
    "schema:material"?: SchemaValue<Product | Text | URL | IdReference, "schema:material">;
    /** The model of the product. Use with the URL of a ProductModel or a textual representation of the model identifier. The URL of the ProductModel can be from an external source. It is recommended to additionally provide strong product identifiers via the gtin8/gtin13/gtin14 and mpn properties. */
    "schema:model"?: SchemaValue<ProductModel | Text | IdReference, "schema:model">;
    /** The Manufacturer Part Number (MPN) of the product, or the product to which the offer refers. */
    "schema:mpn"?: SchemaValue<Text, "schema:mpn">;
    /** Indicates the {@link https://en.wikipedia.org/wiki/NATO_Stock_Number NATO stock number} (nsn) of a {@link https://schema.org/Product Product}. */
    "schema:nsn"?: SchemaValue<Text, "schema:nsn">;
    /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use {@link https://schema.org/businessFunction businessFunction} to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a {@link https://schema.org/Demand Demand}. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:offers"?: SchemaValue<Demand | Offer | IdReference, "schema:offers">;
    /** A pattern that something has, for example 'polka dot', 'striped', 'Canadian flag'. Values are typically expressed as text, although links to controlled value schemes are also supported. */
    "schema:pattern"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:pattern">;
    /** The product identifier, such as ISBN. For example: `meta itemprop="productID" content="isbn:123-456-789"`. */
    "schema:productID"?: SchemaValue<Text, "schema:productID">;
    /** The date of production of the item, e.g. vehicle. */
    "schema:productionDate"?: SchemaValue<Date, "schema:productionDate">;
    /** The date the item e.g. vehicle was purchased by the current owner. */
    "schema:purchaseDate"?: SchemaValue<Date, "schema:purchaseDate">;
    /** The release date of a product or product model. This can be used to distinguish the exact variant of a product. */
    "schema:releaseDate"?: SchemaValue<Date, "schema:releaseDate">;
    /** A review of the item. */
    "schema:review"?: SchemaValue<Review | IdReference, "schema:review">;
    /**
     * Review of the item.
     *
     * @deprecated Consider using https://schema.org/review instead.
     */
    "schema:reviews"?: SchemaValue<Review | IdReference, "schema:reviews">;
    /** A standardized size of a product or creative work, specified either through a simple textual string (for example 'XL', '32Wx34L'), a QuantitativeValue with a unitCode, or a comprehensive and structured {@link https://schema.org/SizeSpecification SizeSpecification}; in other cases, the {@link https://schema.org/width width}, {@link https://schema.org/height height}, {@link https://schema.org/depth depth} and {@link https://schema.org/weight weight} properties may be more applicable. */
    "schema:size"?: SchemaValue<DefinedTerm | QuantitativeValue | SizeSpecification | Text | IdReference, "schema:size">;
    /** The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service, or the product to which the offer refers. */
    "schema:sku"?: SchemaValue<Text, "schema:sku">;
    /** A slogan or motto associated with the item. */
    "schema:slogan"?: SchemaValue<Text, "schema:slogan">;
    /** The weight of the product or person. */
    "schema:weight"?: SchemaValue<QuantitativeValue | IdReference, "schema:weight">;
    /** The width of the item. */
    "schema:width"?: SchemaValue<Distance | QuantitativeValue | IdReference, "schema:width">;
}
interface ProductLeaf extends ProductBase {
    "@type": "schema:Product";
}
/** Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online. */
export type Product = ProductLeaf | IndividualProduct | ProductCollection | ProductGroup | ProductModel | SomeProducts | Vehicle;

interface ProductCollectionBase extends ProductBase, CollectionBase {
    /** This links to a node or nodes indicating the exact quantity of the products included in an {@link https://schema.org/Offer Offer} or {@link https://schema.org/ProductCollection ProductCollection}. */
    "schema:includesObject"?: SchemaValue<TypeAndQuantityNode | IdReference, "schema:includesObject">;
}
interface ProductCollectionLeaf extends ProductCollectionBase {
    "@type": "schema:ProductCollection";
}
/** A set of products (either {@link https://schema.org/ProductGroup ProductGroup}s or specific variants) that are listed together e.g. in an {@link https://schema.org/Offer Offer}. */
export type ProductCollection = ProductCollectionLeaf;

interface ProductGroupBase extends ProductBase {
    /** Indicates a {@link https://schema.org/Product Product} that is a member of this {@link https://schema.org/ProductGroup ProductGroup} (or {@link https://schema.org/ProductModel ProductModel}). */
    "schema:hasVariant"?: SchemaValue<Product | IdReference, "schema:hasVariant">;
    /** Indicates a textual identifier for a ProductGroup. */
    "schema:productGroupID"?: SchemaValue<Text, "schema:productGroupID">;
    /** Indicates the property or properties by which the variants in a {@link https://schema.org/ProductGroup ProductGroup} vary, e.g. their size, color etc. Schema.org properties can be referenced by their short name e.g. "color"; terms defined elsewhere can be referenced with their URIs. */
    "schema:variesBy"?: SchemaValue<DefinedTerm | Text | IdReference, "schema:variesBy">;
}
interface ProductGroupLeaf extends ProductGroupBase {
    "@type": "schema:ProductGroup";
}
/**
 * A ProductGroup represents a group of {@link https://schema.org/Product Product}s that vary only in certain well-described ways, such as by {@link https://schema.org/size size}, {@link https://schema.org/color color}, {@link https://schema.org/material material} etc.
 *
 * While a ProductGroup itself is not directly offered for sale, the various varying products that it represents can be. The ProductGroup serves as a prototype or template, standing in for all of the products who have an {@link https://schema.org/isVariantOf isVariantOf} relationship to it. As such, properties (including additional types) can be applied to the ProductGroup to represent characteristics shared by each of the (possibly very many) variants. Properties that reference a ProductGroup are not included in this mechanism; neither are the following specific properties {@link https://schema.org/variesBy variesBy}, {@link https://schema.org/hasVariant hasVariant}, {@link https://schema.org/url url}.
 */
export type ProductGroup = ProductGroupLeaf;

interface ProductModelBase extends ProductBase {
    /** Indicates the kind of product that this is a variant of. In the case of {@link https://schema.org/ProductModel ProductModel}, this is a pointer (from a ProductModel) to a base product from which this product is a variant. It is safe to infer that the variant inherits all product features from the base model, unless defined locally. This is not transitive. In the case of a {@link https://schema.org/ProductGroup ProductGroup}, the group description also serves as a template, representing a set of Products that vary on explicitly defined, specific dimensions only (so it defines both a set of variants, as well as which values distinguish amongst those variants). When used with {@link https://schema.org/ProductGroup ProductGroup}, this property can apply to any {@link https://schema.org/Product Product} included in the group. */
    "schema:isVariantOf"?: SchemaValue<ProductGroup | ProductModel | IdReference, "schema:isVariantOf">;
    /** A pointer from a previous, often discontinued variant of the product to its newer variant. */
    "schema:predecessorOf"?: SchemaValue<ProductModel | IdReference, "schema:predecessorOf">;
    /** A pointer from a newer variant of a product to its previous, often discontinued predecessor. */
    "schema:successorOf"?: SchemaValue<ProductModel | IdReference, "schema:successorOf">;
}
interface ProductModelLeaf extends ProductModelBase {
    "@type": "schema:ProductModel";
}
/** A datasheet or vendor specification of a product (in the sense of a prototypical description). */
export type ProductModel = ProductModelLeaf;

interface ProfessionalServiceLeaf extends LocalBusinessBase {
    "@type": "schema:ProfessionalService";
}
/**
 * Original definition: "provider of professional services."
 *
 * The general {@link https://schema.org/ProfessionalService ProfessionalService} type for local businesses was deprecated due to confusion with {@link https://schema.org/Service Service}. For reference, the types that it included were: {@link https://schema.org/Dentist Dentist}, {@link https://schema.org/AccountingService AccountingService}, {@link https://schema.org/Attorney Attorney}, {@link https://schema.org/Notary Notary}, as well as types for several kinds of {@link https://schema.org/HomeAndConstructionBusiness HomeAndConstructionBusiness}: {@link https://schema.org/Electrician Electrician}, {@link https://schema.org/GeneralContractor GeneralContractor}, {@link https://schema.org/HousePainter HousePainter}, {@link https://schema.org/Locksmith Locksmith}, {@link https://schema.org/Plumber Plumber}, {@link https://schema.org/RoofingContractor RoofingContractor}. {@link https://schema.org/LegalService LegalService} was introduced as a more inclusive supertype of {@link https://schema.org/Attorney Attorney}.
 */
export type ProfessionalService = ProfessionalServiceLeaf | string;

interface ProfilePageLeaf extends WebPageBase {
    "@type": "schema:ProfilePage";
}
/** Web page type: Profile page. */
export type ProfilePage = ProfilePageLeaf;

interface ProgramMembershipBase extends ThingBase {
    /** The organization (airline, travelers' club, etc.) the membership is made with. */
    "schema:hostingOrganization"?: SchemaValue<Organization | IdReference, "schema:hostingOrganization">;
    /** A member of an Organization or a ProgramMembership. Organizations can be members of organizations; ProgramMembership is typically for individuals. */
    "schema:member"?: SchemaValue<Organization | Person | IdReference, "schema:member">;
    /**
     * A member of this organization.
     *
     * @deprecated Consider using https://schema.org/member instead.
     */
    "schema:members"?: SchemaValue<Organization | Person | IdReference, "schema:members">;
    /** A unique identifier for the membership. */
    "schema:membershipNumber"?: SchemaValue<Text, "schema:membershipNumber">;
    /** The number of membership points earned by the member. If necessary, the unitText can be used to express the units the points are issued in. (e.g. stars, miles, etc.) */
    "schema:membershipPointsEarned"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:membershipPointsEarned">;
    /** The program providing the membership. */
    "schema:programName"?: SchemaValue<Text, "schema:programName">;
}
interface ProgramMembershipLeaf extends ProgramMembershipBase {
    "@type": "schema:ProgramMembership";
}
/** Used to describe membership in a loyalty programs (e.g. "StarAliance"), traveler clubs (e.g. "AAA"), purchase clubs ("Safeway Club"), etc. */
export type ProgramMembership = ProgramMembershipLeaf;

interface ProjectLeaf extends OrganizationBase {
    "@type": "schema:Project";
}
/** An enterprise (potentially individual but typically collaborative), planned to achieve a particular aim. Use properties from {@link https://schema.org/Organization Organization}, {@link https://schema.org/subOrganization subOrganization}/{@link https://schema.org/parentOrganization parentOrganization} to indicate project sub-structures. */
export type Project = ProjectLeaf | FundingAgency | ResearchProject | string;

interface PronounceableTextBase extends Partial<IdReference> {
    /** The language of the content or performance or used in an action. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/availableLanguage availableLanguage}. */
    "schema:inLanguage"?: SchemaValue<Language | Text | IdReference, "schema:inLanguage">;
    /** Representation of a text {@link https://schema.org/textValue textValue} using the specified {@link https://schema.org/speechToTextMarkup speechToTextMarkup}. For example the city name of Houston in IPA: /ˈhjuːstən/. */
    "schema:phoneticText"?: SchemaValue<Text, "schema:phoneticText">;
    /** Form of markup used. eg. {@link https://www.w3.org/TR/speech-synthesis11 SSML} or {@link https://www.wikidata.org/wiki/Property:P898 IPA}. */
    "schema:speechToTextMarkup"?: SchemaValue<Text, "schema:speechToTextMarkup">;
    /** Text value being annotated. */
    "schema:textValue"?: SchemaValue<Text, "schema:textValue">;
}
interface PronounceableTextLeaf extends PronounceableTextBase {
    "@type": "schema:PronounceableText";
}
/** Data type: PronounceableText. */
export type PronounceableText = PronounceableTextLeaf | string;

interface PropertyBase extends ThingBase {
    /** Relates a property to a class that is (one of) the type(s) the property is expected to be used on. */
    "schema:domainIncludes"?: SchemaValue<Class | IdReference, "schema:domainIncludes">;
    /** Relates a property to a property that is its inverse. Inverse properties relate the same pairs of items to each other, but in reversed direction. For example, the 'alumni' and 'alumniOf' properties are inverseOf each other. Some properties don't have explicit inverses; in these situations RDFa and JSON-LD syntax for reverse properties can be used. */
    "schema:inverseOf"?: SchemaValue<Property | IdReference, "schema:inverseOf">;
    /** Relates a property to a class that constitutes (one of) the expected type(s) for values of the property. */
    "schema:rangeIncludes"?: SchemaValue<Class | IdReference, "schema:rangeIncludes">;
    /** Relates a term (i.e. a property, class or enumeration) to one that supersedes it. */
    "schema:supersededBy"?: SchemaValue<Class | Enumeration | Property | IdReference, "schema:supersededBy">;
}
interface PropertyLeaf extends PropertyBase {
    "@type": "schema:Property";
}
/** A property, used to indicate attributes and relationships of some Thing; equivalent to rdf:Property. */
export type Property = PropertyLeaf;

interface PropertyValueBase extends ThingBase {
    /** The upper value of some characteristic or property. */
    "schema:maxValue"?: SchemaValue<Number, "schema:maxValue">;
    /**
     * A technique or technology used in a {@link https://schema.org/Dataset Dataset} (or {@link https://schema.org/DataDownload DataDownload}, {@link https://schema.org/DataCatalog DataCatalog}), corresponding to the method used for measuring the corresponding variable(s) (described using {@link https://schema.org/variableMeasured variableMeasured}). This is oriented towards scientific and scholarly dataset publication but may have broader applicability; it is not intended as a full representation of measurement, but rather as a high level summary for dataset discovery.
     *
     * For example, if {@link https://schema.org/variableMeasured variableMeasured} is: molecule concentration, {@link https://schema.org/measurementTechnique measurementTechnique} could be: "mass spectrometry" or "nmr spectroscopy" or "colorimetry" or "immunofluorescence".
     *
     * If the {@link https://schema.org/variableMeasured variableMeasured} is "depression rating", the {@link https://schema.org/measurementTechnique measurementTechnique} could be "Zung Scale" or "HAM-D" or "Beck Depression Inventory".
     *
     * If there are several {@link https://schema.org/variableMeasured variableMeasured} properties recorded for some given data object, use a {@link https://schema.org/PropertyValue PropertyValue} for each {@link https://schema.org/variableMeasured variableMeasured} and attach the corresponding {@link https://schema.org/measurementTechnique measurementTechnique}.
     */
    "schema:measurementTechnique"?: SchemaValue<Text | URL, "schema:measurementTechnique">;
    /** The lower value of some characteristic or property. */
    "schema:minValue"?: SchemaValue<Number, "schema:minValue">;
    /** A commonly used identifier for the characteristic represented by the property, e.g. a manufacturer or a standard code for a property. propertyID can be (1) a prefixed string, mainly meant to be used with standards for product properties; (2) a site-specific, non-prefixed string (e.g. the primary key of the property or the vendor-specific id of the property), or (3) a URL indicating the type of the property, either pointing to an external vocabulary, or a Web resource that describes the property (e.g. a glossary entry). Standards bodies should promote a standard prefix for the identifiers of properties from their standards. */
    "schema:propertyID"?: SchemaValue<Text | URL, "schema:propertyID">;
    /** The unit of measurement given using the UN/CEFACT Common Code (3 characters) or a URL. Other codes than the UN/CEFACT Common Code may be used with a prefix followed by a colon. */
    "schema:unitCode"?: SchemaValue<Text | URL, "schema:unitCode">;
    /** A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for {@link unitCode unitCode}. */
    "schema:unitText"?: SchemaValue<Text, "schema:unitText">;
    /**
     * The value of the quantitative value or property value node.
     * - For {@link https://schema.org/QuantitativeValue QuantitativeValue} and {@link https://schema.org/MonetaryAmount MonetaryAmount}, the recommended type for values is 'Number'.
     * - For {@link https://schema.org/PropertyValue PropertyValue}, it can be 'Text;', 'Number', 'Boolean', or 'StructuredValue'.
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     */
    "schema:value"?: SchemaValue<Boolean | Number | StructuredValue | Text | IdReference, "schema:value">;
    /** A secondary value that provides additional information on the original value, e.g. a reference temperature or a type of measurement. */
    "schema:valueReference"?: SchemaValue<DefinedTerm | Enumeration | MeasurementTypeEnumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue | Text | IdReference, "schema:valueReference">;
}
interface PropertyValueLeaf extends PropertyValueBase {
    "@type": "schema:PropertyValue";
}
/**
 * A property-value pair, e.g. representing a feature of a product or place. Use the 'name' property for the name of the property. If there is an additional human-readable version of the value, put that into the 'description' property.
 *
 * Always use specific schema.org properties when a) they exist and b) you can populate them. Using PropertyValue as a substitute will typically not trigger the same effect as using the original, specific property.
 */
export type PropertyValue = PropertyValueLeaf | LocationFeatureSpecification;

interface PropertyValueSpecificationBase extends ThingBase {
    /** The default value of the input. For properties that expect a literal, the default is a literal value, for properties that expect an object, it's an ID reference to one of the current values. */
    "schema:defaultValue"?: SchemaValue<Text | Thing | IdReference, "schema:defaultValue">;
    /** The upper value of some characteristic or property. */
    "schema:maxValue"?: SchemaValue<Number, "schema:maxValue">;
    /** The lower value of some characteristic or property. */
    "schema:minValue"?: SchemaValue<Number, "schema:minValue">;
    /** Whether multiple values are allowed for the property. Default is false. */
    "schema:multipleValues"?: SchemaValue<Boolean, "schema:multipleValues">;
    /** Whether or not a property is mutable. Default is false. Specifying this for a property that also has a value makes it act similar to a "hidden" input in an HTML form. */
    "schema:readonlyValue"?: SchemaValue<Boolean, "schema:readonlyValue">;
    /** The stepValue attribute indicates the granularity that is expected (and required) of the value in a PropertyValueSpecification. */
    "schema:stepValue"?: SchemaValue<Number, "schema:stepValue">;
    /** Specifies the allowed range for number of characters in a literal value. */
    "schema:valueMaxLength"?: SchemaValue<Number, "schema:valueMaxLength">;
    /** Specifies the minimum allowed range for number of characters in a literal value. */
    "schema:valueMinLength"?: SchemaValue<Number, "schema:valueMinLength">;
    /** Indicates the name of the PropertyValueSpecification to be used in URL templates and form encoding in a manner analogous to HTML's input@name. */
    "schema:valueName"?: SchemaValue<Text, "schema:valueName">;
    /** Specifies a regular expression for testing literal values according to the HTML spec. */
    "schema:valuePattern"?: SchemaValue<Text, "schema:valuePattern">;
    /** Whether the property must be filled in to complete the action. Default is false. */
    "schema:valueRequired"?: SchemaValue<Boolean, "schema:valueRequired">;
}
interface PropertyValueSpecificationLeaf extends PropertyValueSpecificationBase {
    "@type": "schema:PropertyValueSpecification";
}
/** A Property value specification. */
export type PropertyValueSpecification = PropertyValueSpecificationLeaf;

interface ProteinBase extends BioChemEntityBase {
    /** A symbolic representation of a BioChemEnity. For example, a nucleotide sequence of a Gene or an amino acid sequence of a Protein. */
    "schema:hasBioPolymerSequence"?: SchemaValue<Text, "schema:hasBioPolymerSequence">;
}
interface ProteinLeaf extends ProteinBase {
    "@type": "schema:Protein";
}
/** Protein is here used in its widest possible definition, as classes of amino acid based molecules. Amyloid-beta Protein in human (UniProt P05067), eukaryota (e.g. an OrthoDB group) or even a single molecule that one can point to are all of type schema:Protein. A protein can thus be a subclass of another protein, e.g. schema:Protein as a UniProt record can have multiple isoforms inside it which would also be schema:Protein. They can be imagined, synthetic, hypothetical or naturally occurring. */
export type Protein = ProteinLeaf;

interface PsychiatricLeaf extends LocalBusinessBase {
    "@type": "schema:Psychiatric";
}
/** A specific branch of medical science that is concerned with the study, treatment, and prevention of mental illness, using both medical and psychological therapies. */
export type Psychiatric = PsychiatricLeaf | string;

interface PsychologicalTreatmentLeaf extends TherapeuticProcedureBase {
    "@type": "schema:PsychologicalTreatment";
}
/** A process of care relying upon counseling, dialogue and communication aimed at improving a mental health condition without use of drugs. */
export type PsychologicalTreatment = PsychologicalTreatmentLeaf;

interface PublicationEventBase extends EventBase {
    /**
     * A flag to signal that the item, event, or place is accessible for free.
     *
     * @deprecated Consider using https://schema.org/isAccessibleForFree instead.
     */
    "schema:free"?: SchemaValue<Boolean, "schema:free">;
    /** An agent associated with the publication event. */
    "schema:publishedBy"?: SchemaValue<Organization | Person | IdReference, "schema:publishedBy">;
    /** A broadcast service associated with the publication event. */
    "schema:publishedOn"?: SchemaValue<BroadcastService | IdReference, "schema:publishedOn">;
}
interface PublicationEventLeaf extends PublicationEventBase {
    "@type": "schema:PublicationEvent";
}
/** A PublicationEvent corresponds indifferently to the event of publication for a CreativeWork of any type e.g. a broadcast event, an on-demand event, a book/journal publication via a variety of delivery media. */
export type PublicationEvent = PublicationEventLeaf | BroadcastEvent | OnDemandEvent;

interface PublicationIssueBase extends CreativeWorkBase {
    /** Identifies the issue of publication; for example, "iii" or "2". */
    "schema:issueNumber"?: SchemaValue<Integer | Text, "schema:issueNumber">;
    /** The page on which the work ends; for example "138" or "xvi". */
    "schema:pageEnd"?: SchemaValue<Integer | Text, "schema:pageEnd">;
    /** The page on which the work starts; for example "135" or "xiii". */
    "schema:pageStart"?: SchemaValue<Integer | Text, "schema:pageStart">;
    /** Any description of pages that is not separated into pageStart and pageEnd; for example, "1-6, 9, 55" or "10-12, 46-49". */
    "schema:pagination"?: SchemaValue<Text, "schema:pagination">;
}
interface PublicationIssueLeaf extends PublicationIssueBase {
    "@type": "schema:PublicationIssue";
}
/**
 * A part of a successively published publication such as a periodical or publication volume, often numbered, usually containing a grouping of works such as articles.
 *
 * See also {@link http://blog.schema.org/2014/09/schemaorg-support-for-bibliographic_2.html blog post}.
 */
export type PublicationIssue = PublicationIssueLeaf | ComicIssue;

interface PublicationVolumeBase extends CreativeWorkBase {
    /** The page on which the work ends; for example "138" or "xvi". */
    "schema:pageEnd"?: SchemaValue<Integer | Text, "schema:pageEnd">;
    /** The page on which the work starts; for example "135" or "xiii". */
    "schema:pageStart"?: SchemaValue<Integer | Text, "schema:pageStart">;
    /** Any description of pages that is not separated into pageStart and pageEnd; for example, "1-6, 9, 55" or "10-12, 46-49". */
    "schema:pagination"?: SchemaValue<Text, "schema:pagination">;
    /** Identifies the volume of publication or multi-part work; for example, "iii" or "2". */
    "schema:volumeNumber"?: SchemaValue<Integer | Text, "schema:volumeNumber">;
}
interface PublicationVolumeLeaf extends PublicationVolumeBase {
    "@type": "schema:PublicationVolume";
}
/**
 * A part of a successively published publication such as a periodical or multi-volume work, often numbered. It may represent a time span, such as a year.
 *
 * See also {@link http://blog.schema.org/2014/09/schemaorg-support-for-bibliographic_2.html blog post}.
 */
export type PublicationVolume = PublicationVolumeLeaf;

interface PublicHealthLeaf extends LocalBusinessBase {
    "@type": "schema:PublicHealth";
}
/** Branch of medicine that pertains to the health services to improve and protect community health, especially epidemiology, sanitation, immunization, and preventive medicine. */
export type PublicHealth = PublicHealthLeaf | string;

interface PublicSwimmingPoolLeaf extends LocalBusinessBase {
    "@type": "schema:PublicSwimmingPool";
}
/** A public swimming pool. */
export type PublicSwimmingPool = PublicSwimmingPoolLeaf | string;

interface PublicToiletLeaf extends CivicStructureBase {
    "@type": "schema:PublicToilet";
}
/** A public toilet is a room or small building containing one or more toilets (and possibly also urinals) which is available for use by the general public, or by customers or employees of certain businesses. */
export type PublicToilet = PublicToiletLeaf | string;

interface QAPageLeaf extends WebPageBase {
    "@type": "schema:QAPage";
}
/** A QAPage is a WebPage focussed on a specific Question and its Answer(s), e.g. in a question answering site or documenting Frequently Asked Questions (FAQs). */
export type QAPage = QAPageLeaf;

interface QualitativeValueBase extends EnumerationBase {
    /**
     * A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.
     *
     * Note: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
     */
    "schema:additionalProperty"?: SchemaValue<PropertyValue | IdReference, "schema:additionalProperty">;
    /** This ordering relation for qualitative values indicates that the subject is equal to the object. */
    "schema:equal"?: SchemaValue<QualitativeValue | IdReference, "schema:equal">;
    /** This ordering relation for qualitative values indicates that the subject is greater than the object. */
    "schema:greater"?: SchemaValue<QualitativeValue | IdReference, "schema:greater">;
    /** This ordering relation for qualitative values indicates that the subject is greater than or equal to the object. */
    "schema:greaterOrEqual"?: SchemaValue<QualitativeValue | IdReference, "schema:greaterOrEqual">;
    /** This ordering relation for qualitative values indicates that the subject is lesser than the object. */
    "schema:lesser"?: SchemaValue<QualitativeValue | IdReference, "schema:lesser">;
    /** This ordering relation for qualitative values indicates that the subject is lesser than or equal to the object. */
    "schema:lesserOrEqual"?: SchemaValue<QualitativeValue | IdReference, "schema:lesserOrEqual">;
    /** This ordering relation for qualitative values indicates that the subject is not equal to the object. */
    "schema:nonEqual"?: SchemaValue<QualitativeValue | IdReference, "schema:nonEqual">;
    /** A secondary value that provides additional information on the original value, e.g. a reference temperature or a type of measurement. */
    "schema:valueReference"?: SchemaValue<DefinedTerm | Enumeration | MeasurementTypeEnumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue | Text | IdReference, "schema:valueReference">;
}
interface QualitativeValueLeaf extends QualitativeValueBase {
    "@type": "schema:QualitativeValue";
}
/** A predefined value for a product characteristic, e.g. the power cord plug type 'US' or the garment sizes 'S', 'M', 'L', and 'XL'. */
export type QualitativeValue = QualitativeValueLeaf | BedType | DriveWheelConfigurationValue | SizeSpecification | SteeringPositionValue;

interface QuantitativeValueBase extends ThingBase {
    /**
     * A property-value pair representing an additional characteristics of the entitity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.
     *
     * Note: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism.
     */
    "schema:additionalProperty"?: SchemaValue<PropertyValue | IdReference, "schema:additionalProperty">;
    /** The upper value of some characteristic or property. */
    "schema:maxValue"?: SchemaValue<Number, "schema:maxValue">;
    /** The lower value of some characteristic or property. */
    "schema:minValue"?: SchemaValue<Number, "schema:minValue">;
    /** The unit of measurement given using the UN/CEFACT Common Code (3 characters) or a URL. Other codes than the UN/CEFACT Common Code may be used with a prefix followed by a colon. */
    "schema:unitCode"?: SchemaValue<Text | URL, "schema:unitCode">;
    /** A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for {@link unitCode unitCode}. */
    "schema:unitText"?: SchemaValue<Text, "schema:unitText">;
    /**
     * The value of the quantitative value or property value node.
     * - For {@link https://schema.org/QuantitativeValue QuantitativeValue} and {@link https://schema.org/MonetaryAmount MonetaryAmount}, the recommended type for values is 'Number'.
     * - For {@link https://schema.org/PropertyValue PropertyValue}, it can be 'Text;', 'Number', 'Boolean', or 'StructuredValue'.
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     */
    "schema:value"?: SchemaValue<Boolean | Number | StructuredValue | Text | IdReference, "schema:value">;
    /** A secondary value that provides additional information on the original value, e.g. a reference temperature or a type of measurement. */
    "schema:valueReference"?: SchemaValue<DefinedTerm | Enumeration | MeasurementTypeEnumeration | PropertyValue | QualitativeValue | QuantitativeValue | StructuredValue | Text | IdReference, "schema:valueReference">;
}
interface QuantitativeValueLeaf extends QuantitativeValueBase {
    "@type": "schema:QuantitativeValue";
}
/** A point value or interval for product characteristics and other purposes. */
export type QuantitativeValue = QuantitativeValueLeaf;

interface QuantitativeValueDistributionBase extends ThingBase {
    /** The duration of the item (movie, audio recording, event, etc.) in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    "schema:duration"?: SchemaValue<Duration | IdReference, "schema:duration">;
    /** The median value. */
    "schema:median"?: SchemaValue<Number, "schema:median">;
    /** The 10th percentile value. */
    "schema:percentile10"?: SchemaValue<Number, "schema:percentile10">;
    /** The 25th percentile value. */
    "schema:percentile25"?: SchemaValue<Number, "schema:percentile25">;
    /** The 75th percentile value. */
    "schema:percentile75"?: SchemaValue<Number, "schema:percentile75">;
    /** The 90th percentile value. */
    "schema:percentile90"?: SchemaValue<Number, "schema:percentile90">;
}
interface QuantitativeValueDistributionLeaf extends QuantitativeValueDistributionBase {
    "@type": "schema:QuantitativeValueDistribution";
}
/** A statistical distribution of values. */
export type QuantitativeValueDistribution = QuantitativeValueDistributionLeaf | MonetaryAmountDistribution;

interface QuantityLeaf extends ThingBase {
    "@type": "schema:Quantity";
}
/** Quantities such as distance, time, mass, weight, etc. Particular instances of say Mass are entities like '3 Kg' or '4 milligrams'. */
export type Quantity = QuantityLeaf | Distance | Duration | Energy | Mass | string;

interface QuestionBase extends CommentBase {
    /** The answer(s) that has been accepted as best, typically on a Question/Answer site. Sites vary in their selection mechanisms, e.g. drawing on community opinion and/or the view of the Question author. */
    "schema:acceptedAnswer"?: SchemaValue<Answer | ItemList | IdReference, "schema:acceptedAnswer">;
    /** The number of answers this question has received. */
    "schema:answerCount"?: SchemaValue<Integer, "schema:answerCount">;
    /** For questions that are part of learning resources (e.g. Quiz), eduQuestionType indicates the format of question being given. Example: "Multiple choice", "Open ended", "Flashcard". */
    "schema:eduQuestionType"?: SchemaValue<Text, "schema:eduQuestionType">;
    /** An answer (possibly one of several, possibly incorrect) to a Question, e.g. on a Question/Answer site. */
    "schema:suggestedAnswer"?: SchemaValue<Answer | ItemList | IdReference, "schema:suggestedAnswer">;
}
interface QuestionLeaf extends QuestionBase {
    "@type": "schema:Question";
}
/** A specific question - e.g. from a user seeking answers online, or collected in a Frequently Asked Questions (FAQ) document. */
export type Question = QuestionLeaf;

interface QuizLeaf extends LearningResourceBase {
    "@type": "schema:Quiz";
}
/** Quiz: A test of knowledge, skills and abilities. */
export type Quiz = QuizLeaf;

interface QuotationBase extends CreativeWorkBase {
    /** The (e.g. fictional) character, Person or Organization to whom the quotation is attributed within the containing CreativeWork. */
    "schema:spokenByCharacter"?: SchemaValue<Organization | Person | IdReference, "schema:spokenByCharacter">;
}
interface QuotationLeaf extends QuotationBase {
    "@type": "schema:Quotation";
}
/** A quotation. Often but not necessarily from some written work, attributable to a real world author and - if associated with a fictional character - to any fictional Person. Use {@link https://schema.org/isBasedOn isBasedOn} to link to source/origin. The {@link https://schema.org/recordedIn recordedIn} property can be used to reference a Quotation from an {@link https://schema.org/Event Event}. */
export type Quotation = QuotationLeaf;

interface QuoteActionLeaf extends TradeActionBase {
    "@type": "schema:QuoteAction";
}
/** An agent quotes/estimates/appraises an object/product/service with a price at a location/store. */
export type QuoteAction = QuoteActionLeaf;

interface RadiationTherapyLeaf extends MedicalTherapyBase {
    "@type": "schema:RadiationTherapy";
}
/** A process of care using radiation aimed at improving a health condition. */
export type RadiationTherapy = RadiationTherapyLeaf;

interface RadioBroadcastServiceLeaf extends BroadcastServiceBase {
    "@type": "schema:RadioBroadcastService";
}
/** A delivery service through which radio content is provided via broadcast over the air or online. */
export type RadioBroadcastService = RadioBroadcastServiceLeaf;

interface RadiobuttonBase extends UIElementBase {
    /** The technical position of the item that the user has selected */
    "uxi:selectedIndex"?: SchemaValue<Number, "uxi:selectedIndex">;
}
interface RadiobuttonLeaf extends RadiobuttonBase {
    "@type": "uxi:Radiobutton";
}
/** Radio buttons are UI elements for selecting a single element out of a group of options. It is a good practice to have a default option pre-selected. Clicking the Radiobutton will change the group's selectedIndex. All available options are shown in the group, so keeping the number of options small is helpful for the user */
export type Radiobutton = RadiobuttonLeaf;

interface RadioChannelLeaf extends BroadcastChannelBase {
    "@type": "schema:RadioChannel";
}
/** A unique instance of a radio BroadcastService on a CableOrSatelliteService lineup. */
export type RadioChannel = RadioChannelLeaf | AMRadioChannel | FMRadioChannel;

interface RadioClipLeaf extends ClipBase {
    "@type": "schema:RadioClip";
}
/** A short radio program or a segment/part of a radio program. */
export type RadioClip = RadioClipLeaf;

interface RadioEpisodeLeaf extends EpisodeBase {
    "@type": "schema:RadioEpisode";
}
/** A radio episode which can be part of a series or season. */
export type RadioEpisode = RadioEpisodeLeaf;

interface RadioSeasonLeaf extends CreativeWorkSeasonBase {
    "@type": "schema:RadioSeason";
}
/** Season dedicated to radio broadcast and associated online delivery. */
export type RadioSeason = RadioSeasonLeaf;

interface RadioSeriesBase extends CreativeWorkSeriesBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /**
     * An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/actor instead.
     */
    "schema:actors"?: SchemaValue<Person | IdReference, "schema:actors">;
    /** A season that is part of the media series. */
    "schema:containsSeason"?: SchemaValue<CreativeWorkSeason | IdReference, "schema:containsSeason">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /**
     * A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/director instead.
     */
    "schema:directors"?: SchemaValue<Person | IdReference, "schema:directors">;
    /** An episode of a tv, radio or game media within a series or season. */
    "schema:episode"?: SchemaValue<Episode | IdReference, "schema:episode">;
    /**
     * An episode of a TV/radio series or season.
     *
     * @deprecated Consider using https://schema.org/episode instead.
     */
    "schema:episodes"?: SchemaValue<Episode | IdReference, "schema:episodes">;
    /** The composer of the soundtrack. */
    "schema:musicBy"?: SchemaValue<MusicGroup | Person | IdReference, "schema:musicBy">;
    /** The number of episodes in this season or series. */
    "schema:numberOfEpisodes"?: SchemaValue<Integer, "schema:numberOfEpisodes">;
    /** The number of seasons in this series. */
    "schema:numberOfSeasons"?: SchemaValue<Integer, "schema:numberOfSeasons">;
    /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
    "schema:productionCompany"?: SchemaValue<Organization | IdReference, "schema:productionCompany">;
    /**
     * A season in a media series.
     *
     * @deprecated Consider using https://schema.org/containsSeason instead.
     */
    "schema:season"?: SchemaValue<CreativeWorkSeason | URL | IdReference, "schema:season">;
    /**
     * A season in a media series.
     *
     * @deprecated Consider using https://schema.org/season instead.
     */
    "schema:seasons"?: SchemaValue<CreativeWorkSeason | IdReference, "schema:seasons">;
    /** The trailer of a movie or tv/radio series, season, episode, etc. */
    "schema:trailer"?: SchemaValue<VideoObject | IdReference, "schema:trailer">;
}
interface RadioSeriesLeaf extends RadioSeriesBase {
    "@type": "schema:RadioSeries";
}
/** CreativeWorkSeries dedicated to radio broadcast and associated online delivery. */
export type RadioSeries = RadioSeriesLeaf;

interface RadioStationLeaf extends LocalBusinessBase {
    "@type": "schema:RadioStation";
}
/** A radio station. */
export type RadioStation = RadioStationLeaf | string;

interface RatingBase extends ThingBase {
    /** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably. */
    "schema:author"?: SchemaValue<Organization | Person | IdReference, "schema:author">;
    /** The highest value allowed in this rating system. If bestRating is omitted, 5 is assumed. */
    "schema:bestRating"?: SchemaValue<Number | Text, "schema:bestRating">;
    /** A short explanation (e.g. one to two sentences) providing background context and other information that led to the conclusion expressed in the rating. This is particularly applicable to ratings associated with "fact check" markup using {@link https://schema.org/ClaimReview ClaimReview}. */
    "schema:ratingExplanation"?: SchemaValue<Text, "schema:ratingExplanation">;
    /**
     * The rating for the content.
     *
     * Usage guidelines:
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     */
    "schema:ratingValue"?: SchemaValue<Number | Text, "schema:ratingValue">;
    /** This Review or Rating is relevant to this part or facet of the itemReviewed. */
    "schema:reviewAspect"?: SchemaValue<Text, "schema:reviewAspect">;
    /** The lowest value allowed in this rating system. If worstRating is omitted, 1 is assumed. */
    "schema:worstRating"?: SchemaValue<Number | Text, "schema:worstRating">;
}
interface RatingLeaf extends RatingBase {
    "@type": "schema:Rating";
}
/** A rating is an evaluation on a numeric scale, such as 1 to 5 stars. */
export type Rating = RatingLeaf | AggregateRating | EndorsementRating;

interface ReactActionLeaf extends ActionBase {
    "@type": "schema:ReactAction";
}
/** The act of responding instinctively and emotionally to an object, expressing a sentiment. */
export type ReactAction = ReactActionLeaf | AgreeAction | DisagreeAction | DislikeAction | EndorseAction | LikeAction | UIReactAction | WantAction;

interface ReadActionLeaf extends ConsumeActionBase {
    "@type": "schema:ReadAction";
}
/** The act of consuming written content. */
export type ReadAction = ReadActionLeaf;

interface RealEstateAgentLeaf extends LocalBusinessBase {
    "@type": "schema:RealEstateAgent";
}
/** A real-estate agent. */
export type RealEstateAgent = RealEstateAgentLeaf | string;

interface RealEstateListingBase extends WebPageBase {
    /** Publication date of an online listing. */
    "schema:datePosted"?: SchemaValue<Date | DateTime, "schema:datePosted">;
    /** Length of the lease for some {@link https://schema.org/Accommodation Accommodation}, either particular to some {@link https://schema.org/Offer Offer} or in some cases intrinsic to the property. */
    "schema:leaseLength"?: SchemaValue<Duration | QuantitativeValue | IdReference, "schema:leaseLength">;
}
interface RealEstateListingLeaf extends RealEstateListingBase {
    "@type": "schema:RealEstateListing";
}
/** A {@link https://schema.org/RealEstateListing RealEstateListing} is a listing that describes one or more real-estate {@link https://schema.org/Offer Offer}s (whose {@link https://schema.org/businessFunction businessFunction} is typically to lease out, or to sell). The {@link https://schema.org/RealEstateListing RealEstateListing} type itself represents the overall listing, as manifested in some {@link https://schema.org/WebPage WebPage}. */
export type RealEstateListing = RealEstateListingLeaf;

interface ReceiveActionBase extends TransferActionBase {
    /** A sub property of instrument. The method of delivery. */
    "schema:deliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:deliveryMethod">;
    /** A sub property of participant. The participant who is at the sending end of the action. */
    "schema:sender"?: SchemaValue<Audience | Organization | Person | IdReference, "schema:sender">;
}
interface ReceiveActionLeaf extends ReceiveActionBase {
    "@type": "schema:ReceiveAction";
}
/**
 * The act of physically/electronically taking delivery of an object that has been transferred from an origin to a destination. Reciprocal of SendAction.
 *
 * Related actions:
 * - {@link https://schema.org/SendAction SendAction}: The reciprocal of ReceiveAction.
 * - {@link https://schema.org/TakeAction TakeAction}: Unlike TakeAction, ReceiveAction does not imply that the ownership has been transfered (e.g. I can receive a package, but it does not mean the package is now mine).
 */
export type ReceiveAction = ReceiveActionLeaf;

interface RecipeBase extends HowToBase {
    /** The method of cooking, such as Frying, Steaming, ... */
    "schema:cookingMethod"?: SchemaValue<Text, "schema:cookingMethod">;
    /** The time it takes to actually cook the dish, in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 duration format}. */
    "schema:cookTime"?: SchemaValue<Duration | IdReference, "schema:cookTime">;
    /**
     * A single ingredient used in the recipe, e.g. sugar, flour or garlic.
     *
     * @deprecated Consider using https://schema.org/recipeIngredient instead.
     */
    "schema:ingredients"?: SchemaValue<Text, "schema:ingredients">;
    /** Nutrition information about the recipe or menu item. */
    "schema:nutrition"?: SchemaValue<NutritionInformation | IdReference, "schema:nutrition">;
    /** The category of the recipe—for example, appetizer, entree, etc. */
    "schema:recipeCategory"?: SchemaValue<Text, "schema:recipeCategory">;
    /** The cuisine of the recipe (for example, French or Ethiopian). */
    "schema:recipeCuisine"?: SchemaValue<Text, "schema:recipeCuisine">;
    /** A single ingredient used in the recipe, e.g. sugar, flour or garlic. */
    "schema:recipeIngredient"?: SchemaValue<Text, "schema:recipeIngredient">;
    /** A step in making the recipe, in the form of a single item (document, video, etc.) or an ordered list with HowToStep and/or HowToSection items. */
    "schema:recipeInstructions"?: SchemaValue<CreativeWork | ItemList | Text | IdReference, "schema:recipeInstructions">;
    /** The quantity produced by the recipe (for example, number of people served, number of servings, etc). */
    "schema:recipeYield"?: SchemaValue<QuantitativeValue | Text | IdReference, "schema:recipeYield">;
    /** Indicates a dietary restriction or guideline for which this recipe or menu item is suitable, e.g. diabetic, halal etc. */
    "schema:suitableForDiet"?: SchemaValue<RestrictedDiet | IdReference, "schema:suitableForDiet">;
}
interface RecipeLeaf extends RecipeBase {
    "@type": "schema:Recipe";
}
/** A recipe. For dietary restrictions covered by the recipe, a few common restrictions are enumerated via {@link https://schema.org/suitableForDiet suitableForDiet}. The {@link https://schema.org/keywords keywords} property can also be used to add more detail. */
export type Recipe = RecipeLeaf;

interface RecommendationBase extends ReviewBase {
    /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
    "schema:category"?: SchemaValue<PhysicalActivityCategory | Text | Thing | URL | IdReference, "schema:category">;
}
interface RecommendationLeaf extends RecommendationBase {
    "@type": "schema:Recommendation";
}
/** {@link https://schema.org/Recommendation Recommendation} is a type of {@link https://schema.org/Review Review} that suggests or proposes something as the best option or best course of action. Recommendations may be for products or services, or other concrete things, as in the case of a ranked list or product guide. A {@link https://schema.org/Guide Guide} may list multiple recommendations for different categories. For example, in a {@link https://schema.org/Guide Guide} about which TVs to buy, the author may have several {@link https://schema.org/Recommendation Recommendation}s. */
export type Recommendation = RecommendationLeaf;

interface RecommendedDoseScheduleLeaf extends DoseScheduleBase {
    "@type": "schema:RecommendedDoseSchedule";
}
/** A recommended dosing schedule for a drug or supplement as prescribed or recommended by an authority or by the drug/supplement's manufacturer. Capture the recommending authority in the recognizingAuthority property of MedicalEntity. */
export type RecommendedDoseSchedule = RecommendedDoseScheduleLeaf;

interface RecordActionLeaf extends UIActionBase {
    "@type": "uxi:RecordAction";
}
/** A record action can be used to create audio or video recordings, may depend on the user's microphone(s) or camera(s), so an easy way to switch or select a recording device is useful. This action can also be used to trigger other types of recordings. Stopping and pausing the recording should also be considered */
export type RecordAction = RecordActionLeaf;

interface RectangleLeaf extends UIElementBase {
    "@type": "uxi:Rectangle";
}
/** A rectangle is a type of Shape very common in interface design to create 'boxes' of dfferent sizes and aspect ratios. Their relative sizes and positions usually make up most of the layout. For users, boxes with rounded corners are easier to mentally process. */
export type Rectangle = RectangleLeaf;

interface RecyclingCenterLeaf extends LocalBusinessBase {
    "@type": "schema:RecyclingCenter";
}
/** A recycling center. */
export type RecyclingCenter = RecyclingCenterLeaf | string;

interface RedoActionLeaf extends UIActionBase {
    "@type": "uxi:RedoAction";
}
/** A user action to redo a modification that was removed from the history of user-edits by an 'undo' action */
export type RedoAction = RedoActionLeaf;

interface RefundTypeEnumerationLeaf extends EnumerationBase {
    "@type": "schema:RefundTypeEnumeration";
}
/** Enumerates several kinds of product return refund types. */
export type RefundTypeEnumeration = "https://schema.org/ExchangeRefund" | "schema:ExchangeRefund" | "https://schema.org/FullRefund" | "schema:FullRefund" | "https://schema.org/StoreCreditRefund" | "schema:StoreCreditRefund" | RefundTypeEnumerationLeaf;

interface RegisterActionLeaf extends ActionBase {
    "@type": "schema:RegisterAction";
}
/**
 * The act of registering to be a user of a service, product or web page.
 *
 * Related actions:
 * - {@link https://schema.org/JoinAction JoinAction}: Unlike JoinAction, RegisterAction implies you are registering to be a user of a service, _not_ a group/team of people.
 * - [FollowAction]]: Unlike FollowAction, RegisterAction doesn't imply that the agent is expecting to poll for updates from the object.
 * - {@link https://schema.org/SubscribeAction SubscribeAction}: Unlike SubscribeAction, RegisterAction doesn't imply that the agent is expecting updates from the object.
 */
export type RegisterAction = RegisterActionLeaf;

interface RejectActionLeaf extends ActionBase {
    "@type": "schema:RejectAction";
}
/**
 * The act of rejecting to/adopting an object.
 *
 * Related actions:
 * - {@link https://schema.org/AcceptAction AcceptAction}: The antonym of RejectAction.
 */
export type RejectAction = RejectActionLeaf;

interface RentActionBase extends TradeActionBase {
    /** A sub property of participant. The owner of the real estate property. */
    "schema:landlord"?: SchemaValue<Organization | Person | IdReference, "schema:landlord">;
    /** A sub property of participant. The real estate agent involved in the action. */
    "schema:realEstateAgent"?: SchemaValue<RealEstateAgent | IdReference, "schema:realEstateAgent">;
}
interface RentActionLeaf extends RentActionBase {
    "@type": "schema:RentAction";
}
/** The act of giving money in return for temporary use, but not ownership, of an object such as a vehicle or property. For example, an agent rents a property from a landlord in exchange for a periodic payment. */
export type RentAction = RentActionLeaf;

interface RentalCarReservationBase extends ReservationBase {
    /** Where a rental car can be dropped off. */
    "schema:dropoffLocation"?: SchemaValue<Place | IdReference, "schema:dropoffLocation">;
    /** When a rental car can be dropped off. */
    "schema:dropoffTime"?: SchemaValue<DateTime, "schema:dropoffTime">;
    /** Where a taxi will pick up a passenger or a rental car can be picked up. */
    "schema:pickupLocation"?: SchemaValue<Place | IdReference, "schema:pickupLocation">;
    /** When a taxi will pickup a passenger or a rental car can be picked up. */
    "schema:pickupTime"?: SchemaValue<DateTime, "schema:pickupTime">;
}
interface RentalCarReservationLeaf extends RentalCarReservationBase {
    "@type": "schema:RentalCarReservation";
}
/**
 * A reservation for a rental car.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations.
 */
export type RentalCarReservation = RentalCarReservationLeaf;

interface RepaymentSpecificationBase extends ThingBase {
    /** a type of payment made in cash during the onset of the purchase of an expensive good/service. The payment typically represents only a percentage of the full purchase price. */
    "schema:downPayment"?: SchemaValue<MonetaryAmount | Number | IdReference, "schema:downPayment">;
    /** The amount to be paid as a penalty in the event of early payment of the loan. */
    "schema:earlyPrepaymentPenalty"?: SchemaValue<MonetaryAmount | IdReference, "schema:earlyPrepaymentPenalty">;
    /** The amount of money to pay in a single payment. */
    "schema:loanPaymentAmount"?: SchemaValue<MonetaryAmount | IdReference, "schema:loanPaymentAmount">;
    /** Frequency of payments due, i.e. number of months between payments. This is defined as a frequency, i.e. the reciprocal of a period of time. */
    "schema:loanPaymentFrequency"?: SchemaValue<Number, "schema:loanPaymentFrequency">;
    /** The number of payments contractually required at origination to repay the loan. For monthly paying loans this is the number of months from the contractual first payment date to the maturity date. */
    "schema:numberOfLoanPayments"?: SchemaValue<Number, "schema:numberOfLoanPayments">;
}
interface RepaymentSpecificationLeaf extends RepaymentSpecificationBase {
    "@type": "schema:RepaymentSpecification";
}
/** A structured value representing repayment. */
export type RepaymentSpecification = RepaymentSpecificationLeaf;

interface ReplaceActionBase extends UpdateActionBase {
    /** A sub property of object. The object that is being replaced. */
    "schema:replacee"?: SchemaValue<Thing | IdReference, "schema:replacee">;
    /** A sub property of object. The object that replaces. */
    "schema:replacer"?: SchemaValue<Thing | IdReference, "schema:replacer">;
}
interface ReplaceActionLeaf extends ReplaceActionBase {
    "@type": "schema:ReplaceAction";
}
/** The act of editing a recipient by replacing an old object with a new object. */
export type ReplaceAction = ReplaceActionLeaf;

interface ReplyActionBase extends CommunicateActionBase {
    /** A sub property of result. The Comment created or sent as a result of this action. */
    "schema:resultComment"?: SchemaValue<Comment | IdReference, "schema:resultComment">;
}
interface ReplyActionLeaf extends ReplyActionBase {
    "@type": "schema:ReplyAction";
}
/**
 * The act of responding to a question/message asked/sent by the object. Related to {@link https://schema.org/AskAction AskAction}
 *
 * Related actions:
 * - {@link https://schema.org/AskAction AskAction}: Appears generally as an origin of a ReplyAction.
 */
export type ReplyAction = ReplyActionLeaf | UIReplyAction;

interface ReportBase extends ArticleBase {
    /** The number or other unique designator assigned to a Report by the publishing organization. */
    "schema:reportNumber"?: SchemaValue<Text, "schema:reportNumber">;
}
interface ReportLeaf extends ReportBase {
    "@type": "schema:Report";
}
/** A Report generated by governmental or non-governmental organization. */
export type Report = ReportLeaf;

interface ReportageNewsArticleLeaf extends NewsArticleBase {
    "@type": "schema:ReportageNewsArticle";
}
/**
 * The {@link https://schema.org/ReportageNewsArticle ReportageNewsArticle} type is a subtype of {@link https://schema.org/NewsArticle NewsArticle} representing news articles which are the result of journalistic news reporting conventions.
 *
 * In practice many news publishers produce a wide variety of article types, many of which might be considered a {@link https://schema.org/NewsArticle NewsArticle} but not a {@link https://schema.org/ReportageNewsArticle ReportageNewsArticle}. For example, opinion pieces, reviews, analysis, sponsored or satirical articles, or articles that combine several of these elements.
 *
 * The {@link https://schema.org/ReportageNewsArticle ReportageNewsArticle} type is based on a stricter ideal for "news" as a work of journalism, with articles based on factual information either observed or verified by the author, or reported and verified from knowledgeable sources. This often includes perspectives from multiple viewpoints on a particular issue (distinguishing news reports from public relations or propaganda). News reports in the {@link https://schema.org/ReportageNewsArticle ReportageNewsArticle} sense de-emphasize the opinion of the author, with commentary and value judgements typically expressed elsewhere.
 *
 * A {@link https://schema.org/ReportageNewsArticle ReportageNewsArticle} which goes deeper into analysis can also be marked with an additional type of {@link https://schema.org/AnalysisNewsArticle AnalysisNewsArticle}.
 */
export type ReportageNewsArticle = ReportageNewsArticleLeaf;

interface ReportedDoseScheduleLeaf extends DoseScheduleBase {
    "@type": "schema:ReportedDoseSchedule";
}
/** A patient-reported or observed dosing schedule for a drug or supplement. */
export type ReportedDoseSchedule = ReportedDoseScheduleLeaf;

interface ResearcherLeaf extends AudienceBase {
    "@type": "schema:Researcher";
}
/** Researchers. */
export type Researcher = ResearcherLeaf;

interface ResearchOrganizationLeaf extends OrganizationBase {
    "@type": "schema:ResearchOrganization";
}
/** A Research Organization (e.g. scientific institute, research company). */
export type ResearchOrganization = ResearchOrganizationLeaf | string;

interface ResearchProjectLeaf extends OrganizationBase {
    "@type": "schema:ResearchProject";
}
/** A Research project. */
export type ResearchProject = ResearchProjectLeaf | string;

interface ReservationBase extends ThingBase {
    /**
     * 'bookingAgent' is an out-dated term indicating a 'broker' that serves as a booking agent.
     *
     * @deprecated Consider using https://schema.org/broker instead.
     */
    "schema:bookingAgent"?: SchemaValue<Organization | Person | IdReference, "schema:bookingAgent">;
    /** The date and time the reservation was booked. */
    "schema:bookingTime"?: SchemaValue<DateTime, "schema:bookingTime">;
    /** An entity that arranges for an exchange between a buyer and a seller. In most cases a broker never acquires or releases ownership of a product or service involved in an exchange. If it is not clear whether an entity is a broker, seller, or buyer, the latter two terms are preferred. */
    "schema:broker"?: SchemaValue<Organization | Person | IdReference, "schema:broker">;
    /** The date and time the reservation was modified. */
    "schema:modifiedTime"?: SchemaValue<DateTime, "schema:modifiedTime">;
    /**
     * The currency of the price, or a price component when attached to {@link https://schema.org/PriceSpecification PriceSpecification} and its subtypes.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:priceCurrency"?: SchemaValue<Text, "schema:priceCurrency">;
    /** Any membership in a frequent flyer, hotel loyalty program, etc. being applied to the reservation. */
    "schema:programMembershipUsed"?: SchemaValue<ProgramMembership | IdReference, "schema:programMembershipUsed">;
    /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
    "schema:provider"?: SchemaValue<Organization | Person | IdReference, "schema:provider">;
    /** The thing -- flight, event, restaurant,etc. being reserved. */
    "schema:reservationFor"?: SchemaValue<Thing | IdReference, "schema:reservationFor">;
    /** A unique identifier for the reservation. */
    "schema:reservationId"?: SchemaValue<Text, "schema:reservationId">;
    /** The current status of the reservation. */
    "schema:reservationStatus"?: SchemaValue<ReservationStatusType | IdReference, "schema:reservationStatus">;
    /** A ticket associated with the reservation. */
    "schema:reservedTicket"?: SchemaValue<Ticket | IdReference, "schema:reservedTicket">;
    /**
     * The total price for the reservation or ticket, including applicable taxes, shipping, etc.
     *
     * Usage guidelines:
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     */
    "schema:totalPrice"?: SchemaValue<Number | PriceSpecification | Text | IdReference, "schema:totalPrice">;
    /** The person or organization the reservation or ticket is for. */
    "schema:underName"?: SchemaValue<Organization | Person | IdReference, "schema:underName">;
}
interface ReservationLeaf extends ReservationBase {
    "@type": "schema:Reservation";
}
/**
 * Describes a reservation for travel, dining or an event. Some reservations require tickets.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, restaurant reservations, flights, or rental cars, use {@link https://schema.org/Offer Offer}.
 */
export type Reservation = ReservationLeaf | BoatReservation | BusReservation | EventReservation | FlightReservation | FoodEstablishmentReservation | LodgingReservation | RentalCarReservation | ReservationPackage | TaxiReservation | TrainReservation;

interface ReservationPackageBase extends ReservationBase {
    /** The individual reservations included in the package. Typically a repeated property. */
    "schema:subReservation"?: SchemaValue<Reservation | IdReference, "schema:subReservation">;
}
interface ReservationPackageLeaf extends ReservationPackageBase {
    "@type": "schema:ReservationPackage";
}
/** A group of multiple reservations with common values for all sub-reservations. */
export type ReservationPackage = ReservationPackageLeaf;

interface ReservationStatusTypeLeaf extends EnumerationBase {
    "@type": "schema:ReservationStatusType";
}
/** Enumerated status values for Reservation. */
export type ReservationStatusType = "https://schema.org/ReservationCancelled" | "schema:ReservationCancelled" | "https://schema.org/ReservationConfirmed" | "schema:ReservationConfirmed" | "https://schema.org/ReservationHold" | "schema:ReservationHold" | "https://schema.org/ReservationPending" | "schema:ReservationPending" | ReservationStatusTypeLeaf;

interface ReserveActionLeaf extends PlanActionBase {
    "@type": "schema:ReserveAction";
}
/**
 * Reserving a concrete object.
 *
 * Related actions:
 * - {@link https://schema.org/ScheduleAction ScheduleAction}: Unlike ScheduleAction, ReserveAction reserves concrete objects (e.g. a table, a hotel) towards a time slot / spatial allocation.
 */
export type ReserveAction = ReserveActionLeaf;

interface ReservoirLeaf extends PlaceBase {
    "@type": "schema:Reservoir";
}
/** A reservoir of water, typically an artificially created lake, like the Lake Kariba reservoir. */
export type Reservoir = ReservoirLeaf | string;

interface ResidenceBase extends PlaceBase {
    /** A floorplan of some {@link https://schema.org/Accommodation Accommodation}. */
    "schema:accommodationFloorPlan"?: SchemaValue<FloorPlan | IdReference, "schema:accommodationFloorPlan">;
}
interface ResidenceLeaf extends ResidenceBase {
    "@type": "schema:Residence";
}
/** The place where a person lives. */
export type Residence = ResidenceLeaf | ApartmentComplex | GatedResidenceCommunity | string;

interface ResizeActionLeaf extends UIActionBase {
    "@type": "uxi:ResizeAction";
}
/** A user action to resize an element, can mean resizing the entire application as well */
export type ResizeAction = ResizeActionLeaf;

interface ResortLeaf extends LodgingBusinessBase {
    "@type": "schema:Resort";
}
/**
 * A resort is a place used for relaxation or recreation, attracting visitors for holidays or vacations. Resorts are places, towns or sometimes commercial establishment operated by a single company (Source: Wikipedia, the free encyclopedia, see {@link http://en.wikipedia.org/wiki/Resort http://en.wikipedia.org/wiki/Resort}).
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type Resort = ResortLeaf | SkiResort | string;

interface RespiratoryTherapyLeaf extends MedicalTherapyBase {
    "@type": "schema:RespiratoryTherapy";
}
/** The therapy that is concerned with the maintenance or improvement of respiratory function (as in patients with pulmonary disease). */
export type RespiratoryTherapy = RespiratoryTherapyLeaf;

interface RestaurantLeaf extends FoodEstablishmentBase {
    "@type": "schema:Restaurant";
}
/** A restaurant. */
export type Restaurant = RestaurantLeaf | string;

interface RestrictedDietLeaf extends EnumerationBase {
    "@type": "schema:RestrictedDiet";
}
/** A diet restricted to certain foods or preparations for cultural, religious, health or lifestyle reasons. */
export type RestrictedDiet = "https://schema.org/DiabeticDiet" | "schema:DiabeticDiet" | "https://schema.org/GlutenFreeDiet" | "schema:GlutenFreeDiet" | "https://schema.org/HalalDiet" | "schema:HalalDiet" | "https://schema.org/HinduDiet" | "schema:HinduDiet" | "https://schema.org/KosherDiet" | "schema:KosherDiet" | "https://schema.org/LowCalorieDiet" | "schema:LowCalorieDiet" | "https://schema.org/LowFatDiet" | "schema:LowFatDiet" | "https://schema.org/LowLactoseDiet" | "schema:LowLactoseDiet" | "https://schema.org/LowSaltDiet" | "schema:LowSaltDiet" | "https://schema.org/VeganDiet" | "schema:VeganDiet" | "https://schema.org/VegetarianDiet" | "schema:VegetarianDiet" | RestrictedDietLeaf;

interface ResumeActionLeaf extends ActionBase {
    "@type": "schema:ResumeAction";
}
/** The act of resuming a device or application which was formerly paused (e.g. resume music playback or resume a timer). */
export type ResumeAction = ResumeActionLeaf;

interface ReturnActionBase extends TransferActionBase {
    /** A sub property of participant. The participant who is at the receiving end of the action. */
    "schema:recipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:recipient">;
}
interface ReturnActionLeaf extends ReturnActionBase {
    "@type": "schema:ReturnAction";
}
/** The act of returning to the origin that which was previously received (concrete objects) or taken (ownership). */
export type ReturnAction = ReturnActionLeaf;

interface ReturnFeesEnumerationLeaf extends EnumerationBase {
    "@type": "schema:ReturnFeesEnumeration";
}
/** Enumerates several kinds of policies for product return fees. */
export type ReturnFeesEnumeration = "https://schema.org/FreeReturn" | "schema:FreeReturn" | "https://schema.org/OriginalShippingFees" | "schema:OriginalShippingFees" | "https://schema.org/RestockingFees" | "schema:RestockingFees" | "https://schema.org/ReturnFeesCustomerResponsibility" | "schema:ReturnFeesCustomerResponsibility" | "https://schema.org/ReturnShippingFees" | "schema:ReturnShippingFees" | ReturnFeesEnumerationLeaf;

interface ReturnLabelSourceEnumerationLeaf extends EnumerationBase {
    "@type": "schema:ReturnLabelSourceEnumeration";
}
/** Enumerates several types of return labels for product returns. */
export type ReturnLabelSourceEnumeration = "https://schema.org/ReturnLabelCustomerResponsibility" | "schema:ReturnLabelCustomerResponsibility" | "https://schema.org/ReturnLabelDownloadAndPrint" | "schema:ReturnLabelDownloadAndPrint" | "https://schema.org/ReturnLabelInBox" | "schema:ReturnLabelInBox" | ReturnLabelSourceEnumerationLeaf;

interface ReturnMethodEnumerationLeaf extends EnumerationBase {
    "@type": "schema:ReturnMethodEnumeration";
}
/** Enumerates several types of product return methods. */
export type ReturnMethodEnumeration = "https://schema.org/ReturnAtKiosk" | "schema:ReturnAtKiosk" | "https://schema.org/ReturnByMail" | "schema:ReturnByMail" | "https://schema.org/ReturnInStore" | "schema:ReturnInStore" | ReturnMethodEnumerationLeaf;

interface ReviewBase extends CreativeWorkBase {
    /** An associated {@link https://schema.org/ClaimReview ClaimReview}, related by specific common content, topic or claim. The expectation is that this property would be most typically used in cases where a single activity is conducting both claim reviews and media reviews, in which case {@link https://schema.org/relatedMediaReview relatedMediaReview} would commonly be used on a {@link https://schema.org/ClaimReview ClaimReview}, while {@link https://schema.org/relatedClaimReview relatedClaimReview} would be used on {@link https://schema.org/MediaReview MediaReview}. */
    "schema:associatedClaimReview"?: SchemaValue<Review | IdReference, "schema:associatedClaimReview">;
    /** An associated {@link https://schema.org/MediaReview MediaReview}, related by specific common content, topic or claim. The expectation is that this property would be most typically used in cases where a single activity is conducting both claim reviews and media reviews, in which case {@link https://schema.org/relatedMediaReview relatedMediaReview} would commonly be used on a {@link https://schema.org/ClaimReview ClaimReview}, while {@link https://schema.org/relatedClaimReview relatedClaimReview} would be used on {@link https://schema.org/MediaReview MediaReview}. */
    "schema:associatedMediaReview"?: SchemaValue<Review | IdReference, "schema:associatedMediaReview">;
    /** An associated {@link https://schema.org/Review Review}. */
    "schema:associatedReview"?: SchemaValue<Review | IdReference, "schema:associatedReview">;
    /** The item that is being reviewed/rated. */
    "schema:itemReviewed"?: SchemaValue<Thing | IdReference, "schema:itemReviewed">;
    /** Indicates, in the context of a {@link https://schema.org/Review Review} (e.g. framed as 'pro' vs 'con' considerations), negative considerations - either as unstructured text, or a list. */
    "schema:negativeNotes"?: SchemaValue<ItemList | ListItem | Text | WebContent | IdReference, "schema:negativeNotes">;
    /** Indicates, in the context of a {@link https://schema.org/Review Review} (e.g. framed as 'pro' vs 'con' considerations), positive considerations - either as unstructured text, or a list. */
    "schema:positiveNotes"?: SchemaValue<ItemList | ListItem | Text | WebContent | IdReference, "schema:positiveNotes">;
    /** This Review or Rating is relevant to this part or facet of the itemReviewed. */
    "schema:reviewAspect"?: SchemaValue<Text, "schema:reviewAspect">;
    /** The actual body of the review. */
    "schema:reviewBody"?: SchemaValue<Text, "schema:reviewBody">;
    /** The rating given in this review. Note that reviews can themselves be rated. The `reviewRating` applies to rating given by the review. The {@link https://schema.org/aggregateRating aggregateRating} property applies to the review itself, as a creative work. */
    "schema:reviewRating"?: SchemaValue<Rating | IdReference, "schema:reviewRating">;
}
interface ReviewLeaf extends ReviewBase {
    "@type": "schema:Review";
}
/** A review of an item - for example, of a restaurant, movie, or store. */
export type Review = ReviewLeaf | ClaimReview | CriticReview | EmployerReview | MediaReview | Recommendation | UserReview;

interface ReviewActionBase extends ActionBase {
    /** A sub property of result. The review that resulted in the performing of the action. */
    "schema:resultReview"?: SchemaValue<Review | IdReference, "schema:resultReview">;
}
interface ReviewActionLeaf extends ReviewActionBase {
    "@type": "schema:ReviewAction";
}
/** The act of producing a balanced opinion about the object for an audience. An agent reviews an object with participants resulting in a review. */
export type ReviewAction = ReviewActionLeaf;

interface ReviewNewsArticleBase extends NewsArticleBase, ReviewBase {
}
interface ReviewNewsArticleLeaf extends ReviewNewsArticleBase {
    "@type": "schema:ReviewNewsArticle";
}
/** A {@link https://schema.org/NewsArticle NewsArticle} and {@link https://schema.org/CriticReview CriticReview} providing a professional critic's assessment of a service, product, performance, or artistic or literary work. */
export type ReviewNewsArticle = ReviewNewsArticleLeaf;

interface RiverBodyOfWaterLeaf extends PlaceBase {
    "@type": "schema:RiverBodyOfWater";
}
/** A river (for example, the broad majestic Shannon). */
export type RiverBodyOfWater = RiverBodyOfWaterLeaf | string;

interface RoofingContractorLeaf extends LocalBusinessBase {
    "@type": "schema:RoofingContractor";
}
/** A roofing contractor. */
export type RoofingContractor = RoofingContractorLeaf | string;

interface RoomLeaf extends AccommodationBase {
    "@type": "schema:Room";
}
/**
 * A room is a distinguishable space within a structure, usually separated from other spaces by interior walls. (Source: Wikipedia, the free encyclopedia, see {@link http://en.wikipedia.org/wiki/Room http://en.wikipedia.org/wiki/Room}).
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type Room = RoomLeaf | HotelRoom | MeetingRoom | string;

interface RsvpActionBase extends InformActionBase {
    /** If responding yes, the number of guests who will attend in addition to the invitee. */
    "schema:additionalNumberOfGuests"?: SchemaValue<Number, "schema:additionalNumberOfGuests">;
    /** Comments, typically from users. */
    "schema:comment"?: SchemaValue<Comment | IdReference, "schema:comment">;
    /** The response (yes, no, maybe) to the RSVP. */
    "schema:rsvpResponse"?: SchemaValue<RsvpResponseType | IdReference, "schema:rsvpResponse">;
}
interface RsvpActionLeaf extends RsvpActionBase {
    "@type": "schema:RsvpAction";
}
/** The act of notifying an event organizer as to whether you expect to attend the event. */
export type RsvpAction = RsvpActionLeaf;

interface RsvpResponseTypeLeaf extends EnumerationBase {
    "@type": "schema:RsvpResponseType";
}
/** RsvpResponseType is an enumeration type whose instances represent responding to an RSVP request. */
export type RsvpResponseType = "https://schema.org/RsvpResponseMaybe" | "schema:RsvpResponseMaybe" | "https://schema.org/RsvpResponseNo" | "schema:RsvpResponseNo" | "https://schema.org/RsvpResponseYes" | "schema:RsvpResponseYes" | RsvpResponseTypeLeaf;

interface RVParkLeaf extends CivicStructureBase {
    "@type": "schema:RVPark";
}
/** A place offering space for "Recreational Vehicles", Caravans, mobile homes and the like. */
export type RVPark = RVParkLeaf | string;

interface SaleEventLeaf extends EventBase {
    "@type": "schema:SaleEvent";
}
/** Event type: Sales event. */
export type SaleEvent = SaleEventLeaf;

interface SatiricalArticleLeaf extends ArticleBase {
    "@type": "schema:SatiricalArticle";
}
/** An {@link https://schema.org/Article Article} whose content is primarily {@link https://schema.org/satirical satirical}(https://en.wikipedia.org/wiki/Satire) in nature, i.e. unlikely to be literally true. A satirical article is sometimes but not necessarily also a {@link https://schema.org/NewsArticle NewsArticle}. {@link https://schema.org/ScholarlyArticle ScholarlyArticle}s are also sometimes satirized. */
export type SatiricalArticle = SatiricalArticleLeaf;

interface SaveActionLeaf extends UIActionBase {
    "@type": "uxi:SaveAction";
}
/** A user action to save an element. Depending on how many elements a user will save, saving can be combined with lists, folders or tags */
export type SaveAction = SaveActionLeaf;

interface ScheduleBase extends ThingBase {
    /** Defines the day(s) of the week on which a recurring {@link https://schema.org/Event Event} takes place. May be specified using either {@link https://schema.org/DayOfWeek DayOfWeek}, or alternatively {@link https://schema.org/Text Text} conforming to iCal's syntax for byDay recurrence rules. */
    "schema:byDay"?: SchemaValue<DayOfWeek | Text | IdReference, "schema:byDay">;
    /** Defines the month(s) of the year on which a recurring {@link https://schema.org/Event Event} takes place. Specified as an {@link https://schema.org/Integer Integer} between 1-12. January is 1. */
    "schema:byMonth"?: SchemaValue<Integer, "schema:byMonth">;
    /** Defines the day(s) of the month on which a recurring {@link https://schema.org/Event Event} takes place. Specified as an {@link https://schema.org/Integer Integer} between 1-31. */
    "schema:byMonthDay"?: SchemaValue<Integer, "schema:byMonthDay">;
    /** Defines the week(s) of the month on which a recurring Event takes place. Specified as an Integer between 1-5. For clarity, byMonthWeek is best used in conjunction with byDay to indicate concepts like the first and third Mondays of a month. */
    "schema:byMonthWeek"?: SchemaValue<Integer, "schema:byMonthWeek">;
    /** The duration of the item (movie, audio recording, event, etc.) in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    "schema:duration"?: SchemaValue<Duration | IdReference, "schema:duration">;
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:endDate"?: SchemaValue<Date | DateTime, "schema:endDate">;
    /**
     * The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. e.g. John wrote a book from January to _December_. For media, including audio and video, it's the time offset of the end of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:endTime"?: SchemaValue<DateTime | Time, "schema:endTime">;
    /** Defines a {@link https://schema.org/Date Date} or {@link https://schema.org/DateTime DateTime} during which a scheduled {@link https://schema.org/Event Event} will not take place. The property allows exceptions to a {@link https://schema.org/Schedule Schedule} to be specified. If an exception is specified as a {@link https://schema.org/DateTime DateTime} then only the event that would have started at that specific date and time should be excluded from the schedule. If an exception is specified as a {@link https://schema.org/Date Date} then any event that is scheduled for that 24 hour period should be excluded from the schedule. This allows a whole day to be excluded from the schedule without having to itemise every scheduled event. */
    "schema:exceptDate"?: SchemaValue<Date | DateTime, "schema:exceptDate">;
    /** Defines the number of times a recurring {@link https://schema.org/Event Event} will take place */
    "schema:repeatCount"?: SchemaValue<Integer, "schema:repeatCount">;
    /** Defines the frequency at which {@link https://schema.org/Event Event}s will occur according to a schedule {@link https://schema.org/Schedule Schedule}. The intervals between events should be defined as a {@link https://schema.org/Duration Duration} of time. */
    "schema:repeatFrequency"?: SchemaValue<Duration | Text | IdReference, "schema:repeatFrequency">;
    /** Indicates the timezone for which the time(s) indicated in the {@link https://schema.org/Schedule Schedule} are given. The value provided should be among those listed in the IANA Time Zone Database. */
    "schema:scheduleTimezone"?: SchemaValue<Text, "schema:scheduleTimezone">;
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    "schema:startDate"?: SchemaValue<Date | DateTime, "schema:startDate">;
    /**
     * The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. e.g. John wrote a book from _January_ to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.
     *
     * Note that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions.
     */
    "schema:startTime"?: SchemaValue<DateTime | Time, "schema:startTime">;
}
interface ScheduleLeaf extends ScheduleBase {
    "@type": "schema:Schedule";
}
/** A schedule defines a repeating time period used to describe a regularly occurring {@link https://schema.org/Event Event}. At a minimum a schedule will specify {@link https://schema.org/repeatFrequency repeatFrequency} which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type Schedule = ScheduleLeaf;

interface ScheduleActionLeaf extends PlanActionBase {
    "@type": "schema:ScheduleAction";
}
/**
 * Scheduling future actions, events, or tasks.
 *
 * Related actions:
 * - {@link https://schema.org/ReserveAction ReserveAction}: Unlike ReserveAction, ScheduleAction allocates future actions (e.g. an event, a task, etc) towards a time slot / spatial allocation.
 */
export type ScheduleAction = ScheduleActionLeaf;

interface ScholarlyArticleLeaf extends ArticleBase {
    "@type": "schema:ScholarlyArticle";
}
/** A scholarly article. */
export type ScholarlyArticle = ScholarlyArticleLeaf | MedicalScholarlyArticle;

interface SchoolLeaf extends EducationalOrganizationBase {
    "@type": "schema:School";
}
/** A school. */
export type School = SchoolLeaf | string;

interface SchoolDistrictLeaf extends PlaceBase {
    "@type": "schema:SchoolDistrict";
}
/** A School District is an administrative area for the administration of schools. */
export type SchoolDistrict = SchoolDistrictLeaf | string;

interface ScopeLeaf extends ElementBase {
    "@type": "uxi:Scope";
}
/** Scopes are Structural Elements that define the range of operation for their sub-elements. E.g. each user gets their own user-scope when they access their profile at example.com/myprofile, so the application will return different users when it accesses the 'currentUser' profile. To avoid confusion: In project management, this term is understood as the scope of work needed to finish a project. It can also mean different viewing instruments, microscope etc. */
export type Scope = ScopeLeaf;

interface ScreeningEventBase extends EventBase {
    /** Languages in which subtitles/captions are available, in {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard format}. */
    "schema:subtitleLanguage"?: SchemaValue<Language | Text | IdReference, "schema:subtitleLanguage">;
    /** The type of screening or video broadcast used (e.g. IMAX, 3D, SD, HD, etc.). */
    "schema:videoFormat"?: SchemaValue<Text, "schema:videoFormat">;
    /** The movie presented during this event. */
    "schema:workPresented"?: SchemaValue<Movie | IdReference, "schema:workPresented">;
}
interface ScreeningEventLeaf extends ScreeningEventBase {
    "@type": "schema:ScreeningEvent";
}
/** A screening of a movie or other video. */
export type ScreeningEvent = ScreeningEventLeaf;

interface ScrollActionLeaf extends UIActionBase {
    "@type": "uxi:ScrollAction";
}
/** A user action to scroll through an element which is bigger than its container. Includes 'Endless scroll' action where new content is added to the end of the list as the user scrolls down */
export type ScrollAction = ScrollActionLeaf;

interface SculptureLeaf extends CreativeWorkBase {
    "@type": "schema:Sculpture";
}
/** A piece of sculpture. */
export type Sculpture = SculptureLeaf;

interface SeaBodyOfWaterLeaf extends PlaceBase {
    "@type": "schema:SeaBodyOfWater";
}
/** A sea (for example, the Caspian sea). */
export type SeaBodyOfWater = SeaBodyOfWaterLeaf | string;

interface SearchActionBase extends ActionBase {
    /** A sub property of instrument. The query used on this action. */
    "schema:query"?: SchemaValue<Text, "schema:query">;
}
interface SearchActionLeaf extends SearchActionBase {
    "@type": "schema:SearchAction";
}
/**
 * The act of searching for an object.
 *
 * Related actions:
 * - {@link https://schema.org/FindAction FindAction}: SearchAction generally leads to a FindAction, but not necessarily.
 */
export type SearchAction = SearchActionLeaf;

interface SearchbarLeaf extends UIElementBase {
    "@type": "uxi:Searchbar";
}
/** A search bar is a type of Molecule UI Element that lets users enter search terms. Users often use this to navigate to content directly, or get recomendations to see what the site has to offer. Often accompanied by a magnifying lens icon or a button next it. Clicking the button or hitting the 'Enter'-key on a keyboard are well-understood interactions. Auto-completing the search terms is becoming more common as well. */
export type Searchbar = SearchbarLeaf;

interface SearchResultsPageLeaf extends WebPageBase {
    "@type": "schema:SearchResultsPage";
}
/** Web page type: Search results page. */
export type SearchResultsPage = SearchResultsPageLeaf;

interface SeasonLeaf extends CreativeWorkBase {
    "@type": "schema:Season";
}
/**
 * A media season e.g. tv, radio, video game etc.
 *
 * @deprecated Use CreativeWorkSeason instead.
 */
export type Season = SeasonLeaf;

interface SeatBase extends ThingBase {
    /** The type/class of the seat. */
    "schema:seatingType"?: SchemaValue<QualitativeValue | Text | IdReference, "schema:seatingType">;
    /** The location of the reserved seat (e.g., 27). */
    "schema:seatNumber"?: SchemaValue<Text, "schema:seatNumber">;
    /** The row location of the reserved seat (e.g., B). */
    "schema:seatRow"?: SchemaValue<Text, "schema:seatRow">;
    /** The section location of the reserved seat (e.g. Orchestra). */
    "schema:seatSection"?: SchemaValue<Text, "schema:seatSection">;
}
interface SeatLeaf extends SeatBase {
    "@type": "schema:Seat";
}
/** Used to describe a seat, such as a reserved seat in an event reservation. */
export type Seat = SeatLeaf;

interface SectionLeaf extends UIElementBase {
    "@type": "uxi:Section";
}
/** A Section is a type of Organism UI Element that contains UI elements that semantically belong together, and form a part of a page. Because sections are unspecific, it should have a Heading to describe its content, and make it easier for visually impaired users to navigate your content. */
export type Section = SectionLeaf;

interface SeekToActionBase extends ActionBase {
    /** The start time of the clip expressed as the number of seconds from the beginning of the work. */
    "schema:startOffset"?: SchemaValue<HyperTocEntry | Number | IdReference, "schema:startOffset">;
}
interface SeekToActionLeaf extends SeekToActionBase {
    "@type": "schema:SeekToAction";
}
/** This is the {@link https://schema.org/Action Action} of navigating to a specific {@link https://schema.org/startOffset startOffset} timestamp within a {@link https://schema.org/VideoObject VideoObject}, typically represented with a URL template structure. */
export type SeekToAction = SeekToActionLeaf;

interface SelfStorageLeaf extends LocalBusinessBase {
    "@type": "schema:SelfStorage";
}
/** A self-storage facility. */
export type SelfStorage = SelfStorageLeaf | string;

interface SellActionBase extends TradeActionBase {
    /** A sub property of participant. The participant/person/organization that bought the object. */
    "schema:buyer"?: SchemaValue<Organization | Person | IdReference, "schema:buyer">;
    /**
     * The warranty promise(s) included in the offer.
     *
     * @deprecated Consider using https://schema.org/warranty instead.
     */
    "schema:warrantyPromise"?: SchemaValue<WarrantyPromise | IdReference, "schema:warrantyPromise">;
}
interface SellActionLeaf extends SellActionBase {
    "@type": "schema:SellAction";
}
/** The act of taking money from a buyer in exchange for goods or services rendered. An agent sells an object, product, or service to a buyer for a price. Reciprocal of BuyAction. */
export type SellAction = SellActionLeaf;

interface SendActionBase extends TransferActionBase {
    /** A sub property of instrument. The method of delivery. */
    "schema:deliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:deliveryMethod">;
    /** A sub property of participant. The participant who is at the receiving end of the action. */
    "schema:recipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:recipient">;
}
interface SendActionLeaf extends SendActionBase {
    "@type": "schema:SendAction";
}
/**
 * The act of physically/electronically dispatching an object for transfer from an origin to a destination.Related actions:
 * - {@link https://schema.org/ReceiveAction ReceiveAction}: The reciprocal of SendAction.
 * - {@link https://schema.org/GiveAction GiveAction}: Unlike GiveAction, SendAction does not imply the transfer of ownership (e.g. I can send you my laptop, but I'm not necessarily giving it to you).
 */
export type SendAction = SendActionLeaf;

interface SeriesLeaf extends ThingBase {
    "@type": "schema:Series";
}
/** A Series in schema.org is a group of related items, typically but not necessarily of the same kind. See also {@link https://schema.org/CreativeWorkSeries CreativeWorkSeries}, {@link https://schema.org/EventSeries EventSeries}. */
export type Series = SeriesLeaf | CreativeWorkSeries | EventSeries;

interface ServiceBase extends ThingBase {
    /** The overall rating, based on a collection of reviews or ratings, of the item. */
    "schema:aggregateRating"?: SchemaValue<AggregateRating | IdReference, "schema:aggregateRating">;
    /** The geographic area where a service or offered item is provided. */
    "schema:areaServed"?: SchemaValue<AdministrativeArea | GeoShape | Place | Text | IdReference, "schema:areaServed">;
    /** An intended audience, i.e. a group for whom something was created. */
    "schema:audience"?: SchemaValue<Audience | IdReference, "schema:audience">;
    /** A means of accessing the service (e.g. a phone bank, a web site, a location, etc.). */
    "schema:availableChannel"?: SchemaValue<ServiceChannel | IdReference, "schema:availableChannel">;
    /** An award won by or for this item. */
    "schema:award"?: SchemaValue<Text, "schema:award">;
    /** The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person. */
    "schema:brand"?: SchemaValue<Brand | Organization | IdReference, "schema:brand">;
    /** An entity that arranges for an exchange between a buyer and a seller. In most cases a broker never acquires or releases ownership of a product or service involved in an exchange. If it is not clear whether an entity is a broker, seller, or buyer, the latter two terms are preferred. */
    "schema:broker"?: SchemaValue<Organization | Person | IdReference, "schema:broker">;
    /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
    "schema:category"?: SchemaValue<PhysicalActivityCategory | Text | Thing | URL | IdReference, "schema:category">;
    /** Indicates an OfferCatalog listing for this Organization, Person, or Service. */
    "schema:hasOfferCatalog"?: SchemaValue<OfferCatalog | IdReference, "schema:hasOfferCatalog">;
    /** The hours during which this service or contact is available. */
    "schema:hoursAvailable"?: SchemaValue<OpeningHoursSpecification | IdReference, "schema:hoursAvailable">;
    /** A pointer to another, somehow related product (or multiple products). */
    "schema:isRelatedTo"?: SchemaValue<Product | Service | IdReference, "schema:isRelatedTo">;
    /** A pointer to another, functionally similar product (or multiple products). */
    "schema:isSimilarTo"?: SchemaValue<Product | Service | IdReference, "schema:isSimilarTo">;
    /** An associated logo. */
    "schema:logo"?: SchemaValue<ImageObject | URL | IdReference, "schema:logo">;
    /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use {@link https://schema.org/businessFunction businessFunction} to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a {@link https://schema.org/Demand Demand}. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:offers"?: SchemaValue<Demand | Offer | IdReference, "schema:offers">;
    /**
     * The tangible thing generated by the service, e.g. a passport, permit, etc.
     *
     * @deprecated Consider using https://schema.org/serviceOutput instead.
     */
    "schema:produces"?: SchemaValue<Thing | IdReference, "schema:produces">;
    /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
    "schema:provider"?: SchemaValue<Organization | Person | IdReference, "schema:provider">;
    /** Indicates the mobility of a provided service (e.g. 'static', 'dynamic'). */
    "schema:providerMobility"?: SchemaValue<Text, "schema:providerMobility">;
    /** A review of the item. */
    "schema:review"?: SchemaValue<Review | IdReference, "schema:review">;
    /**
     * The geographic area where the service is provided.
     *
     * @deprecated Consider using https://schema.org/areaServed instead.
     */
    "schema:serviceArea"?: SchemaValue<AdministrativeArea | GeoShape | Place | IdReference, "schema:serviceArea">;
    /**
     * The audience eligible for this service.
     *
     * @deprecated Consider using https://schema.org/audience instead.
     */
    "schema:serviceAudience"?: SchemaValue<Audience | IdReference, "schema:serviceAudience">;
    /** The tangible thing generated by the service, e.g. a passport, permit, etc. */
    "schema:serviceOutput"?: SchemaValue<Thing | IdReference, "schema:serviceOutput">;
    /** The type of service being offered, e.g. veterans' benefits, emergency relief, etc. */
    "schema:serviceType"?: SchemaValue<GovernmentBenefitsType | Text | IdReference, "schema:serviceType">;
    /** A slogan or motto associated with the item. */
    "schema:slogan"?: SchemaValue<Text, "schema:slogan">;
    /** Human-readable terms of service documentation. */
    "schema:termsOfService"?: SchemaValue<Text | URL, "schema:termsOfService">;
}
interface ServiceLeaf extends ServiceBase {
    "@type": "schema:Service";
}
/** A service provided by an organization, e.g. delivery service, print services, etc. */
export type Service = ServiceLeaf | BroadcastService | CableOrSatelliteService | FinancialProduct | FoodService | GovernmentService | Taxi | TaxiService | WebAPI;

interface ServiceChannelBase extends ThingBase {
    /** A language someone may use with or at the item, service or place. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/inLanguage inLanguage} */
    "schema:availableLanguage"?: SchemaValue<Language | Text | IdReference, "schema:availableLanguage">;
    /** Estimated processing time for the service using this channel. */
    "schema:processingTime"?: SchemaValue<Duration | IdReference, "schema:processingTime">;
    /** The service provided by this channel. */
    "schema:providesService"?: SchemaValue<Service | IdReference, "schema:providesService">;
    /** The location (e.g. civic structure, local business, etc.) where a person can go to access the service. */
    "schema:serviceLocation"?: SchemaValue<Place | IdReference, "schema:serviceLocation">;
    /** The phone number to use to access the service. */
    "schema:servicePhone"?: SchemaValue<ContactPoint | IdReference, "schema:servicePhone">;
    /** The address for accessing the service by mail. */
    "schema:servicePostalAddress"?: SchemaValue<PostalAddress | IdReference, "schema:servicePostalAddress">;
    /** The number to access the service by text message. */
    "schema:serviceSmsNumber"?: SchemaValue<ContactPoint | IdReference, "schema:serviceSmsNumber">;
    /** The website to access the service. */
    "schema:serviceUrl"?: SchemaValue<URL, "schema:serviceUrl">;
}
interface ServiceChannelLeaf extends ServiceChannelBase {
    "@type": "schema:ServiceChannel";
}
/** A means for accessing a service, e.g. a government office location, web site, or phone number. */
export type ServiceChannel = ServiceChannelLeaf;

interface ShapeLeaf extends UIElementBase {
    "@type": "uxi:Shape";
}
/** A Shape is an Atomic UI element that's used as a basic building block to make other UI elements. It can help express order, relation and hierarchy visually. More specialized examples are circle, triangle, rectangle etc */
export type Shape = ShapeLeaf | Circle | Ellipse | Rectangle | Star | Triangle;

interface ShareActionLeaf extends CommunicateActionBase {
    "@type": "schema:ShareAction";
}
/** The act of distributing content to people for their amusement or edification. */
export type ShareAction = ShareActionLeaf;

interface SheetMusicLeaf extends CreativeWorkBase {
    "@type": "schema:SheetMusic";
}
/** Printed music, as opposed to performed or recorded music. */
export type SheetMusic = SheetMusicLeaf;

interface ShippingDeliveryTimeBase extends ThingBase {
    /** Days of the week when the merchant typically operates, indicated via opening hours markup. */
    "schema:businessDays"?: SchemaValue<OpeningHoursSpecification | IdReference, "schema:businessDays">;
    /** Order cutoff time allows merchants to describe the time after which they will no longer process orders received on that day. For orders processed after cutoff time, one day gets added to the delivery time estimate. This property is expected to be most typically used via the {@link https://schema.org/ShippingRateSettings ShippingRateSettings} publication pattern. The time is indicated using the ISO-8601 Time format, e.g. "23:30:00-05:00" would represent 6:30 pm Eastern Standard Time (EST) which is 5 hours behind Coordinated Universal Time (UTC). */
    "schema:cutoffTime"?: SchemaValue<Time, "schema:cutoffTime">;
    /** The typical delay between the receipt of the order and the goods either leaving the warehouse or being prepared for pickup, in case the delivery method is on site pickup. Typical properties: minValue, maxValue, unitCode (d for DAY). This is by common convention assumed to mean business days (if a unitCode is used, coded as "d"), i.e. only counting days when the business normally operates. */
    "schema:handlingTime"?: SchemaValue<QuantitativeValue | IdReference, "schema:handlingTime">;
    /** The typical delay the order has been sent for delivery and the goods reach the final customer. Typical properties: minValue, maxValue, unitCode (d for DAY). */
    "schema:transitTime"?: SchemaValue<QuantitativeValue | IdReference, "schema:transitTime">;
}
interface ShippingDeliveryTimeLeaf extends ShippingDeliveryTimeBase {
    "@type": "schema:ShippingDeliveryTime";
}
/** ShippingDeliveryTime provides various pieces of information about delivery times for shipping. */
export type ShippingDeliveryTime = ShippingDeliveryTimeLeaf;

interface ShippingRateSettingsBase extends ThingBase {
    /** Indicates when shipping to a particular {@link https://schema.org/shippingDestination shippingDestination} is not available. */
    "schema:doesNotShip"?: SchemaValue<Boolean, "schema:doesNotShip">;
    /** A monetary value above which (or equal to) the shipping rate becomes free. Intended to be used via an {@link https://schema.org/OfferShippingDetails OfferShippingDetails} with {@link https://schema.org/shippingSettingsLink shippingSettingsLink} matching this {@link https://schema.org/ShippingRateSettings ShippingRateSettings}. */
    "schema:freeShippingThreshold"?: SchemaValue<DeliveryChargeSpecification | MonetaryAmount | IdReference, "schema:freeShippingThreshold">;
    /** This can be marked 'true' to indicate that some published {@link https://schema.org/DeliveryTimeSettings DeliveryTimeSettings} or {@link https://schema.org/ShippingRateSettings ShippingRateSettings} are intended to apply to all {@link https://schema.org/OfferShippingDetails OfferShippingDetails} published by the same merchant, when referenced by a {@link https://schema.org/shippingSettingsLink shippingSettingsLink} in those settings. It is not meaningful to use a 'true' value for this property alongside a transitTimeLabel (for {@link https://schema.org/DeliveryTimeSettings DeliveryTimeSettings}) or shippingLabel (for {@link https://schema.org/ShippingRateSettings ShippingRateSettings}), since this property is for use with unlabelled settings. */
    "schema:isUnlabelledFallback"?: SchemaValue<Boolean, "schema:isUnlabelledFallback">;
    /** indicates (possibly multiple) shipping destinations. These can be defined in several ways e.g. postalCode ranges. */
    "schema:shippingDestination"?: SchemaValue<DefinedRegion | IdReference, "schema:shippingDestination">;
    /** Label to match an {@link https://schema.org/OfferShippingDetails OfferShippingDetails} with a {@link https://schema.org/ShippingRateSettings ShippingRateSettings} (within the context of a {@link https://schema.org/shippingSettingsLink shippingSettingsLink} cross-reference). */
    "schema:shippingLabel"?: SchemaValue<Text, "schema:shippingLabel">;
    /** The shipping rate is the cost of shipping to the specified destination. Typically, the maxValue and currency values (of the {@link https://schema.org/MonetaryAmount MonetaryAmount}) are most appropriate. */
    "schema:shippingRate"?: SchemaValue<MonetaryAmount | IdReference, "schema:shippingRate">;
}
interface ShippingRateSettingsLeaf extends ShippingRateSettingsBase {
    "@type": "schema:ShippingRateSettings";
}
/** A ShippingRateSettings represents re-usable pieces of shipping information. It is designed for publication on an URL that may be referenced via the {@link https://schema.org/shippingSettingsLink shippingSettingsLink} property of an {@link https://schema.org/OfferShippingDetails OfferShippingDetails}. Several occurrences can be published, distinguished and matched (i.e. identified/referenced) by their different values for {@link https://schema.org/shippingLabel shippingLabel}. */
export type ShippingRateSettings = ShippingRateSettingsLeaf;

interface ShoeStoreLeaf extends LocalBusinessBase {
    "@type": "schema:ShoeStore";
}
/** A shoe store. */
export type ShoeStore = ShoeStoreLeaf | string;

interface ShoppingCenterLeaf extends LocalBusinessBase {
    "@type": "schema:ShoppingCenter";
}
/** A shopping center or mall. */
export type ShoppingCenter = ShoppingCenterLeaf | string;

interface ShortStoryLeaf extends CreativeWorkBase {
    "@type": "schema:ShortStory";
}
/** Short story or tale. A brief work of literature, usually written in narrative prose. */
export type ShortStory = ShortStoryLeaf;

interface SideEffectHandlerBase extends ElementBase {
    /** The input range defines the type(s) of data which a uxi:UIElement can consume. This can be used to choose UIElements automatically. E.g. in the case of a date picker this could be https://schema.org/Date or https://schema.org/DateTime. For the (sub-)uxi:UIElement for selecting a year inside that date picker, a uxi:UIPropertyValueSpecification could be used to narrow down the selection. Also useful for converting, sending or receiving data. */
    "uxi:inputRange"?: SchemaValue<Thing | UIDataType | IdReference, "uxi:inputRange">;
    /** The input trigger validator can be used with side-effect handlers, so that they only trigger when the input is valid. */
    "uxi:inputTriggerValidator"?: SchemaValue<Validator | IdReference, "uxi:inputTriggerValidator">;
    /** Output is the outcome property of something produced. A QR code generator can output an image file, a form can output a document to be signed, a digital signature app can output signed documents. Technically, outputs should be treated as side-effects/asynchronously, compare with uxi:result for immediate/synchronous outcomes. */
    "uxi:output"?: SchemaValue<Thing | IdReference, "uxi:output">;
}
interface SideEffectHandlerLeaf extends SideEffectHandlerBase {
    "@type": "uxi:SideEffectHandler";
}
/** The root class for all technical components that handle side effects like data fetching/sending, I/O or anything else outside the application state */
export type SideEffectHandler = SideEffectHandlerLeaf;

interface SingleFamilyResidenceBase extends HouseBase {
    /** The number of rooms (excluding bathrooms and closets) of the accommodation or lodging business. Typical unit code(s): ROM for room or C62 for no unit. The type of room can be put in the unitText property of the QuantitativeValue. */
    "schema:numberOfRooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfRooms">;
    /** The allowed total occupancy for the accommodation in persons (including infants etc). For individual accommodations, this is not necessarily the legal maximum but defines the permitted usage as per the contractual agreement (e.g. a double room used by a single person). Typical unit code(s): C62 for person */
    "schema:occupancy"?: SchemaValue<QuantitativeValue | IdReference, "schema:occupancy">;
}
interface SingleFamilyResidenceLeaf extends SingleFamilyResidenceBase {
    "@type": "schema:SingleFamilyResidence";
}
/** Residence type: Single-family home. */
export type SingleFamilyResidence = SingleFamilyResidenceLeaf | string;

interface SingleSelectionBase extends ContainerUIElementBase {
    /** The technical position of the item that the user has selected */
    "uxi:selectedIndex"?: SchemaValue<Number, "uxi:selectedIndex">;
}
interface SingleSelectionLeaf extends SingleSelectionBase {
    "@type": "uxi:SingleSelection";
}
/** A Single Selection is a Container UI Element which is part of a controlling element that only allows one item inside the container to be selected. Selection can be indicated by borders, colors, size or texture, but a SelectedIndex should be included for accessibility. */
export type SingleSelection = SingleSelectionLeaf;

interface SiteNavigationElementLeaf extends WebPageElementBase {
    "@type": "schema:SiteNavigationElement";
}
/** A navigation element of the page. */
export type SiteNavigationElement = SiteNavigationElementLeaf;

interface SizeGroupEnumerationLeaf extends EnumerationBase {
    "@type": "schema:SizeGroupEnumeration";
}
/** Enumerates common size groups for various product categories. */
export type SizeGroupEnumeration = SizeGroupEnumerationLeaf | WearableSizeGroupEnumeration;

interface SizeSpecificationBase extends QualitativeValueBase {
    /** A product measurement, for example the inseam of pants, the wheel size of a bicycle, or the gauge of a screw. Usually an exact measurement, but can also be a range of measurements for adjustable products, for example belts and ski bindings. */
    "schema:hasMeasurement"?: SchemaValue<QuantitativeValue | IdReference, "schema:hasMeasurement">;
    /** The size group (also known as "size type") for a product's size. Size groups are common in the fashion industry to define size segments and suggested audiences for wearable products. Multiple values can be combined, for example "men's big and tall", "petite maternity" or "regular" */
    "schema:sizeGroup"?: SchemaValue<SizeGroupEnumeration | Text | IdReference, "schema:sizeGroup">;
    /** The size system used to identify a product's size. Typically either a standard (for example, "GS1" or "ISO-EN13402"), country code (for example "US" or "JP"), or a measuring system (for example "Metric" or "Imperial"). */
    "schema:sizeSystem"?: SchemaValue<SizeSystemEnumeration | Text | IdReference, "schema:sizeSystem">;
    /** The age or age range for the intended audience or person, for example 3-12 months for infants, 1-5 years for toddlers. */
    "schema:suggestedAge"?: SchemaValue<QuantitativeValue | IdReference, "schema:suggestedAge">;
    /** The suggested gender of the intended person or audience, for example "male", "female", or "unisex". */
    "schema:suggestedGender"?: SchemaValue<GenderType | Text | IdReference, "schema:suggestedGender">;
    /** A suggested range of body measurements for the intended audience or person, for example inseam between 32 and 34 inches or height between 170 and 190 cm. Typically found on a size chart for wearable products. */
    "schema:suggestedMeasurement"?: SchemaValue<QuantitativeValue | IdReference, "schema:suggestedMeasurement">;
}
interface SizeSpecificationLeaf extends SizeSpecificationBase {
    "@type": "schema:SizeSpecification";
}
/** Size related properties of a product, typically a size code ({@link https://schema.org/name name}) and optionally a {@link https://schema.org/sizeSystem sizeSystem}, {@link https://schema.org/sizeGroup sizeGroup}, and product measurements ({@link https://schema.org/hasMeasurement hasMeasurement}). In addition, the intended audience can be defined through {@link https://schema.org/suggestedAge suggestedAge}, {@link https://schema.org/suggestedGender suggestedGender}, and suggested body measurements ({@link https://schema.org/suggestedMeasurement suggestedMeasurement}). */
export type SizeSpecification = SizeSpecificationLeaf;

interface SizeSystemEnumerationLeaf extends EnumerationBase {
    "@type": "schema:SizeSystemEnumeration";
}
/** Enumerates common size systems for different categories of products, for example "EN-13402" or "UK" for wearables or "Imperial" for screws. */
export type SizeSystemEnumeration = "https://schema.org/SizeSystemImperial" | "schema:SizeSystemImperial" | "https://schema.org/SizeSystemMetric" | "schema:SizeSystemMetric" | SizeSystemEnumerationLeaf | WearableSizeSystemEnumeration;

interface SkeletonStateLeaf extends ElementBase {
    "@type": "uxi:SkeletonState";
}
/** The skeleton state is a way of showing positions and layout of content before it is loaded or otherwise available. It is often a grayed out or boxed out version of the contentful UI */
export type SkeletonState = SkeletonStateLeaf;

interface SkiResortBase extends LodgingBusinessBase, LocalBusinessBase {
}
interface SkiResortLeaf extends SkiResortBase {
    "@type": "schema:SkiResort";
}
/** A ski resort. */
export type SkiResort = SkiResortLeaf | string;

interface SocialEventLeaf extends EventBase {
    "@type": "schema:SocialEvent";
}
/** Event type: Social event. */
export type SocialEvent = SocialEventLeaf;

interface SocialMediaPostingBase extends ArticleBase {
    /** A CreativeWork such as an image, video, or audio clip shared as part of this posting. */
    "schema:sharedContent"?: SchemaValue<CreativeWork | IdReference, "schema:sharedContent">;
}
interface SocialMediaPostingLeaf extends SocialMediaPostingBase {
    "@type": "schema:SocialMediaPosting";
}
/** A post to a social media platform, including blog posts, tweets, Facebook posts, etc. */
export type SocialMediaPosting = SocialMediaPostingLeaf | BlogPosting | DiscussionForumPosting;

interface SoftwareApplicationBase extends CreativeWorkBase {
    /** Type of software application, e.g. 'Game, Multimedia'. */
    "schema:applicationCategory"?: SchemaValue<Text | URL, "schema:applicationCategory">;
    /** Subcategory of the application, e.g. 'Arcade Game'. */
    "schema:applicationSubCategory"?: SchemaValue<Text | URL, "schema:applicationSubCategory">;
    /** The name of the application suite to which the application belongs (e.g. Excel belongs to Office). */
    "schema:applicationSuite"?: SchemaValue<Text, "schema:applicationSuite">;
    /** Device required to run the application. Used in cases where a specific make/model is required to run the application. */
    "schema:availableOnDevice"?: SchemaValue<Text, "schema:availableOnDevice">;
    /** Countries for which the application is not supported. You can also provide the two-letter ISO 3166-1 alpha-2 country code. */
    "schema:countriesNotSupported"?: SchemaValue<Text, "schema:countriesNotSupported">;
    /** Countries for which the application is supported. You can also provide the two-letter ISO 3166-1 alpha-2 country code. */
    "schema:countriesSupported"?: SchemaValue<Text, "schema:countriesSupported">;
    /**
     * Device required to run the application. Used in cases where a specific make/model is required to run the application.
     *
     * @deprecated Consider using https://schema.org/availableOnDevice instead.
     */
    "schema:device"?: SchemaValue<Text, "schema:device">;
    /** If the file can be downloaded, URL to download the binary. */
    "schema:downloadUrl"?: SchemaValue<URL, "schema:downloadUrl">;
    /** Features or modules provided by this application (and possibly required by other applications). */
    "schema:featureList"?: SchemaValue<Text | URL, "schema:featureList">;
    /** Size of the application / package (e.g. 18MB). In the absence of a unit (MB, KB etc.), KB will be assumed. */
    "schema:fileSize"?: SchemaValue<Text, "schema:fileSize">;
    /** URL at which the app may be installed, if different from the URL of the item. */
    "schema:installUrl"?: SchemaValue<URL, "schema:installUrl">;
    /** Minimum memory requirements. */
    "schema:memoryRequirements"?: SchemaValue<Text | URL, "schema:memoryRequirements">;
    /** Operating systems supported (Windows 7, OSX 10.6, Android 1.6). */
    "schema:operatingSystem"?: SchemaValue<Text, "schema:operatingSystem">;
    /** Permission(s) required to run the app (for example, a mobile app may require full internet access or may run only on wifi). */
    "schema:permissions"?: SchemaValue<Text, "schema:permissions">;
    /** Processor architecture required to run the application (e.g. IA64). */
    "schema:processorRequirements"?: SchemaValue<Text, "schema:processorRequirements">;
    /** Description of what changed in this version. */
    "schema:releaseNotes"?: SchemaValue<Text | URL, "schema:releaseNotes">;
    /**
     * Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (Examples: DirectX, Java or .NET runtime).
     *
     * @deprecated Consider using https://schema.org/softwareRequirements instead.
     */
    "schema:requirements"?: SchemaValue<Text | URL, "schema:requirements">;
    /** A link to a screenshot image of the app. */
    "schema:screenshot"?: SchemaValue<ImageObject | URL | IdReference, "schema:screenshot">;
    /** Additional content for a software application. */
    "schema:softwareAddOn"?: SchemaValue<SoftwareApplication | IdReference, "schema:softwareAddOn">;
    /** Software application help. */
    "schema:softwareHelp"?: SchemaValue<CreativeWork | IdReference, "schema:softwareHelp">;
    /** Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (Examples: DirectX, Java or .NET runtime). */
    "schema:softwareRequirements"?: SchemaValue<Text | URL, "schema:softwareRequirements">;
    /** Version of the software instance. */
    "schema:softwareVersion"?: SchemaValue<Text, "schema:softwareVersion">;
    /** Storage requirements (free space required). */
    "schema:storageRequirements"?: SchemaValue<Text | URL, "schema:storageRequirements">;
    /** Supporting data for a SoftwareApplication. */
    "schema:supportingData"?: SchemaValue<DataFeed | IdReference, "schema:supportingData">;
}
interface SoftwareApplicationLeaf extends SoftwareApplicationBase {
    "@type": "schema:SoftwareApplication";
}
/** A software application. */
export type SoftwareApplication = SoftwareApplicationLeaf | MobileApplication | VideoGame | WebApplication;

interface SoftwareSourceCodeBase extends CreativeWorkBase {
    /** Link to the repository where the un-compiled, human readable code and related code is located (SVN, github, CodePlex). */
    "schema:codeRepository"?: SchemaValue<URL, "schema:codeRepository">;
    /** What type of code sample: full (compile ready) solution, code snippet, inline code, scripts, template. */
    "schema:codeSampleType"?: SchemaValue<Text, "schema:codeSampleType">;
    /** The computer programming language. */
    "schema:programmingLanguage"?: SchemaValue<ComputerLanguage | Text | IdReference, "schema:programmingLanguage">;
    /**
     * Runtime platform or script interpreter dependencies (Example - Java v1, Python2.3, .Net Framework 3.0).
     *
     * @deprecated Consider using https://schema.org/runtimePlatform instead.
     */
    "schema:runtime"?: SchemaValue<Text, "schema:runtime">;
    /** Runtime platform or script interpreter dependencies (Example - Java v1, Python2.3, .Net Framework 3.0). */
    "schema:runtimePlatform"?: SchemaValue<Text, "schema:runtimePlatform">;
    /**
     * What type of code sample: full (compile ready) solution, code snippet, inline code, scripts, template.
     *
     * @deprecated Consider using https://schema.org/codeSampleType instead.
     */
    "schema:sampleType"?: SchemaValue<Text, "schema:sampleType">;
    /** Target Operating System / Product to which the code applies. If applies to several versions, just the product name can be used. */
    "schema:targetProduct"?: SchemaValue<SoftwareApplication | IdReference, "schema:targetProduct">;
}
interface SoftwareSourceCodeLeaf extends SoftwareSourceCodeBase {
    "@type": "schema:SoftwareSourceCode";
}
/** Computer programming source code. Example: Full (compile ready) solutions, code snippet samples, scripts, templates. */
export type SoftwareSourceCode = SoftwareSourceCodeLeaf;

interface SolveMathActionBase extends ActionBase {
    /** For questions that are part of learning resources (e.g. Quiz), eduQuestionType indicates the format of question being given. Example: "Multiple choice", "Open ended", "Flashcard". */
    "schema:eduQuestionType"?: SchemaValue<Text, "schema:eduQuestionType">;
}
interface SolveMathActionLeaf extends SolveMathActionBase {
    "@type": "schema:SolveMathAction";
}
/** The action that takes in a math expression and directs users to a page potentially capable of solving/simplifying that expression. */
export type SolveMathAction = SolveMathActionLeaf;

interface SomeProductsBase extends ProductBase {
    /** The current approximate inventory level for the item or items. */
    "schema:inventoryLevel"?: SchemaValue<QuantitativeValue | IdReference, "schema:inventoryLevel">;
}
interface SomeProductsLeaf extends SomeProductsBase {
    "@type": "schema:SomeProducts";
}
/** A placeholder for multiple similar products of the same kind. */
export type SomeProducts = SomeProductsLeaf;

interface SortedStateLeaf extends ElementBase {
    "@type": "uxi:SortedState";
}
/** A container in the sorted state displays its elements in order. Often a UI element outside the container is used to control the sorting, e.g. one of the headers of a column in a table */
export type SortedState = SortedStateLeaf;

interface SpeakableSpecificationBase extends ThingBase {
    /** A CSS selector, e.g. of a {@link https://schema.org/SpeakableSpecification SpeakableSpecification} or {@link https://schema.org/WebPageElement WebPageElement}. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
    "schema:cssSelector"?: SchemaValue<CssSelectorType, "schema:cssSelector">;
    /** An XPath, e.g. of a {@link https://schema.org/SpeakableSpecification SpeakableSpecification} or {@link https://schema.org/WebPageElement WebPageElement}. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
    "schema:xpath"?: SchemaValue<XPathType, "schema:xpath">;
}
interface SpeakableSpecificationLeaf extends SpeakableSpecificationBase {
    "@type": "schema:SpeakableSpecification";
}
/** A SpeakableSpecification indicates (typically via {@link https://schema.org/xpath xpath} or {@link https://schema.org/cssSelector cssSelector}) sections of a document that are highlighted as particularly {@link https://schema.org/speakable speakable}. Instances of this type are expected to be used primarily as values of the {@link https://schema.org/speakable speakable} property. */
export type SpeakableSpecification = SpeakableSpecificationLeaf;

interface SpecialAnnouncementBase extends CreativeWorkBase {
    /** Indicates a specific {@link https://schema.org/CivicStructure CivicStructure} or {@link https://schema.org/LocalBusiness LocalBusiness} associated with the SpecialAnnouncement. For example, a specific testing facility or business with special opening hours. For a larger geographic region like a quarantine of an entire region, use {@link https://schema.org/spatialCoverage spatialCoverage}. */
    "schema:announcementLocation"?: SchemaValue<CivicStructure | LocalBusiness | IdReference, "schema:announcementLocation">;
    /** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
    "schema:category"?: SchemaValue<PhysicalActivityCategory | Text | Thing | URL | IdReference, "schema:category">;
    /** Publication date of an online listing. */
    "schema:datePosted"?: SchemaValue<Date | DateTime, "schema:datePosted">;
    /** Information about disease prevention. */
    "schema:diseasePreventionInfo"?: SchemaValue<URL | WebContent | IdReference, "schema:diseasePreventionInfo">;
    /** Statistical information about the spread of a disease, either as {@link https://schema.org/WebContent WebContent}, or described directly as a {@link https://schema.org/Dataset Dataset}, or the specific {@link https://schema.org/Observation Observation}s in the dataset. When a {@link https://schema.org/WebContent WebContent} URL is provided, the page indicated might also contain more such markup. */
    "schema:diseaseSpreadStatistics"?: SchemaValue<Dataset | Observation | URL | WebContent | IdReference, "schema:diseaseSpreadStatistics">;
    /** Information about getting tested (for a {@link https://schema.org/MedicalCondition MedicalCondition}), e.g. in the context of a pandemic. */
    "schema:gettingTestedInfo"?: SchemaValue<URL | WebContent | IdReference, "schema:gettingTestedInfo">;
    /** governmentBenefitsInfo provides information about government benefits associated with a SpecialAnnouncement. */
    "schema:governmentBenefitsInfo"?: SchemaValue<GovernmentService | IdReference, "schema:governmentBenefitsInfo">;
    /** Indicates a page with news updates and guidelines. This could often be (but is not required to be) the main page containing {@link https://schema.org/SpecialAnnouncement SpecialAnnouncement} markup on a site. */
    "schema:newsUpdatesAndGuidelines"?: SchemaValue<URL | WebContent | IdReference, "schema:newsUpdatesAndGuidelines">;
    /** Information about public transport closures. */
    "schema:publicTransportClosuresInfo"?: SchemaValue<URL | WebContent | IdReference, "schema:publicTransportClosuresInfo">;
    /** Guidelines about quarantine rules, e.g. in the context of a pandemic. */
    "schema:quarantineGuidelines"?: SchemaValue<URL | WebContent | IdReference, "schema:quarantineGuidelines">;
    /** Information about school closures. */
    "schema:schoolClosuresInfo"?: SchemaValue<URL | WebContent | IdReference, "schema:schoolClosuresInfo">;
    /** Information about travel bans, e.g. in the context of a pandemic. */
    "schema:travelBans"?: SchemaValue<URL | WebContent | IdReference, "schema:travelBans">;
    /** The URL for a feed, e.g. associated with a podcast series, blog, or series of date-stamped updates. This is usually RSS or Atom. */
    "schema:webFeed"?: SchemaValue<DataFeed | URL | IdReference, "schema:webFeed">;
}
interface SpecialAnnouncementLeaf extends SpecialAnnouncementBase {
    "@type": "schema:SpecialAnnouncement";
}
/**
 * A SpecialAnnouncement combines a simple date-stamped textual information update with contextualized Web links and other structured data. It represents an information update made by a locally-oriented organization, for example schools, pharmacies, healthcare providers, community groups, police, local government.
 *
 * For work in progress guidelines on Coronavirus-related markup see {@link https://docs.google.com/document/d/14ikaGCKxo50rRM7nvKSlbUpjyIk2WMQd3IkB1lItlrM/edit# this doc}.
 *
 * The motivating scenario for SpecialAnnouncement is the {@link https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic Coronavirus pandemic}, and the initial vocabulary is oriented to this urgent situation. Schema.org expect to improve the markup iteratively as it is deployed and as feedback emerges from use. In addition to our usual {@link https://github.com/schemaorg/schemaorg/issues/2490 Github entry}, feedback comments can also be provided in {@link https://docs.google.com/document/d/1fpdFFxk8s87CWwACs53SGkYv3aafSxz_DTtOQxMrBJQ/edit# this document}.
 *
 * While this schema is designed to communicate urgent crisis-related information, it is not the same as an emergency warning technology like {@link https://en.wikipedia.org/wiki/Common_Alerting_Protocol CAP}, although there may be overlaps. The intent is to cover the kinds of everyday practical information being posted to existing websites during an emergency situation.
 *
 * Several kinds of information can be provided:
 *
 * We encourage the provision of "name", "text", "datePosted", "expires" (if appropriate), "category" and "url" as a simple baseline. It is important to provide a value for "category" where possible, most ideally as a well known URL from Wikipedia or Wikidata. In the case of the 2019-2020 Coronavirus pandemic, this should be "https://en.wikipedia.org/w/index.php?title=2019-20_coronavirus_pandemic" or "https://www.wikidata.org/wiki/Q81068910".
 *
 * For many of the possible properties, values can either be simple links or an inline description, depending on whether a summary is available. For a link, provide just the URL of the appropriate page as the property's value. For an inline description, use a {@link https://schema.org/WebContent WebContent} type, and provide the url as a property of that, alongside at least a simple "{@link https://schema.org/text text}" summary of the page. It is unlikely that a single SpecialAnnouncement will need all of the possible properties simultaneously.
 *
 * We expect that in many cases the page referenced might contain more specialized structured data, e.g. contact info, {@link https://schema.org/openingHours openingHours}, {@link https://schema.org/Event Event}, {@link https://schema.org/FAQPage FAQPage} etc. By linking to those pages from a {@link https://schema.org/SpecialAnnouncement SpecialAnnouncement} you can help make it clearer that the events are related to the situation (e.g. Coronavirus) indicated by the {@link https://schema.org/category category} property of the {@link https://schema.org/SpecialAnnouncement SpecialAnnouncement}.
 *
 * Many {@link https://schema.org/SpecialAnnouncement SpecialAnnouncement}s will relate to particular regions and to identifiable local organizations. Use {@link https://schema.org/spatialCoverage spatialCoverage} for the region, and {@link https://schema.org/announcementLocation announcementLocation} to indicate specific {@link https://schema.org/LocalBusiness LocalBusiness}es and {@link https://schema.org/CivicStructure CivicStructure}s. If the announcement affects both a particular region and a specific location (for example, a library closure that serves an entire region), use both {@link https://schema.org/spatialCoverage spatialCoverage} and {@link https://schema.org/announcementLocation announcementLocation}.
 *
 * The {@link https://schema.org/about about} property can be used to indicate entities that are the focus of the announcement. We now recommend using {@link https://schema.org/about about} only for representing non-location entities (e.g. a {@link https://schema.org/Course Course} or a {@link https://schema.org/RadioStation RadioStation}). For places, use {@link https://schema.org/announcementLocation announcementLocation} and {@link https://schema.org/spatialCoverage spatialCoverage}. Consumers of this markup should be aware that the initial design encouraged the use of /about for locations too.
 *
 * The basic content of {@link https://schema.org/SpecialAnnouncement SpecialAnnouncement} is similar to that of an {@link https://en.wikipedia.org/wiki/RSS RSS} or {@link https://en.wikipedia.org/wiki/Atom_(Web_standard) Atom} feed. For publishers without such feeds, basic feed-like information can be shared by posting {@link https://schema.org/SpecialAnnouncement SpecialAnnouncement} updates in a page, e.g. using JSON-LD. For sites with Atom/RSS functionality, you can point to a feed with the {@link https://schema.org/webFeed webFeed} property. This can be a simple URL, or an inline {@link https://schema.org/DataFeed DataFeed} object, with {@link https://schema.org/encodingFormat encodingFormat} providing media type information e.g. "application/rss+xml" or "application/atom+xml".
 */
export type SpecialAnnouncement = SpecialAnnouncementLeaf;

interface SpecialtyLeaf extends EnumerationBase {
    "@type": "schema:Specialty";
}
/** Any branch of a field in which people typically develop specific expertise, usually after significant study, time, and effort. */
export type Specialty = SpecialtyLeaf | MedicalSpecialty;

interface SportingGoodsStoreLeaf extends LocalBusinessBase {
    "@type": "schema:SportingGoodsStore";
}
/** A sporting goods store. */
export type SportingGoodsStore = SportingGoodsStoreLeaf | string;

interface SportsActivityLocationLeaf extends LocalBusinessBase {
    "@type": "schema:SportsActivityLocation";
}
/** A sports location, such as a playing field. */
export type SportsActivityLocation = SportsActivityLocationLeaf | BowlingAlley | ExerciseGym | GolfCourse | HealthClub | PublicSwimmingPool | SkiResort | SportsClub | StadiumOrArena | TennisComplex | string;

interface SportsClubLeaf extends LocalBusinessBase {
    "@type": "schema:SportsClub";
}
/** A sports club. */
export type SportsClub = SportsClubLeaf | string;

interface SportsEventBase extends EventBase {
    /** The away team in a sports event. */
    "schema:awayTeam"?: SchemaValue<Person | SportsTeam | IdReference, "schema:awayTeam">;
    /** A competitor in a sports event. */
    "schema:competitor"?: SchemaValue<Person | SportsTeam | IdReference, "schema:competitor">;
    /** The home team in a sports event. */
    "schema:homeTeam"?: SchemaValue<Person | SportsTeam | IdReference, "schema:homeTeam">;
    /** A type of sport (e.g. Baseball). */
    "schema:sport"?: SchemaValue<Text | URL, "schema:sport">;
}
interface SportsEventLeaf extends SportsEventBase {
    "@type": "schema:SportsEvent";
}
/** Event type: Sports event. */
export type SportsEvent = SportsEventLeaf;

interface SportsOrganizationBase extends OrganizationBase {
    /** A type of sport (e.g. Baseball). */
    "schema:sport"?: SchemaValue<Text | URL, "schema:sport">;
}
interface SportsOrganizationLeaf extends SportsOrganizationBase {
    "@type": "schema:SportsOrganization";
}
/** Represents the collection of all sports organizations, including sports teams, governing bodies, and sports associations. */
export type SportsOrganization = SportsOrganizationLeaf | SportsTeam | string;

interface SportsTeamBase extends SportsOrganizationBase {
    /** A person that acts as performing member of a sports team; a player as opposed to a coach. */
    "schema:athlete"?: SchemaValue<Person | IdReference, "schema:athlete">;
    /** A person that acts in a coaching role for a sports team. */
    "schema:coach"?: SchemaValue<Person | IdReference, "schema:coach">;
    /** Gender of something, typically a {@link https://schema.org/Person Person}, but possibly also fictional characters, animals, etc. While https://schema.org/Male and https://schema.org/Female may be used, text strings are also acceptable for people who do not identify as a binary gender. The {@link https://schema.org/gender gender} property can also be used in an extended sense to cover e.g. the gender of sports teams. As with the gender of individuals, we do not try to enumerate all possibilities. A mixed-gender {@link https://schema.org/SportsTeam SportsTeam} can be indicated with a text value of "Mixed". */
    "schema:gender"?: SchemaValue<GenderType | Text | IdReference, "schema:gender">;
}
interface SportsTeamLeaf extends SportsTeamBase {
    "@type": "schema:SportsTeam";
}
/** Organization: Sports team. */
export type SportsTeam = SportsTeamLeaf | string;

interface SpreadsheetDigitalDocumentLeaf extends DigitalDocumentBase {
    "@type": "schema:SpreadsheetDigitalDocument";
}
/** A spreadsheet file. */
export type SpreadsheetDigitalDocument = SpreadsheetDigitalDocumentLeaf;

interface StadiumOrArenaBase extends CivicStructureBase, LocalBusinessBase {
}
interface StadiumOrArenaLeaf extends StadiumOrArenaBase {
    "@type": "schema:StadiumOrArena";
}
/** A stadium. */
export type StadiumOrArena = StadiumOrArenaLeaf | string;

interface StarLeaf extends UIElementBase {
    "@type": "uxi:Star";
}
/** A Star is a type of Shape that is often used for indicating a favorite, in which it is colored yellow. A number of 1-5 stars usually communicates a rating of some sort. To indicate that a favorite is not set or a rating doesn't have full stars, the remaining stars are often grey and outlined, while the favorite or 'achieved' stars are filled and yellow. */
export type Star = StarLeaf;

interface StartActionLeaf extends UIActionBase {
    "@type": "uxi:StartAction";
}
/** A start action initiates the playback of media, or the start of a game. Can also be used to re-start after the user has paused */
export type StartAction = StartActionLeaf;

interface StateLeaf extends PlaceBase {
    "@type": "schema:State";
}
/** A state or province of a country. */
export type State = StateLeaf | string;

interface StatementLeaf extends CreativeWorkBase {
    "@type": "schema:Statement";
}
/** A statement about something, for example a fun or interesting fact. If known, the main entity this statement is about, can be indicated using mainEntity. For more formal claims (e.g. in Fact Checking), consider using {@link https://schema.org/Claim Claim} instead. Use the {@link https://schema.org/text text} property to capture the text of the statement. */
export type Statement = StatementLeaf;

interface StatisticalPopulationBase extends ThingBase {
    /** Indicates a property used as a constraint to define a {@link https://schema.org/StatisticalPopulation StatisticalPopulation} with respect to the set of entities corresponding to an indicated type (via {@link https://schema.org/populationType populationType}). */
    "schema:constrainingProperty"?: SchemaValue<Integer, "schema:constrainingProperty">;
    /** Indicates the number of constraints (not counting {@link https://schema.org/populationType populationType}) defined for a particular {@link https://schema.org/StatisticalPopulation StatisticalPopulation}. This helps applications understand if they have access to a sufficiently complete description of a {@link https://schema.org/StatisticalPopulation StatisticalPopulation}. */
    "schema:numConstraints"?: SchemaValue<Integer, "schema:numConstraints">;
    /** Indicates the populationType common to all members of a {@link https://schema.org/StatisticalPopulation StatisticalPopulation}. */
    "schema:populationType"?: SchemaValue<Class | IdReference, "schema:populationType">;
}
interface StatisticalPopulationLeaf extends StatisticalPopulationBase {
    "@type": "schema:StatisticalPopulation";
}
/** A StatisticalPopulation is a set of instances of a certain given type that satisfy some set of constraints. The property {@link https://schema.org/populationType populationType} is used to specify the type. Any property that can be used on instances of that type can appear on the statistical population. For example, a {@link https://schema.org/StatisticalPopulation StatisticalPopulation} representing all {@link https://schema.org/Person Person}s with a {@link https://schema.org/homeLocation homeLocation} of East Podunk California, would be described by applying the appropriate {@link https://schema.org/homeLocation homeLocation} and {@link https://schema.org/populationType populationType} properties to a {@link https://schema.org/StatisticalPopulation StatisticalPopulation} item that stands for that set of people. The properties {@link https://schema.org/numConstraints numConstraints} and {@link https://schema.org/constrainingProperty constrainingProperty} are used to specify which of the populations properties are used to specify the population. Note that the sense of "population" used here is the general sense of a statistical population, and does not imply that the population consists of people. For example, a {@link https://schema.org/populationType populationType} of {@link https://schema.org/Event Event} or {@link https://schema.org/NewsArticle NewsArticle} could be used. See also {@link https://schema.org/Observation Observation}, and the {@link /docs/data-and-datasets.html data and datasets} overview for more details. */
export type StatisticalPopulation = StatisticalPopulationLeaf;

interface StatusEnumerationLeaf extends EnumerationBase {
    "@type": "schema:StatusEnumeration";
}
/** Lists or enumerations dealing with status types. */
export type StatusEnumeration = StatusEnumerationLeaf | ActionStatusType | EventStatusType | GameServerStatus | LegalForceStatus | OrderStatus | PaymentStatusType | ReservationStatusType;

interface SteeringPositionValueLeaf extends QualitativeValueBase {
    "@type": "schema:SteeringPositionValue";
}
/** A value indicating a steering position. */
export type SteeringPositionValue = "https://schema.org/LeftHandDriving" | "schema:LeftHandDriving" | "https://schema.org/RightHandDriving" | "schema:RightHandDriving" | SteeringPositionValueLeaf;

interface StepLeaf extends UIElementBase {
    "@type": "uxi:Step";
}
/** A Step is a type of Molecule UI Element which guides users through the steps of a task or workflow. Multiple steps combined form a wizard, which helps to break down long and complex processes: Breaking a complex task into smaller steps can improve conversion. */
export type Step = StepLeaf;

interface StopActionLeaf extends UIActionBase {
    "@type": "uxi:StopAction";
}
/** A stop action can be used to end media playback so that a start action will initiate it from the beginning */
export type StopAction = StopActionLeaf;

interface StoreLeaf extends LocalBusinessBase {
    "@type": "schema:Store";
}
/** A retail good store. */
export type Store = StoreLeaf | AutoPartsStore | BikeStore | BookStore | ClothingStore | ComputerStore | ConvenienceStore | DepartmentStore | ElectronicsStore | Florist | FurnitureStore | GardenStore | GroceryStore | HardwareStore | HobbyShop | HomeGoodsStore | JewelryStore | LiquorStore | MensClothingStore | MobilePhoneStore | MovieRentalStore | MusicStore | OfficeEquipmentStore | OutletStore | PawnShop | PetStore | ShoeStore | SportingGoodsStore | TireShop | ToyStore | WholesaleStore | string;

interface StructuralElementLeaf extends ElementBase {
    "@type": "uxi:StructuralElement";
}
/** Structural elements express structure of elements in the user interface, e.g. ABTest, Form, Template, Placeholder, Autocomplete. They're not necessarily visible elements. */
export type StructuralElement = StructuralElementLeaf | ABTest | Autocomplete | Constraint | Context | Form | Page | Placeholder | Scope | Template;

interface StructuredValueLeaf extends ThingBase {
    "@type": "schema:StructuredValue";
}
/** Structured values are used when the value of a property has a more complex structure than simply being a textual value or a reference to another thing. */
export type StructuredValue = StructuredValueLeaf | CDCPMDRecord | ContactPoint | DatedMoneySpecification | DefinedRegion | DeliveryTimeSettings | EngineSpecification | ExchangeRateSpecification | GeoCoordinates | GeoShape | InteractionCounter | MonetaryAmount | NutritionInformation | OfferShippingDetails | OpeningHoursSpecification | OwnershipInfo | PostalCodeRangeSpecification | PriceSpecification | PropertyValue | QuantitativeValue | QuantitativeValueDistribution | RepaymentSpecification | ShippingDeliveryTime | ShippingRateSettings | TypeAndQuantityNode | WarrantyPromise;

interface SubheadingLeaf extends UIElementBase {
    "@type": "uxi:Subheading";
}
/** A Subheading can refer to an additional headline similar to Subtitle. It can also be the heading of a smaller portion of a piece of writing */
export type Subheading = SubheadingLeaf;

interface SubscribeActionLeaf extends ActionBase {
    "@type": "schema:SubscribeAction";
}
/**
 * The act of forming a personal connection with someone/something (object) unidirectionally/asymmetrically to get updates pushed to.
 *
 * Related actions:
 * - {@link https://schema.org/FollowAction FollowAction}: Unlike FollowAction, SubscribeAction implies that the subscriber acts as a passive agent being constantly/actively pushed for updates.
 * - {@link https://schema.org/RegisterAction RegisterAction}: Unlike RegisterAction, SubscribeAction implies that the agent is interested in continuing receiving updates from the object.
 * - {@link https://schema.org/JoinAction JoinAction}: Unlike JoinAction, SubscribeAction implies that the agent is interested in continuing receiving updates from the object.
 */
export type SubscribeAction = SubscribeActionLeaf;

interface SubstanceBase extends MedicalEntityBase {
    /** An active ingredient, typically chemical compounds and/or biologic substances. */
    "schema:activeIngredient"?: SchemaValue<Text, "schema:activeIngredient">;
    /** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
    "schema:maximumIntake"?: SchemaValue<MaximumDoseSchedule | IdReference, "schema:maximumIntake">;
}
interface SubstanceLeaf extends SubstanceBase {
    "@type": "schema:Substance";
}
/** Any matter of defined composition that has discrete existence, whose origin may be biological, mineral or chemical. */
export type Substance = SubstanceLeaf | DietarySupplement | Drug;

interface SubtitleLeaf extends UIElementBase {
    "@type": "uxi:Subtitle";
}
/** A subtitle is often used to describe a title more closely. It can also tell the userwhat benefit to expect, or clarify the title. Check subheading for this usage. Also can be a synonym for closed-captioned text */
export type Subtitle = SubtitleLeaf;

interface SubwayStationLeaf extends CivicStructureBase {
    "@type": "schema:SubwayStation";
}
/** A subway station. */
export type SubwayStation = SubwayStationLeaf | string;

interface SuiteBase extends AccommodationBase {
    /** The type of bed or beds included in the accommodation. For the single case of just one bed of a certain type, you use bed directly with a text. If you want to indicate the quantity of a certain kind of bed, use an instance of BedDetails. For more detailed information, use the amenityFeature property. */
    "schema:bed"?: SchemaValue<BedDetails | BedType | Text | IdReference, "schema:bed">;
    /** The number of rooms (excluding bathrooms and closets) of the accommodation or lodging business. Typical unit code(s): ROM for room or C62 for no unit. The type of room can be put in the unitText property of the QuantitativeValue. */
    "schema:numberOfRooms"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfRooms">;
    /** The allowed total occupancy for the accommodation in persons (including infants etc). For individual accommodations, this is not necessarily the legal maximum but defines the permitted usage as per the contractual agreement (e.g. a double room used by a single person). Typical unit code(s): C62 for person */
    "schema:occupancy"?: SchemaValue<QuantitativeValue | IdReference, "schema:occupancy">;
}
interface SuiteLeaf extends SuiteBase {
    "@type": "schema:Suite";
}
/**
 * A suite in a hotel or other public accommodation, denotes a class of luxury accommodations, the key feature of which is multiple rooms (Source: Wikipedia, the free encyclopedia, see {@link http://en.wikipedia.org/wiki/Suite_(hotel) http://en.wikipedia.org/wiki/Suite_(hotel)}).
 *
 * See also the {@link /docs/hotels.html dedicated document on the use of schema.org for marking up hotels and other forms of accommodations}.
 */
export type Suite = SuiteLeaf | string;

interface SuperficialAnatomyBase extends MedicalEntityBase {
    /** If applicable, a description of the pathophysiology associated with the anatomical system, including potential abnormal changes in the mechanical, physical, and biochemical functions of the system. */
    "schema:associatedPathophysiology"?: SchemaValue<Text, "schema:associatedPathophysiology">;
    /** Anatomical systems or structures that relate to the superficial anatomy. */
    "schema:relatedAnatomy"?: SchemaValue<AnatomicalStructure | AnatomicalSystem | IdReference, "schema:relatedAnatomy">;
    /** A medical condition associated with this anatomy. */
    "schema:relatedCondition"?: SchemaValue<MedicalCondition | IdReference, "schema:relatedCondition">;
    /** A medical therapy related to this anatomy. */
    "schema:relatedTherapy"?: SchemaValue<MedicalTherapy | IdReference, "schema:relatedTherapy">;
    /** The significance associated with the superficial anatomy; as an example, how characteristics of the superficial anatomy can suggest underlying medical conditions or courses of treatment. */
    "schema:significance"?: SchemaValue<Text, "schema:significance">;
}
interface SuperficialAnatomyLeaf extends SuperficialAnatomyBase {
    "@type": "schema:SuperficialAnatomy";
}
/** Anatomical features that can be observed by sight (without dissection), including the form and proportions of the human body as well as surface landmarks that correspond to deeper subcutaneous structures. Superficial anatomy plays an important role in sports medicine, phlebotomy, and other medical specialties as underlying anatomical structures can be identified through surface palpation. For example, during back surgery, superficial anatomy can be used to palpate and count vertebrae to find the site of incision. Or in phlebotomy, superficial anatomy can be used to locate an underlying vein; for example, the median cubital vein can be located by palpating the borders of the cubital fossa (such as the epicondyles of the humerus) and then looking for the superficial signs of the vein, such as size, prominence, ability to refill after depression, and feel of surrounding tissue support. As another example, in a subluxation (dislocation) of the glenohumeral joint, the bony structure becomes pronounced with the deltoid muscle failing to cover the glenohumeral joint allowing the edges of the scapula to be superficially visible. Here, the superficial anatomy is the visible edges of the scapula, implying the underlying dislocation of the joint (the related anatomical structure). */
export type SuperficialAnatomy = SuperficialAnatomyLeaf;

interface SurgicalProcedureLeaf extends MedicalProcedureBase {
    "@type": "schema:SurgicalProcedure";
}
/** A medical procedure involving an incision with instruments; performed for diagnose, or therapeutic purposes. */
export type SurgicalProcedure = SurgicalProcedureLeaf;

interface SuspendActionLeaf extends ActionBase {
    "@type": "schema:SuspendAction";
}
/** The act of momentarily pausing a device or application (e.g. pause music playback or pause a timer). */
export type SuspendAction = SuspendActionLeaf;

interface SwipeActionLeaf extends UIActionBase {
    "@type": "uxi:SwipeAction";
}
/** A swipe action is a sweeping motion by the user, typically over a touchscreen. Some swipe actions might be reserved by the operating system, e.g. with multiple fingers, the back of the hand etc. */
export type SwipeAction = SwipeActionLeaf;

interface SwitchLeaf extends UIElementBase {
    "@type": "uxi:Switch";
}
/** A Switch is a UI element to let users toggle between two states or on-off settings. Users are used to seeing a reaction to clicking the switch immediately, based on their experience on mobile devices. Useful to control Boolean types. */
export type Switch = SwitchLeaf;

interface SynagogueLeaf extends CivicStructureBase {
    "@type": "schema:Synagogue";
}
/** A synagogue. */
export type Synagogue = SynagogueLeaf | string;

interface TableLeaf extends WebPageElementBase {
    "@type": "schema:Table";
}
/** A table on a Web page. */
export type Table = TableLeaf;

interface TabsBase extends ContainerUIElementBase {
    /** The technical position of the tab that the user has selected */
    "uxi:activeTabIndex"?: SchemaValue<Number, "uxi:activeTabIndex">;
}
interface TabsLeaf extends TabsBase {
    "@type": "uxi:Tabs";
}
/** Tabs are Container UI Elements shown as a group on the same page. Only one tab is fully visible at a time, the other tabs' content can be seen by clicking another element in the tab bar which controls the group. */
export type Tabs = TabsLeaf;

interface TakeActionLeaf extends TransferActionBase {
    "@type": "schema:TakeAction";
}
/**
 * The act of gaining ownership of an object from an origin. Reciprocal of GiveAction.
 *
 * Related actions:
 * - {@link https://schema.org/GiveAction GiveAction}: The reciprocal of TakeAction.
 * - {@link https://schema.org/ReceiveAction ReceiveAction}: Unlike ReceiveAction, TakeAction implies that ownership has been transfered.
 */
export type TakeAction = TakeActionLeaf;

interface TattooParlorLeaf extends LocalBusinessBase {
    "@type": "schema:TattooParlor";
}
/** A tattoo parlor. */
export type TattooParlor = TattooParlorLeaf | string;

interface TaxiLeaf extends ServiceBase {
    "@type": "schema:Taxi";
}
/**
 * A taxi.
 *
 * @deprecated Use TaxiService instead.
 */
export type Taxi = TaxiLeaf;

interface TaxiReservationBase extends ReservationBase {
    /** Number of people the reservation should accommodate. */
    "schema:partySize"?: SchemaValue<Integer | QuantitativeValue | IdReference, "schema:partySize">;
    /** Where a taxi will pick up a passenger or a rental car can be picked up. */
    "schema:pickupLocation"?: SchemaValue<Place | IdReference, "schema:pickupLocation">;
    /** When a taxi will pickup a passenger or a rental car can be picked up. */
    "schema:pickupTime"?: SchemaValue<DateTime, "schema:pickupTime">;
}
interface TaxiReservationLeaf extends TaxiReservationBase {
    "@type": "schema:TaxiReservation";
}
/**
 * A reservation for a taxi.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use {@link https://schema.org/Offer Offer}.
 */
export type TaxiReservation = TaxiReservationLeaf;

interface TaxiServiceLeaf extends ServiceBase {
    "@type": "schema:TaxiService";
}
/** A service for a vehicle for hire with a driver for local travel. Fares are usually calculated based on distance traveled. */
export type TaxiService = TaxiServiceLeaf;

interface TaxiStandLeaf extends CivicStructureBase {
    "@type": "schema:TaxiStand";
}
/** A taxi stand. */
export type TaxiStand = TaxiStandLeaf | string;

interface TaxonBase extends ThingBase {
    /** Closest child taxa of the taxon in question. */
    "schema:childTaxon"?: SchemaValue<Taxon | Text | URL | IdReference, "schema:childTaxon">;
    /** A Defined Term contained in this term set. */
    "schema:hasDefinedTerm"?: SchemaValue<DefinedTerm | IdReference, "schema:hasDefinedTerm">;
    /** Closest parent taxon of the taxon in question. */
    "schema:parentTaxon"?: SchemaValue<Taxon | Text | URL | IdReference, "schema:parentTaxon">;
    /** The taxonomic rank of this taxon given preferably as a URI from a controlled vocabulary – (typically the ranks from TDWG TaxonRank ontology or equivalent Wikidata URIs). */
    "schema:taxonRank"?: SchemaValue<PropertyValue | Text | URL | IdReference, "schema:taxonRank">;
}
interface TaxonLeaf extends TaxonBase {
    "@type": "schema:Taxon";
}
/** A set of organisms asserted to represent a natural cohesive biological unit. */
export type Taxon = TaxonLeaf;

interface TechArticleBase extends ArticleBase {
    /** Prerequisites needed to fulfill steps in article. */
    "schema:dependencies"?: SchemaValue<Text, "schema:dependencies">;
    /** Proficiency needed for this content; expected values: 'Beginner', 'Expert'. */
    "schema:proficiencyLevel"?: SchemaValue<Text, "schema:proficiencyLevel">;
}
interface TechArticleLeaf extends TechArticleBase {
    "@type": "schema:TechArticle";
}
/** A technical article - Example: How-to (task) topics, step-by-step, procedural troubleshooting, specifications, etc. */
export type TechArticle = TechArticleLeaf | APIReference;

interface TelevisionChannelLeaf extends BroadcastChannelBase {
    "@type": "schema:TelevisionChannel";
}
/** A unique instance of a television BroadcastService on a CableOrSatelliteService lineup. */
export type TelevisionChannel = TelevisionChannelLeaf;

interface TelevisionStationLeaf extends LocalBusinessBase {
    "@type": "schema:TelevisionStation";
}
/** A television station. */
export type TelevisionStation = TelevisionStationLeaf | string;

interface TemplateLeaf extends ElementBase {
    "@type": "uxi:Template";
}
/** A Template is a Structural Element that serves as a pattern to generate more, similar elements from it. Templates are meant to increase productivity, but can themself cost time if they're too restrictive or offer too complex choices for the person who's adjusting the template. */
export type Template = TemplateLeaf;

interface TennisComplexLeaf extends LocalBusinessBase {
    "@type": "schema:TennisComplex";
}
/** A tennis complex. */
export type TennisComplex = TennisComplexLeaf | string;

interface TextDigitalDocumentLeaf extends DigitalDocumentBase {
    "@type": "schema:TextDigitalDocument";
}
/** A file composed primarily of text. */
export type TextDigitalDocument = TextDigitalDocumentLeaf;

interface TextfieldLeaf extends UIElementBase {
    "@type": "uxi:Textfield";
}
/** A TextField is a UI element that allows Text to be entered. This text may be entered via a physical or virtual keyboard, or voice input. Which additional features like bold/italic text, size etc are offered depends on each application's individual requirements. Then these Elements might be referred to as Richtext, Editor or TextArea. Enabling Markdown-editing also gains wider adoption on the web. */
export type Textfield = TextfieldLeaf;

interface TextTypeBase extends ElementBase {
    /** Human-readable text values can have properties such as valueMinLength and valueMaxLength to describe them more closely */
    "uxi:TextTypeProperty"?: SchemaValue<Text, "uxi:TextTypeProperty">;
}
interface TextTypeLeaf extends TextTypeBase {
    "@type": "uxi:TextType";
}
/** Data type: Text. Human-readable terms that are expressed as text, like names, descriptions, messages, comments */
export type TextType = TextTypeLeaf;

interface TheaterEventLeaf extends EventBase {
    "@type": "schema:TheaterEvent";
}
/** Event type: Theater performance. */
export type TheaterEvent = TheaterEventLeaf;

interface TheaterGroupLeaf extends OrganizationBase {
    "@type": "schema:TheaterGroup";
}
/** A theater group or company, for example, the Royal Shakespeare Company or Druid Theatre. */
export type TheaterGroup = TheaterGroupLeaf | string;

interface TherapeuticProcedureBase extends MedicalProcedureBase {
    /** A possible complication and/or side effect of this therapy. If it is known that an adverse outcome is serious (resulting in death, disability, or permanent damage; requiring hospitalization; or is otherwise life-threatening or requires immediate medical attention), tag it as a seriouseAdverseOutcome instead. */
    "schema:adverseOutcome"?: SchemaValue<MedicalEntity | IdReference, "schema:adverseOutcome">;
    /** A dosing schedule for the drug for a given population, either observed, recommended, or maximum dose based on the type used. */
    "schema:doseSchedule"?: SchemaValue<DoseSchedule | IdReference, "schema:doseSchedule">;
    /** Specifying a drug or medicine used in a medication procedure. */
    "schema:drug"?: SchemaValue<Drug | IdReference, "schema:drug">;
}
interface TherapeuticProcedureLeaf extends TherapeuticProcedureBase {
    "@type": "schema:TherapeuticProcedure";
}
/** A medical procedure intended primarily for therapeutic purposes, aimed at improving a health condition. */
export type TherapeuticProcedure = TherapeuticProcedureLeaf | MedicalTherapy | PsychologicalTreatment;

interface ThesisBase extends CreativeWorkBase {
    /** Qualification, candidature, degree, application that Thesis supports. */
    "schema:inSupportOf"?: SchemaValue<Text, "schema:inSupportOf">;
}
interface ThesisLeaf extends ThesisBase {
    "@type": "schema:Thesis";
}
/** A thesis or dissertation document submitted in support of candidature for an academic degree or professional qualification. */
export type Thesis = ThesisLeaf;

interface ThingBase extends Partial<IdReference> {
    /** An additional type for the item, typically used for adding more specific types from external vocabularies in microdata syntax. This is a relationship between something and a class that the thing is in. In RDFa syntax, it is better to use the native RDFa syntax - the 'typeof' attribute - for multiple types. Schema.org tools may have only weaker understanding of extra types, in particular those defined externally. */
    "schema:additionalType"?: SchemaValue<URL, "schema:additionalType">;
    /** An alias for the item. */
    "schema:alternateName"?: SchemaValue<Text, "schema:alternateName">;
    /** A description of the item. */
    "schema:description"?: SchemaValue<Text, "schema:description">;
    /** A sub property of description. A short description of the item used to disambiguate from other, similar items. Information from other properties (in particular, name) may be necessary for the description to be useful for disambiguation. */
    "schema:disambiguatingDescription"?: SchemaValue<Text, "schema:disambiguatingDescription">;
    /** The identifier property represents any kind of identifier for any kind of {@link https://schema.org/Thing Thing}, such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See {@link /docs/datamodel.html#identifierBg background notes} for more details. */
    "schema:identifier"?: SchemaValue<PropertyValue | Text | URL | IdReference, "schema:identifier">;
    /** An image of the item. This can be a {@link https://schema.org/URL URL} or a fully described {@link https://schema.org/ImageObject ImageObject}. */
    "schema:image"?: SchemaValue<ImageObject | URL | IdReference, "schema:image">;
    /** Indicates a page (or other CreativeWork) for which this thing is the main entity being described. See {@link /docs/datamodel.html#mainEntityBackground background notes} for details. */
    "schema:mainEntityOfPage"?: SchemaValue<CreativeWork | URL | IdReference, "schema:mainEntityOfPage">;
    /** The name of the item. */
    "schema:name"?: SchemaValue<Text, "schema:name">;
    /** Indicates a potential Action, which describes an idealized action in which this thing would play an 'object' role. */
    "schema:potentialAction"?: SchemaValue<Action | IdReference, "schema:potentialAction">;
    /** URL of a reference Web page that unambiguously indicates the item's identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website. */
    "schema:sameAs"?: SchemaValue<URL, "schema:sameAs">;
    /** A CreativeWork or Event about this Thing. */
    "schema:subjectOf"?: SchemaValue<CreativeWork | Event | IdReference, "schema:subjectOf">;
    /** URL of the item. */
    "schema:url"?: SchemaValue<URL, "schema:url">;
}
interface ThingLeaf extends ThingBase {
    "@type": "schema:Thing";
}
/** The most generic type of item. */
export type Thing = ThingLeaf | Action | BioChemEntity | CreativeWork | Element | Event | Intangible | MedicalEntity | Organization | Person | Place | Product | Taxon;

interface ThumbnailLeaf extends UIElementBase {
    "@type": "uxi:Thumbnail";
}
/** A thumbnail is a type of Molecule UI Element that is a miniature graphic which opens or links to a full image or other visual content. Thumbnails can be auto-generated from the full content or custom, show parts of it on hover. This is especially useful for previewing video-content. */
export type Thumbnail = ThumbnailLeaf;

interface TicketBase extends ThingBase {
    /** The date the ticket was issued. */
    "schema:dateIssued"?: SchemaValue<Date | DateTime, "schema:dateIssued">;
    /** The organization issuing the ticket or permit. */
    "schema:issuedBy"?: SchemaValue<Organization | IdReference, "schema:issuedBy">;
    /**
     * The currency of the price, or a price component when attached to {@link https://schema.org/PriceSpecification PriceSpecification} and its subtypes.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:priceCurrency"?: SchemaValue<Text, "schema:priceCurrency">;
    /** The seat associated with the ticket. */
    "schema:ticketedSeat"?: SchemaValue<Seat | IdReference, "schema:ticketedSeat">;
    /** The unique identifier for the ticket. */
    "schema:ticketNumber"?: SchemaValue<Text, "schema:ticketNumber">;
    /** Reference to an asset (e.g., Barcode, QR code image or PDF) usable for entrance. */
    "schema:ticketToken"?: SchemaValue<Text | URL, "schema:ticketToken">;
    /**
     * The total price for the reservation or ticket, including applicable taxes, shipping, etc.
     *
     * Usage guidelines:
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     */
    "schema:totalPrice"?: SchemaValue<Number | PriceSpecification | Text | IdReference, "schema:totalPrice">;
    /** The person or organization the reservation or ticket is for. */
    "schema:underName"?: SchemaValue<Organization | Person | IdReference, "schema:underName">;
}
interface TicketLeaf extends TicketBase {
    "@type": "schema:Ticket";
}
/** Used to describe a ticket to an event, a flight, a bus ride, etc. */
export type Ticket = TicketLeaf;

interface TieActionLeaf extends ActionBase {
    "@type": "schema:TieAction";
}
/** The act of reaching a draw in a competitive activity. */
export type TieAction = TieActionLeaf;

interface TimepickerLeaf extends UIElementBase {
    "@type": "uxi:Timepicker";
}
/** A Timepicker is a UI element which lets users select a time of the day. Different date and time formats may display AM/PM, this is also adjustable on users' devices, as well as the users' time zones. A hint for working hours in another time zone might be helpful, and changes for summer- and wintertime might also be useful info. */
export type Timepicker = TimepickerLeaf;

interface TipActionBase extends TradeActionBase {
    /** A sub property of participant. The participant who is at the receiving end of the action. */
    "schema:recipient"?: SchemaValue<Audience | ContactPoint | Organization | Person | IdReference, "schema:recipient">;
}
interface TipActionLeaf extends TipActionBase {
    "@type": "schema:TipAction";
}
/** The act of giving money voluntarily to a beneficiary in recognition of services rendered. */
export type TipAction = TipActionLeaf;

interface TireShopLeaf extends LocalBusinessBase {
    "@type": "schema:TireShop";
}
/** A tire shop. */
export type TireShop = TireShopLeaf | string;

interface TitleLeaf extends UIElementBase {
    "@type": "uxi:Title";
}
/** A Title describes and identifies content of a UI element. Web pages have titles which are displayed in the menu of the browser, the title is often repeated as a header. */
export type Title = TitleLeaf;

interface TooltipLeaf extends UIElementBase {
    "@type": "uxi:Tooltip";
}
/** A tooltip is a type of Molecule UI Element that displays informative text when users hover over, focus on, or tap a UI Element. When activated, Tooltips display brief information on how to use the element, or what it is. Tooltips often only contain text, but in some cases even contain explainer-videos. */
export type Tooltip = TooltipLeaf;

interface TouchDownActionLeaf extends UIActionBase {
    "@type": "uxi:TouchDownAction";
}
/** A touch-down action is when a user has started touching an element with their fingers. Pointing with a finger on touch-screens is less accurate than pointing with a mouse, so browsers can handle this differently */
export type TouchDownAction = TouchDownActionLeaf;

interface TouristAttractionBase extends PlaceBase {
    /** A language someone may use with or at the item, service or place. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/inLanguage inLanguage} */
    "schema:availableLanguage"?: SchemaValue<Language | Text | IdReference, "schema:availableLanguage">;
    /** Attraction suitable for type(s) of tourist. eg. Children, visitors from a particular country, etc. */
    "schema:touristType"?: SchemaValue<Audience | Text | IdReference, "schema:touristType">;
}
interface TouristAttractionLeaf extends TouristAttractionBase {
    "@type": "schema:TouristAttraction";
}
/** A tourist attraction. In principle any Thing can be a {@link https://schema.org/TouristAttraction TouristAttraction}, from a {@link https://schema.org/Mountain Mountain} and {@link https://schema.org/LandmarksOrHistoricalBuildings LandmarksOrHistoricalBuildings} to a {@link https://schema.org/LocalBusiness LocalBusiness}. This Type can be used on its own to describe a general {@link https://schema.org/TouristAttraction TouristAttraction}, or be used as an {@link https://schema.org/additionalType additionalType} to add tourist attraction properties to any other type. (See examples below) */
export type TouristAttraction = TouristAttractionLeaf | string;

interface TouristDestinationBase extends PlaceBase {
    /** Attraction located at destination. */
    "schema:includesAttraction"?: SchemaValue<TouristAttraction | IdReference, "schema:includesAttraction">;
    /** Attraction suitable for type(s) of tourist. eg. Children, visitors from a particular country, etc. */
    "schema:touristType"?: SchemaValue<Audience | Text | IdReference, "schema:touristType">;
}
interface TouristDestinationLeaf extends TouristDestinationBase {
    "@type": "schema:TouristDestination";
}
/** A tourist destination. In principle any {@link https://schema.org/Place Place} can be a {@link https://schema.org/TouristDestination TouristDestination} from a {@link https://schema.org/City City}, Region or {@link https://schema.org/Country Country} to an {@link https://schema.org/AmusementPark AmusementPark} or {@link https://schema.org/Hotel Hotel}. This Type can be used on its own to describe a general {@link https://schema.org/TouristDestination TouristDestination}, or be used as an {@link https://schema.org/additionalType additionalType} to add tourist relevant properties to any other {@link https://schema.org/Place Place}. A {@link https://schema.org/TouristDestination TouristDestination} is defined as a {@link https://schema.org/Place Place} that contains, or is colocated with, one or more {@link https://schema.org/TouristAttraction TouristAttraction}s, often linked by a similar theme or interest to a particular {@link https://schema.org/touristType touristType}. The {@link http://www2.unwto.org/ UNWTO} defines Destination (main destination of a tourism trip) as the place visited that is central to the decision to take the trip. (See examples below). */
export type TouristDestination = TouristDestinationLeaf | string;

interface TouristInformationCenterLeaf extends LocalBusinessBase {
    "@type": "schema:TouristInformationCenter";
}
/** A tourist information center. */
export type TouristInformationCenter = TouristInformationCenterLeaf | string;

interface TouristTripBase extends TripBase {
    /** Attraction suitable for type(s) of tourist. eg. Children, visitors from a particular country, etc. */
    "schema:touristType"?: SchemaValue<Audience | Text | IdReference, "schema:touristType">;
}
interface TouristTripLeaf extends TouristTripBase {
    "@type": "schema:TouristTrip";
}
/** A tourist trip. A created itinerary of visits to one or more places of interest ({@link https://schema.org/TouristAttraction TouristAttraction}/{@link https://schema.org/TouristDestination TouristDestination}) often linked by a similar theme, geographic area, or interest to a particular {@link https://schema.org/touristType touristType}. The {@link http://www2.unwto.org/ UNWTO} defines tourism trip as the Trip taken by visitors. (See examples below). */
export type TouristTrip = TouristTripLeaf;

interface ToyStoreLeaf extends LocalBusinessBase {
    "@type": "schema:ToyStore";
}
/** A toy store. */
export type ToyStore = ToyStoreLeaf | string;

interface TrackActionBase extends ActionBase {
    /** A sub property of instrument. The method of delivery. */
    "schema:deliveryMethod"?: SchemaValue<DeliveryMethod | IdReference, "schema:deliveryMethod">;
}
interface TrackActionLeaf extends TrackActionBase {
    "@type": "schema:TrackAction";
}
/**
 * An agent tracks an object for updates.
 *
 * Related actions:
 * - {@link https://schema.org/FollowAction FollowAction}: Unlike FollowAction, TrackAction refers to the interest on the location of innanimates objects.
 * - {@link https://schema.org/SubscribeAction SubscribeAction}: Unlike SubscribeAction, TrackAction refers to the interest on the location of innanimate objects.
 */
export type TrackAction = TrackActionLeaf;

interface TradeActionBase extends ActionBase {
    /**
     * The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes.
     *
     * Usage guidelines:
     * - Use the {@link https://schema.org/priceCurrency priceCurrency} property (with standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR") instead of including {@link http://en.wikipedia.org/wiki/Dollar_sign#Currencies_that_use_the_dollar_or_peso_sign ambiguous symbols} such as '$' in the value.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     * - Note that both {@link http://www.w3.org/TR/xhtml-rdfa-primer/#using-the-content-attribute RDFa} and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting.
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
     */
    "schema:price"?: SchemaValue<Number | Text, "schema:price">;
    /**
     * The currency of the price, or a price component when attached to {@link https://schema.org/PriceSpecification PriceSpecification} and its subtypes.
     *
     * Use standard formats: {@link http://en.wikipedia.org/wiki/ISO_4217 ISO 4217 currency format} e.g. "USD"; {@link https://en.wikipedia.org/wiki/List_of_cryptocurrencies Ticker symbol} for cryptocurrencies e.g. "BTC"; well known names for {@link https://en.wikipedia.org/wiki/Local_exchange_trading_system Local Exchange Tradings Systems} (LETS) and other currency types e.g. "Ithaca HOUR".
     */
    "schema:priceCurrency"?: SchemaValue<Text, "schema:priceCurrency">;
    /** One or more detailed price specifications, indicating the unit price and delivery or payment charges. */
    "schema:priceSpecification"?: SchemaValue<PriceSpecification | IdReference, "schema:priceSpecification">;
}
interface TradeActionLeaf extends TradeActionBase {
    "@type": "schema:TradeAction";
}
/** The act of participating in an exchange of goods and services for monetary compensation. An agent trades an object, product or service with a participant in exchange for a one time or periodic payment. */
export type TradeAction = TradeActionLeaf | BuyAction | DonateAction | OrderAction | PayAction | PreOrderAction | QuoteAction | RentAction | SellAction | TipAction;

interface TrainReservationLeaf extends ReservationBase {
    "@type": "schema:TrainReservation";
}
/**
 * A reservation for train travel.
 *
 * Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, use {@link https://schema.org/Offer Offer}.
 */
export type TrainReservation = TrainReservationLeaf;

interface TrainStationLeaf extends CivicStructureBase {
    "@type": "schema:TrainStation";
}
/** A train station. */
export type TrainStation = TrainStationLeaf | string;

interface TrainTripBase extends TripBase {
    /** The platform where the train arrives. */
    "schema:arrivalPlatform"?: SchemaValue<Text, "schema:arrivalPlatform">;
    /** The station where the train trip ends. */
    "schema:arrivalStation"?: SchemaValue<TrainStation | IdReference, "schema:arrivalStation">;
    /** The platform from which the train departs. */
    "schema:departurePlatform"?: SchemaValue<Text, "schema:departurePlatform">;
    /** The station from which the train departs. */
    "schema:departureStation"?: SchemaValue<TrainStation | IdReference, "schema:departureStation">;
    /** The name of the train (e.g. The Orient Express). */
    "schema:trainName"?: SchemaValue<Text, "schema:trainName">;
    /** The unique identifier for the train. */
    "schema:trainNumber"?: SchemaValue<Text, "schema:trainNumber">;
}
interface TrainTripLeaf extends TrainTripBase {
    "@type": "schema:TrainTrip";
}
/** A trip on a commercial train line. */
export type TrainTrip = TrainTripLeaf;

interface TransferActionBase extends ActionBase {
    /** A sub property of location. The original location of the object or the agent before the action. */
    "schema:fromLocation"?: SchemaValue<Place | IdReference, "schema:fromLocation">;
    /** A sub property of location. The final location of the object or the agent after the action. */
    "schema:toLocation"?: SchemaValue<Place | IdReference, "schema:toLocation">;
}
interface TransferActionLeaf extends TransferActionBase {
    "@type": "schema:TransferAction";
}
/** The act of transferring/moving (abstract or concrete) animate or inanimate objects from one place to another. */
export type TransferAction = TransferActionLeaf | BorrowAction | DownloadAction | GiveAction | LendAction | MoneyTransfer | ReceiveAction | ReturnAction | SendAction | TakeAction;

interface TravelActionBase extends MoveActionBase {
    /** The distance travelled, e.g. exercising or travelling. */
    "schema:distance"?: SchemaValue<Distance | IdReference, "schema:distance">;
}
interface TravelActionLeaf extends TravelActionBase {
    "@type": "schema:TravelAction";
}
/** The act of traveling from an fromLocation to a destination by a specified mode of transport, optionally with participants. */
export type TravelAction = TravelActionLeaf;

interface TravelAgencyLeaf extends LocalBusinessBase {
    "@type": "schema:TravelAgency";
}
/** A travel agency. */
export type TravelAgency = TravelAgencyLeaf | string;

interface TreatmentIndicationLeaf extends MedicalEntityBase {
    "@type": "schema:TreatmentIndication";
}
/** An indication for treating an underlying condition, symptom, etc. */
export type TreatmentIndication = TreatmentIndicationLeaf;

interface TreeViewLeaf extends ContainerUIElementBase {
    "@type": "uxi:TreeView";
}
/** A TreeView is a Container UI Element that shows hierarchical structures, most commoly in a vertical direction. Can show an organization's hierarchy, a web page and its sub-pages or anything organized in a tree. For files and folders check out Directory Structure. */
export type TreeView = TreeViewLeaf;

interface TriangleLeaf extends UIElementBase {
    "@type": "uxi:Triangle";
}
/** A triangle is a type of Shape that's often used to indicate something is playable media, e.g. the icon in the middle of a video player. In 3D environments it is the smallest building block of a (sur)face. If one corner is sharp it can be used that is often used to point at content, and in small-size scenarios it's used to indicate closed and open states. */
export type Triangle = TriangleLeaf;

interface TripBase extends ThingBase {
    /** The expected arrival time. */
    "schema:arrivalTime"?: SchemaValue<DateTime | Time, "schema:arrivalTime">;
    /** The expected departure time. */
    "schema:departureTime"?: SchemaValue<DateTime | Time, "schema:departureTime">;
    /** Destination(s) ( {@link https://schema.org/Place Place} ) that make up a trip. For a trip where destination order is important use {@link https://schema.org/ItemList ItemList} to specify that order (see examples). */
    "schema:itinerary"?: SchemaValue<ItemList | Place | IdReference, "schema:itinerary">;
    /** An offer to provide this item—for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use {@link https://schema.org/businessFunction businessFunction} to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a {@link https://schema.org/Demand Demand}. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
    "schema:offers"?: SchemaValue<Demand | Offer | IdReference, "schema:offers">;
    /** Identifies that this {@link https://schema.org/Trip Trip} is a subTrip of another Trip. For example Day 1, Day 2, etc. of a multi-day trip. */
    "schema:partOfTrip"?: SchemaValue<Trip | IdReference, "schema:partOfTrip">;
    /** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
    "schema:provider"?: SchemaValue<Organization | Person | IdReference, "schema:provider">;
    /** Identifies a {@link https://schema.org/Trip Trip} that is a subTrip of this Trip. For example Day 1, Day 2, etc. of a multi-day trip. */
    "schema:subTrip"?: SchemaValue<Trip | IdReference, "schema:subTrip">;
}
interface TripLeaf extends TripBase {
    "@type": "schema:Trip";
}
/** A trip or journey. An itinerary of visits to one or more places. */
export type Trip = TripLeaf | BoatTrip | BusTrip | Flight | TouristTrip | TrainTrip;

interface TVClipBase extends ClipBase {
    /**
     * The TV series to which this episode or season belongs.
     *
     * @deprecated Consider using https://schema.org/partOfSeries instead.
     */
    "schema:partOfTVSeries"?: SchemaValue<TVSeries | IdReference, "schema:partOfTVSeries">;
}
interface TVClipLeaf extends TVClipBase {
    "@type": "schema:TVClip";
}
/** A short TV program or a segment/part of a TV program. */
export type TVClip = TVClipLeaf;

interface TVEpisodeBase extends EpisodeBase {
    /**
     * The country of origin of something, including products as well as creative works such as movie and TV content.
     *
     * In the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of {@link https://schema.org/CreativeWork CreativeWork} it is difficult to provide fully general guidance, and properties such as {@link https://schema.org/contentLocation contentLocation} and {@link https://schema.org/locationCreated locationCreated} may be more applicable.
     *
     * In the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot be fully enumerated here.
     */
    "schema:countryOfOrigin"?: SchemaValue<Country | IdReference, "schema:countryOfOrigin">;
    /**
     * The TV series to which this episode or season belongs.
     *
     * @deprecated Consider using https://schema.org/partOfSeries instead.
     */
    "schema:partOfTVSeries"?: SchemaValue<TVSeries | IdReference, "schema:partOfTVSeries">;
    /** Languages in which subtitles/captions are available, in {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard format}. */
    "schema:subtitleLanguage"?: SchemaValue<Language | Text | IdReference, "schema:subtitleLanguage">;
    /**
     * An {@link https://eidr.org/ EIDR} (Entertainment Identifier Registry) {@link https://schema.org/identifier identifier} representing at the most general/abstract level, a work of film or television.
     *
     * For example, the motion picture known as "Ghostbusters" has a titleEIDR of "10.5240/7EC7-228A-510A-053E-CBB8-J". This title (or work) may have several variants, which EIDR calls "edits". See {@link https://schema.org/editEIDR editEIDR}.
     *
     * Since schema.org types like {@link https://schema.org/Movie Movie} and {@link https://schema.org/TVEpisode TVEpisode} can be used for both works and their multiple expressions, it is possible to use {@link https://schema.org/titleEIDR titleEIDR} alone (for a general description), or alongside {@link https://schema.org/editEIDR editEIDR} for a more edit-specific description.
     */
    "schema:titleEIDR"?: SchemaValue<Text | URL, "schema:titleEIDR">;
}
interface TVEpisodeLeaf extends TVEpisodeBase {
    "@type": "schema:TVEpisode";
}
/** A TV episode which can be part of a series or season. */
export type TVEpisode = TVEpisodeLeaf;

interface TVSeasonBase extends CreativeWorkBase, CreativeWorkSeasonBase {
    /**
     * The country of origin of something, including products as well as creative works such as movie and TV content.
     *
     * In the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of {@link https://schema.org/CreativeWork CreativeWork} it is difficult to provide fully general guidance, and properties such as {@link https://schema.org/contentLocation contentLocation} and {@link https://schema.org/locationCreated locationCreated} may be more applicable.
     *
     * In the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot be fully enumerated here.
     */
    "schema:countryOfOrigin"?: SchemaValue<Country | IdReference, "schema:countryOfOrigin">;
    /**
     * The TV series to which this episode or season belongs.
     *
     * @deprecated Consider using https://schema.org/partOfSeries instead.
     */
    "schema:partOfTVSeries"?: SchemaValue<TVSeries | IdReference, "schema:partOfTVSeries">;
}
interface TVSeasonLeaf extends TVSeasonBase {
    "@type": "schema:TVSeason";
}
/** Season dedicated to TV broadcast and associated online delivery. */
export type TVSeason = TVSeasonLeaf;

interface TVSeriesBase extends CreativeWorkBase, CreativeWorkSeriesBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /**
     * An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/actor instead.
     */
    "schema:actors"?: SchemaValue<Person | IdReference, "schema:actors">;
    /** A season that is part of the media series. */
    "schema:containsSeason"?: SchemaValue<CreativeWorkSeason | IdReference, "schema:containsSeason">;
    /**
     * The country of origin of something, including products as well as creative works such as movie and TV content.
     *
     * In the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of {@link https://schema.org/CreativeWork CreativeWork} it is difficult to provide fully general guidance, and properties such as {@link https://schema.org/contentLocation contentLocation} and {@link https://schema.org/locationCreated locationCreated} may be more applicable.
     *
     * In the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot be fully enumerated here.
     */
    "schema:countryOfOrigin"?: SchemaValue<Country | IdReference, "schema:countryOfOrigin">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /**
     * A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/director instead.
     */
    "schema:directors"?: SchemaValue<Person | IdReference, "schema:directors">;
    /** An episode of a tv, radio or game media within a series or season. */
    "schema:episode"?: SchemaValue<Episode | IdReference, "schema:episode">;
    /**
     * An episode of a TV/radio series or season.
     *
     * @deprecated Consider using https://schema.org/episode instead.
     */
    "schema:episodes"?: SchemaValue<Episode | IdReference, "schema:episodes">;
    /** The composer of the soundtrack. */
    "schema:musicBy"?: SchemaValue<MusicGroup | Person | IdReference, "schema:musicBy">;
    /** The number of episodes in this season or series. */
    "schema:numberOfEpisodes"?: SchemaValue<Integer, "schema:numberOfEpisodes">;
    /** The number of seasons in this series. */
    "schema:numberOfSeasons"?: SchemaValue<Integer, "schema:numberOfSeasons">;
    /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
    "schema:productionCompany"?: SchemaValue<Organization | IdReference, "schema:productionCompany">;
    /**
     * A season in a media series.
     *
     * @deprecated Consider using https://schema.org/containsSeason instead.
     */
    "schema:season"?: SchemaValue<CreativeWorkSeason | URL | IdReference, "schema:season">;
    /**
     * A season in a media series.
     *
     * @deprecated Consider using https://schema.org/season instead.
     */
    "schema:seasons"?: SchemaValue<CreativeWorkSeason | IdReference, "schema:seasons">;
    /** The trailer of a movie or tv/radio series, season, episode, etc. */
    "schema:trailer"?: SchemaValue<VideoObject | IdReference, "schema:trailer">;
}
interface TVSeriesLeaf extends TVSeriesBase {
    "@type": "schema:TVSeries";
}
/** CreativeWorkSeries dedicated to TV broadcast and associated online delivery. */
export type TVSeries = TVSeriesLeaf;

interface TypeAndQuantityNodeBase extends ThingBase {
    /** The quantity of the goods included in the offer. */
    "schema:amountOfThisGood"?: SchemaValue<Number, "schema:amountOfThisGood">;
    /** The business function (e.g. sell, lease, repair, dispose) of the offer or component of a bundle (TypeAndQuantityNode). The default is http://purl.org/goodrelations/v1#Sell. */
    "schema:businessFunction"?: SchemaValue<BusinessFunction | IdReference, "schema:businessFunction">;
    /** The product that this structured value is referring to. */
    "schema:typeOfGood"?: SchemaValue<Product | Service | IdReference, "schema:typeOfGood">;
    /** The unit of measurement given using the UN/CEFACT Common Code (3 characters) or a URL. Other codes than the UN/CEFACT Common Code may be used with a prefix followed by a colon. */
    "schema:unitCode"?: SchemaValue<Text | URL, "schema:unitCode">;
    /** A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for {@link unitCode unitCode}. */
    "schema:unitText"?: SchemaValue<Text, "schema:unitText">;
}
interface TypeAndQuantityNodeLeaf extends TypeAndQuantityNodeBase {
    "@type": "schema:TypeAndQuantityNode";
}
/** A structured value indicating the quantity, unit of measurement, and business function of goods included in a bundle offer. */
export type TypeAndQuantityNode = TypeAndQuantityNodeLeaf;

interface UIActionBase extends ActionBase, ElementBase {
}
interface UIActionLeaf extends UIActionBase {
    "@type": "uxi:UIAction";
}
/** The root Action class for the user interface, more detailed than schema:Action. Can be as specific as a ClickAction, or similar to a schema:UICommentAction */
export type UIAction = UIActionLeaf | UserAction;

interface UICommentActionBase extends CommentActionBase, UICommunicateActionBase {
}
interface UICommentActionLeaf extends UICommentActionBase {
    "@type": "uxi:UICommentAction";
}
/** A Comment Action describes the act of creating a comment about a subject. UICommunicateActions have these properties: 'agent' (commentator), 'about' (the comment's topic), recipient (if another commentator is mentioned). Extends https://schema.org/CommentAction to add more User Interface-specific features. */
export type UICommentAction = UICommentActionLeaf;

interface UICommunicateActionBase extends CommunicateActionBase, UIActionBase {
}
interface UICommunicateActionLeaf extends UICommunicateActionBase {
    "@type": "uxi:UICommunicateAction";
}
/** Actions where two users exchange information, e.g. UICommentAction, UIReplyAction, UIReactAction. Extends https://schema.org/CommunicateAction to add properties specific to user interfaces. */
export type UICommunicateAction = UICommunicateActionLeaf | UICommentAction | UIReactAction | UIReplyAction;

interface UIConfirmActionBase extends InformActionBase, UIActionBase {
}
interface UIConfirmActionLeaf extends UIConfirmActionBase {
    "@type": "uxi:UIConfirmAction";
}
/** A user action to confirm a prompt from the application. Can be used next to a dismiss-button on a banner, notification or modal, but also the answer to a RSVP. Notifies that a future event/action is going to happen as expected. Extends https://schema.org/ConfirmAction, which should be used if the confirmation happens offline. */
export type UIConfirmAction = UIConfirmActionLeaf;

interface UIDataTypeLeaf extends ElementBase {
    "@type": "uxi:UIDataType";
}
/** The root class for all UI DataTypes. E.g. on/off -> true/false in the case of BooleanType. Formally extends https://schema.org/DataType, but support can't be 100% guaranteed. */
export type UIDataType = UIDataTypeLeaf | BooleanType | ColorCodeType | MediaDataType | NumericType | TextType;

interface UIDeleteActionBase extends UpdateActionBase, UIActionBase {
}
interface UIDeleteActionLeaf extends UIDeleteActionBase {
    "@type": "uxi:UIDeleteAction";
}
/** A user action to edit content or a group of items by removing an item. Often requires users to confirm the deletion, or is a hidden feature to prevent users from accidentally deleting. UX ranges from swiping-to-delete over trashcan-buttons to dragging into a trashbin. Consider offering archiving content as an alternative. Extends https://schema.org/DeleteAction, to design flows like confirm-before-delete more easily. */
export type UIDeleteAction = UIDeleteActionLeaf;

interface UIDownloadActionLeaf extends UIActionBase {
    "@type": "uxi:UIDownloadAction";
}
/** A download action copies media or a file to the user's device. In a lot of cases there's a standard UX for downloading already. Indicating progress and completion is important to the user, in the case of a failed download it should be easy to retry. In the case of success the next action should be clear */
export type UIDownloadAction = UIDownloadActionLeaf;

interface UIElementBase extends ElementBase {
    /** An ARIA label is an accessibility feature that helps visually impaired users understand and use a UI control. Blind users use screen readers to navigate User Interfaces, so concise, readable text helps users navigate the application. */
    "uxi:ariaLabel"?: SchemaValue<Text, "uxi:ariaLabel">;
    /** Content of the background of the element */
    "uxi:background"?: SchemaValue<UIElement | IdReference, "uxi:background">;
    /** Bold text is used to add significance to a text element */
    "uxi:bold"?: SchemaValue<Text, "uxi:bold">;
    /** The color used to express a meaningful relation in the content */
    "uxi:color"?: SchemaValue<ColorCodeType | Number | Text | IdReference, "uxi:color">;
    /** The font used to express a meaningful relation in the content */
    "uxi:font"?: SchemaValue<Text, "uxi:font">;
    /** A form of highlighting an element in relation to others */
    "uxi:highlight"?: SchemaValue<UIElement | IdReference, "uxi:highlight">;
    /** Importance is a property on an UI Element to order elements toward the user. The order expresses a fixed significance over other elements. When issues happen in the application, Error notifications should get highest importance, followed by Warnings, and Alerts. */
    "uxi:importance"?: SchemaValue<IssueSeverityType | IdReference, "uxi:importance">;
    /** The input range defines the type(s) of data which a uxi:UIElement can consume. This can be used to choose UIElements automatically. E.g. in the case of a date picker this could be https://schema.org/Date or https://schema.org/DateTime. For the (sub-)uxi:UIElement for selecting a year inside that date picker, a uxi:UIPropertyValueSpecification could be used to narrow down the selection. Also useful for converting, sending or receiving data. */
    "uxi:inputRange"?: SchemaValue<Thing | UIDataType | IdReference, "uxi:inputRange">;
    /** The input trigger validator can be used with side-effect handlers, so that they only trigger when the input is valid. */
    "uxi:inputTriggerValidator"?: SchemaValue<Validator | IdReference, "uxi:inputTriggerValidator">;
    /** A hierarchy flag to toggle the visibility of an UI Element. If you want to transition between visibility states, you can use opacity for fading, size for shrinking and growing, or 3D transformations for flipping. Transitions tell the user what happened to an element, when hiding the user should be shown how to un-hide. */
    "uxi:isHidden"?: SchemaValue<never, "uxi:isHidden">;
    /** A hierarchy flag to indicate if an Element is minimized or maximized. Compare with minimizedState and maximizedState, and minifiedState. */
    "uxi:isMini"?: SchemaValue<never, "uxi:isMini">;
    /** A hierarchy flag to toggle an element as modal. Modal Elements are a way to force users to interact with a UI element, they show content in front of the rest of the application and don't allow any input apart from the front element. The background is often dimmed or greyed out. Modals must be tested for accessibility, since they can trap a user. */
    "uxi:isModal"?: SchemaValue<never, "uxi:isModal">;
    /** A hierarchy flag for UI Elements overlaying other UI Elements. It can be used with Dialogs, Popovers, Dropdowns, etc. */
    "uxi:isOverlay"?: SchemaValue<never, "uxi:isOverlay">;
    /** A hierarchy flag to indicate that a UI Element stands out and is readily noticeable, such as a red CTA-button. An example where isProminent switches from one UI Element to another are tutorial-UIs, where the user can see the full UI, but only click the explained part. */
    "uxi:isProminent"?: SchemaValue<Boolean, "uxi:isProminent">;
    /** A hierarchy flag that has its origin in Material Design and the visual metaphor of paper lying on top of other paper. A raised UI Element is an element that's one paper layer above, with a slight shadow, but it's 'glued' to the layer below. */
    "uxi:isRaised"?: SchemaValue<never, "uxi:isRaised">;
    /** Italics are used to express importance in the text */
    "uxi:italic"?: SchemaValue<Text, "uxi:italic">;
    /** A 'more info'-text can be shown as the text in a Tooltip or other helpful element, when the user needs clarification about a UI element or step in a process. This can include helptext, or describe what will happen when the user takes the next step. */
    "uxi:moreInfo"?: SchemaValue<Text, "uxi:moreInfo">;
    /** Output is the outcome property of something produced. A QR code generator can output an image file, a form can output a document to be signed, a digital signature app can output signed documents. Technically, outputs should be treated as side-effects/asynchronously, compare with uxi:result for immediate/synchronous outcomes. */
    "uxi:output"?: SchemaValue<Thing | IdReference, "uxi:output">;
    /** Priority is a property on an UI Element to order elements towards the user. The order expresses relative significance over other elements. For absolute ordering, check out Importance. */
    "uxi:priority"?: SchemaValue<IssueSeverityType | IdReference, "uxi:priority">;
    /** Underlining text is a way of highlighting a particular portion of text */
    "uxi:underlined"?: SchemaValue<Text, "uxi:underlined">;
    /** An ARIA value text is an accessibility feature that serves as a text alternative to visually communicated values. E.g. a progress bar could read out the percentage, a slider the current value and the minimum, maximum and stepsize. */
    "uxi:valueText"?: SchemaValue<Text, "uxi:valueText">;
}
interface UIElementLeaf extends UIElementBase {
    "@type": "uxi:UIElement";
}
/** The root class for all User Interface elements */
export type UIElement = UIElementLeaf | AtomUIElement | ContainerUIElement | MoleculeUIElement | OrganismUIElement;

interface UIElementStateLeaf extends ElementBase {
    "@type": "uxi:UIElementState";
}
/** When the user interacts with an UI element, that element changes its state as a consequence */
export type UIElementState = UIElementStateLeaf | ClosedState | ExpandedState | FilteredState | FixedState | FloatingState | LooseState | MaximizedState | MinifiedState | MinimizedState | OpenState | SortedState | UIElementTransitionState | UIStack | UnfilteredState | UnsortedState;

interface UIElementTransitionStateLeaf extends ElementBase {
    "@type": "uxi:UIElementTransitionState";
}
/** A UI element is in a transition state when it is entering another state over time. This can be useful for opening and closing animations, or skeleton states. It is generally helpful for the user to know what's happening with the UI elements instead of instant changes */
export type UIElementTransitionState = UIElementTransitionStateLeaf | ClosingState | OpeningState | SkeletonState;

interface UIPropertyValueSpecificationBase extends ElementBase {
    /** The default value of the input. For properties that expect a literal, the default is a literal value, for properties that expect an object, it's an ID reference to one of the current values. */
    "uxi:defaultValue"?: SchemaValue<Text | Thing | IdReference, "uxi:defaultValue">;
    /** Whether multiple values are allowed for the property. Default is false. */
    "uxi:multipleValues"?: SchemaValue<Boolean, "uxi:multipleValues">;
    /** Whether or not a property is mutable. Default is false. Specifying this for a property that also has a value makes it act similar to a 'hidden' input in an HTML form. */
    "uxi:readonlyValue"?: SchemaValue<Boolean, "uxi:readonlyValue">;
    /** Indicates the name of the UIPropertyValueSpecification to be used in URL templates and form encoding in a manner analogous to HTML's input@name. */
    "uxi:valueName"?: SchemaValue<Text, "uxi:valueName">;
    /** Whether the property must be filled in to complete the action. Default is false. */
    "uxi:valueRequired"?: SchemaValue<Boolean, "uxi:valueRequired">;
}
interface UIPropertyValueSpecificationLeaf extends UIPropertyValueSpecificationBase {
    "@type": "uxi:UIPropertyValueSpecification";
}
/** similar to schema:PropertyValueSpecification, but contains only a subset of properties. Some of the properties went into NumericTypeProperty and others */
export type UIPropertyValueSpecification = UIPropertyValueSpecificationLeaf;

interface UIReactActionBase extends ActionBase, UICommunicateActionBase {
}
interface UIReactActionLeaf extends UIReactActionBase {
    "@type": "uxi:UIReactAction";
}
/** A UIReactAction is the act of responding instinctively and emotionally to an object, expressing a sentiment. The user experience of your applications will hopefully lead to such reactions. Extends https://schema.org/ReactAction to add more user interface-related features. */
export type UIReactAction = UIReactActionLeaf;

interface UIReplyActionBase extends ReplyActionBase, UICommunicateActionBase {
}
interface UIReplyActionLeaf extends UIReplyActionBase {
    "@type": "uxi:UIReplyAction";
}
/** A UIReplyAction is similar to a UICommentAction, and refers to the act of responding to a question/message asked/sent by the object. Derived from https://schema.org/ReplyAction, but the user interface needs more details. */
export type UIReplyAction = UIReplyActionLeaf;

interface UIStackLeaf extends ElementBase {
    "@type": "uxi:UIStack";
}
/** UIStack is an approach to interface design that includes non-ideal states. These can happen through user interaction or for technical reasons. It includes layers of state, and has been authored by Scott Hurff: https://www.scotthurff.com/posts/why-your-user-interface-is-awkward-youre-ignoring-the-ui-stack/#theuistack */
export type UIStack = UIStackLeaf | BlankState | ErrorState | IdealState | LoadingState | PartialState;

interface UIStateLeaf extends ElementBase {
    "@type": "uxi:UIState";
}
/** The state of a UIElement */
export type UIState = UIStateLeaf | UIElementState | UserActionState;

interface UITableLeaf extends ContainerUIElementBase {
    "@type": "uxi:UITable";
}
/** A UI Table is a Container that shows other UI elements in rows and columns. This would be true for a grid as well, but the elements in tables are organized by their row and column, whereas in grids are independent. ColumnHeaders can be used for sorting, filtering, and Rowheaders for marking rows. UITables need more properties than https://schema.org/Table provides to function, so it's not extending from the schema.org type. */
export type UITable = UITableLeaf;

interface UKNonprofitTypeLeaf extends EnumerationBase {
    "@type": "schema:UKNonprofitType";
}
/** UKNonprofitType: Non-profit organization type originating from the United Kingdom. */
export type UKNonprofitType = "https://schema.org/CharitableIncorporatedOrganization" | "schema:CharitableIncorporatedOrganization" | "https://schema.org/LimitedByGuaranteeCharity" | "schema:LimitedByGuaranteeCharity" | "https://schema.org/UKTrust" | "schema:UKTrust" | "https://schema.org/UnincorporatedAssociationCharity" | "schema:UnincorporatedAssociationCharity" | UKNonprofitTypeLeaf;

interface UndoActionLeaf extends UIActionBase {
    "@type": "uxi:UndoAction";
}
/** A user action to undo a modification. Removes a step in the history of edits by the user. Not to be confused with the back action, which is used for navigation */
export type UndoAction = UndoActionLeaf;

interface UnfilteredStateLeaf extends ElementBase {
    "@type": "uxi:UnfilteredState";
}
/** A container in the unfiltered state shows all elements. This the default. When the number of elements is high, consider pagination or a visual hierarchy */
export type UnfilteredState = UnfilteredStateLeaf;

interface UnitPriceSpecificationBase extends PriceSpecificationBase {
    /** Specifies for how long this price (or price component) will be billed. Can be used, for example, to model the contractual duration of a subscription or payment plan. Type can be either a Duration or a Number (in which case the unit of measurement, for example month, is specified by the unitCode property). */
    "schema:billingDuration"?: SchemaValue<Duration | Number | QuantitativeValue | IdReference, "schema:billingDuration">;
    /** This property specifies the minimal quantity and rounding increment that will be the basis for the billing. The unit of measurement is specified by the unitCode property. */
    "schema:billingIncrement"?: SchemaValue<Number, "schema:billingIncrement">;
    /** Specifies after how much time this price (or price component) becomes valid and billing starts. Can be used, for example, to model a price increase after the first year of a subscription. The unit of measurement is specified by the unitCode property. */
    "schema:billingStart"?: SchemaValue<Number, "schema:billingStart">;
    /** Identifies a price component (for example, a line item on an invoice), part of the total price for an offer. */
    "schema:priceComponentType"?: SchemaValue<PriceComponentTypeEnumeration | IdReference, "schema:priceComponentType">;
    /** Defines the type of a price specified for an offered product, for example a list price, a (temporary) sale price or a manufacturer suggested retail price. If multiple prices are specified for an offer the {@link https://schema.org/priceType priceType} property can be used to identify the type of each such specified price. The value of priceType can be specified as a value from enumeration PriceTypeEnumeration or as a free form text string for price types that are not already predefined in PriceTypeEnumeration. */
    "schema:priceType"?: SchemaValue<PriceTypeEnumeration | Text | IdReference, "schema:priceType">;
    /** The reference quantity for which a certain price applies, e.g. 1 EUR per 4 kWh of electricity. This property is a replacement for unitOfMeasurement for the advanced cases where the price does not relate to a standard unit. */
    "schema:referenceQuantity"?: SchemaValue<QuantitativeValue | IdReference, "schema:referenceQuantity">;
    /** The unit of measurement given using the UN/CEFACT Common Code (3 characters) or a URL. Other codes than the UN/CEFACT Common Code may be used with a prefix followed by a colon. */
    "schema:unitCode"?: SchemaValue<Text | URL, "schema:unitCode">;
    /** A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for {@link unitCode unitCode}. */
    "schema:unitText"?: SchemaValue<Text, "schema:unitText">;
}
interface UnitPriceSpecificationLeaf extends UnitPriceSpecificationBase {
    "@type": "schema:UnitPriceSpecification";
}
/** The price asked for a given offer by the respective organization or person. */
export type UnitPriceSpecification = UnitPriceSpecificationLeaf;

interface UnRegisterActionLeaf extends ActionBase {
    "@type": "schema:UnRegisterAction";
}
/**
 * The act of un-registering from a service.
 *
 * Related actions:
 * - {@link https://schema.org/RegisterAction RegisterAction}: antonym of UnRegisterAction.
 * - {@link https://schema.org/LeaveAction LeaveAction}: Unlike LeaveAction, UnRegisterAction implies that you are unregistering from a service you werer previously registered, rather than leaving a team/group of people.
 */
export type UnRegisterAction = UnRegisterActionLeaf;

interface UnsortedStateLeaf extends ElementBase {
    "@type": "uxi:UnsortedState";
}
/** A container is in the unsorted state by default. Berfor a user changes the sorting, this is an option to show recommended elements, history, favorites etc, when there are many elements to sort by */
export type UnsortedState = UnsortedStateLeaf;

interface UpdateActionBase extends ActionBase {
    /**
     * A sub property of object. The collection target of the action.
     *
     * @deprecated Consider using https://schema.org/targetCollection instead.
     */
    "schema:collection"?: SchemaValue<Thing | IdReference, "schema:collection">;
    /** A sub property of object. The collection target of the action. */
    "schema:targetCollection"?: SchemaValue<Thing | IdReference, "schema:targetCollection">;
}
interface UpdateActionLeaf extends UpdateActionBase {
    "@type": "schema:UpdateAction";
}
/** The act of managing by changing/editing the state of the object. */
export type UpdateAction = UpdateActionLeaf | AddAction | DeleteAction | ReplaceAction;

interface UploadActionLeaf extends UIActionBase {
    "@type": "uxi:UploadAction";
}
/** An upload action copies media or a file from the user's device over the network. The file-selection interface is usually provided by the operating system. Files can be dragged and dropped, selected from an 'open file' dialog, or come from the 'share'-function of an operating system. Uploading may take a while or fail entirely, so indicating progress and completion is important */
export type UploadAction = UploadActionLeaf;

/** Data type: URL. */
export type URL = string;

interface UseActionLeaf extends ConsumeActionBase {
    "@type": "schema:UseAction";
}
/** The act of applying an object to its intended purpose. */
export type UseAction = UseActionLeaf | WearAction;

interface UserLeaf extends ElementBase {
    "@type": "uxi:User";
}
/** A user is an individual person accessing the application. Users typically have roles, belong to groups and have permissions (or not). User data and personal data should be especially secured and anonymized for development. Dummy personas can help with testing the boundaries of the application better, e.g. when testing for long names or characters in Asian or Right-to-left languages. Compared to a role, a role summarizes a 'job' that can be done in an application. One user can have many roles, and is permitted access and view parts of the application or not, depending on the activity. E.g. in a marketplace, the same user might be a seller for one item, but a buyer for other items. */
export type User = UserLeaf;

interface UserActionLeaf extends UIActionBase {
    "@type": "uxi:UserAction";
}
/** The root action class for all minor interactions users have with the interface (click, scroll, key-press, etc.) */
export type UserAction = UserActionLeaf | AlignAction | BackAction | BrowseAction | DetailAction | DeviceSpecificAction | DismissAction | DragAction | DropAction | FavoriteAction | MediaAction | MediaPartAction | NavigateAction | RedoAction | ResizeAction | SaveAction | ScrollAction | UICommunicateAction | UIConfirmAction | UIDeleteAction | UndoAction | ZoomAction;

interface UserActionStateLeaf extends ElementBase {
    "@type": "uxi:UserActionState";
}
/** When the user interacts with the application, the application changes its state as a consequence */
export type UserActionState = UserActionStateLeaf | DraggingState | FocusState | HoverState | PressedState;

interface UserBlocksLeaf extends EventBase {
    "@type": "schema:UserBlocks";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserBlocks = UserBlocksLeaf;

interface UserCheckinsLeaf extends EventBase {
    "@type": "schema:UserCheckins";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserCheckins = UserCheckinsLeaf;

interface UserCommentsBase extends EventBase {
    /** The text of the UserComment. */
    "schema:commentText"?: SchemaValue<Text, "schema:commentText">;
    /** The time at which the UserComment was made. */
    "schema:commentTime"?: SchemaValue<Date | DateTime, "schema:commentTime">;
    /** The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. */
    "schema:creator"?: SchemaValue<Organization | Person | IdReference, "schema:creator">;
    /** Specifies the CreativeWork associated with the UserComment. */
    "schema:discusses"?: SchemaValue<CreativeWork | IdReference, "schema:discusses">;
    /** The URL at which a reply may be posted to the specified UserComment. */
    "schema:replyToUrl"?: SchemaValue<URL, "schema:replyToUrl">;
}
interface UserCommentsLeaf extends UserCommentsBase {
    "@type": "schema:UserComments";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserComments = UserCommentsLeaf;

interface UserDownloadsLeaf extends EventBase {
    "@type": "schema:UserDownloads";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserDownloads = UserDownloadsLeaf;

interface UserInteractionLeaf extends EventBase {
    "@type": "schema:UserInteraction";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserInteraction = UserInteractionLeaf | UserBlocks | UserCheckins | UserComments | UserDownloads | UserLikes | UserPageVisits | UserPlays | UserPlusOnes | UserTweets;

interface UserLikesLeaf extends EventBase {
    "@type": "schema:UserLikes";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserLikes = UserLikesLeaf;

interface UserPageVisitsLeaf extends EventBase {
    "@type": "schema:UserPageVisits";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserPageVisits = UserPageVisitsLeaf;

interface UserPlaysLeaf extends EventBase {
    "@type": "schema:UserPlays";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserPlays = UserPlaysLeaf;

interface UserPlusOnesLeaf extends EventBase {
    "@type": "schema:UserPlusOnes";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserPlusOnes = UserPlusOnesLeaf;

interface UserReviewLeaf extends ReviewBase {
    "@type": "schema:UserReview";
}
/** A review created by an end-user (e.g. consumer, purchaser, attendee etc.), in contrast with {@link https://schema.org/CriticReview CriticReview}. */
export type UserReview = UserReviewLeaf;

interface UserTweetsLeaf extends EventBase {
    "@type": "schema:UserTweets";
}
/**
 * UserInteraction and its subtypes is an old way of talking about users interacting with pages. It is generally better to use {@link https://schema.org/Action Action}-based vocabulary, alongside types such as {@link https://schema.org/Comment Comment}.
 *
 * @deprecated Use InteractionCounter instead.
 */
export type UserTweets = UserTweetsLeaf;

interface USNonprofitTypeLeaf extends EnumerationBase {
    "@type": "schema:USNonprofitType";
}
/** USNonprofitType: Non-profit organization type originating from the United States. */
export type USNonprofitType = "https://schema.org/Nonprofit501a" | "schema:Nonprofit501a" | "https://schema.org/Nonprofit501c1" | "schema:Nonprofit501c1" | "https://schema.org/Nonprofit501c10" | "schema:Nonprofit501c10" | "https://schema.org/Nonprofit501c11" | "schema:Nonprofit501c11" | "https://schema.org/Nonprofit501c12" | "schema:Nonprofit501c12" | "https://schema.org/Nonprofit501c13" | "schema:Nonprofit501c13" | "https://schema.org/Nonprofit501c14" | "schema:Nonprofit501c14" | "https://schema.org/Nonprofit501c15" | "schema:Nonprofit501c15" | "https://schema.org/Nonprofit501c16" | "schema:Nonprofit501c16" | "https://schema.org/Nonprofit501c17" | "schema:Nonprofit501c17" | "https://schema.org/Nonprofit501c18" | "schema:Nonprofit501c18" | "https://schema.org/Nonprofit501c19" | "schema:Nonprofit501c19" | "https://schema.org/Nonprofit501c2" | "schema:Nonprofit501c2" | "https://schema.org/Nonprofit501c20" | "schema:Nonprofit501c20" | "https://schema.org/Nonprofit501c21" | "schema:Nonprofit501c21" | "https://schema.org/Nonprofit501c22" | "schema:Nonprofit501c22" | "https://schema.org/Nonprofit501c23" | "schema:Nonprofit501c23" | "https://schema.org/Nonprofit501c24" | "schema:Nonprofit501c24" | "https://schema.org/Nonprofit501c25" | "schema:Nonprofit501c25" | "https://schema.org/Nonprofit501c26" | "schema:Nonprofit501c26" | "https://schema.org/Nonprofit501c27" | "schema:Nonprofit501c27" | "https://schema.org/Nonprofit501c28" | "schema:Nonprofit501c28" | "https://schema.org/Nonprofit501c3" | "schema:Nonprofit501c3" | "https://schema.org/Nonprofit501c4" | "schema:Nonprofit501c4" | "https://schema.org/Nonprofit501c5" | "schema:Nonprofit501c5" | "https://schema.org/Nonprofit501c6" | "schema:Nonprofit501c6" | "https://schema.org/Nonprofit501c7" | "schema:Nonprofit501c7" | "https://schema.org/Nonprofit501c8" | "schema:Nonprofit501c8" | "https://schema.org/Nonprofit501c9" | "schema:Nonprofit501c9" | "https://schema.org/Nonprofit501d" | "schema:Nonprofit501d" | "https://schema.org/Nonprofit501e" | "schema:Nonprofit501e" | "https://schema.org/Nonprofit501f" | "schema:Nonprofit501f" | "https://schema.org/Nonprofit501k" | "schema:Nonprofit501k" | "https://schema.org/Nonprofit501n" | "schema:Nonprofit501n" | "https://schema.org/Nonprofit501q" | "schema:Nonprofit501q" | "https://schema.org/Nonprofit527" | "schema:Nonprofit527" | USNonprofitTypeLeaf;

interface ValidatorBase extends ElementBase {
    /** A result is an outcome property that's immediately evaluated. It can be used to tell the user what consequences their actions will have. E.g. the result in a currency calculator app, completed user profile data as a result of editing, or a fulfilled workflow after performing a sequence of tasks (before submitting). Technically, results should be treated as immediate/synchronous outcomes, compare with uxi:output for side-effects/asynchronous handling. */
    "uxi:result"?: SchemaValue<Thing | UIDataType | IdReference, "uxi:result">;
}
interface ValidatorLeaf extends ValidatorBase {
    "@type": "uxi:Validator";
}
/** The root class for all validators. They take in an uxi:input, evaluate it and create a uxi:result, which should be a boolean by default */
export type Validator = ValidatorLeaf;

interface VehicleBase extends ProductBase {
    /**
     * The time needed to accelerate the vehicle from a given start velocity to a given target velocity.
     *
     * Typical unit code(s): SEC for seconds
     * - Note: There are unfortunately no standard unit codes for seconds/0..100 km/h or seconds/0..60 mph. Simply use "SEC" for seconds and indicate the velocities in the {@link https://schema.org/name name} of the {@link https://schema.org/QuantitativeValue QuantitativeValue}, or use {@link https://schema.org/valueReference valueReference} with a {@link https://schema.org/QuantitativeValue QuantitativeValue} of 0..60 mph or 0..100 km/h to specify the reference speeds.
     */
    "schema:accelerationTime"?: SchemaValue<QuantitativeValue | IdReference, "schema:accelerationTime">;
    /** Indicates the design and body style of the vehicle (e.g. station wagon, hatchback, etc.). */
    "schema:bodyType"?: SchemaValue<QualitativeValue | Text | URL | IdReference, "schema:bodyType">;
    /** A {@link https://en.wikipedia.org/wiki/Call_sign callsign}, as used in broadcasting and radio communications to identify people, radio and TV stations, or vehicles. */
    "schema:callSign"?: SchemaValue<Text, "schema:callSign">;
    /**
     * The available volume for cargo or luggage. For automobiles, this is usually the trunk volume.
     *
     * Typical unit code(s): LTR for liters, FTQ for cubic foot/feet
     *
     * Note: You can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:cargoVolume"?: SchemaValue<QuantitativeValue | IdReference, "schema:cargoVolume">;
    /** The date of the first registration of the vehicle with the respective public authorities. */
    "schema:dateVehicleFirstRegistered"?: SchemaValue<Date, "schema:dateVehicleFirstRegistered">;
    /** The drive wheel configuration, i.e. which roadwheels will receive torque from the vehicle's engine via the drivetrain. */
    "schema:driveWheelConfiguration"?: SchemaValue<DriveWheelConfigurationValue | Text | IdReference, "schema:driveWheelConfiguration">;
    /** The CO2 emissions in g/km. When used in combination with a QuantitativeValue, put "g/km" into the unitText property of that value, since there is no UN/CEFACT Common Code for "g/km". */
    "schema:emissionsCO2"?: SchemaValue<Number, "schema:emissionsCO2">;
    /**
     * The capacity of the fuel tank or in the case of electric cars, the battery. If there are multiple components for storage, this should indicate the total of all storage of the same type.
     *
     * Typical unit code(s): LTR for liters, GLL of US gallons, GLI for UK / imperial gallons, AMH for ampere-hours (for electrical vehicles).
     */
    "schema:fuelCapacity"?: SchemaValue<QuantitativeValue | IdReference, "schema:fuelCapacity">;
    /**
     * The amount of fuel consumed for traveling a particular distance or temporal duration with the given vehicle (e.g. liters per 100 km).
     * - Note 1: There are unfortunately no standard unit codes for liters per 100 km. Use {@link https://schema.org/unitText unitText} to indicate the unit of measurement, e.g. L/100 km.
     * - Note 2: There are two ways of indicating the fuel consumption, {@link https://schema.org/fuelConsumption fuelConsumption} (e.g. 8 liters per 100 km) and {@link https://schema.org/fuelEfficiency fuelEfficiency} (e.g. 30 miles per gallon). They are reciprocal.
     * - Note 3: Often, the absolute value is useful only when related to driving speed ("at 80 km/h") or usage pattern ("city traffic"). You can use {@link https://schema.org/valueReference valueReference} to link the value for the fuel consumption to another value.
     */
    "schema:fuelConsumption"?: SchemaValue<QuantitativeValue | IdReference, "schema:fuelConsumption">;
    /**
     * The distance traveled per unit of fuel used; most commonly miles per gallon (mpg) or kilometers per liter (km/L).
     * - Note 1: There are unfortunately no standard unit codes for miles per gallon or kilometers per liter. Use {@link https://schema.org/unitText unitText} to indicate the unit of measurement, e.g. mpg or km/L.
     * - Note 2: There are two ways of indicating the fuel consumption, {@link https://schema.org/fuelConsumption fuelConsumption} (e.g. 8 liters per 100 km) and {@link https://schema.org/fuelEfficiency fuelEfficiency} (e.g. 30 miles per gallon). They are reciprocal.
     * - Note 3: Often, the absolute value is useful only when related to driving speed ("at 80 km/h") or usage pattern ("city traffic"). You can use {@link https://schema.org/valueReference valueReference} to link the value for the fuel economy to another value.
     */
    "schema:fuelEfficiency"?: SchemaValue<QuantitativeValue | IdReference, "schema:fuelEfficiency">;
    /** The type of fuel suitable for the engine or engines of the vehicle. If the vehicle has only one engine, this property can be attached directly to the vehicle. */
    "schema:fuelType"?: SchemaValue<QualitativeValue | Text | URL | IdReference, "schema:fuelType">;
    /** A textual description of known damages, both repaired and unrepaired. */
    "schema:knownVehicleDamages"?: SchemaValue<Text, "schema:knownVehicleDamages">;
    /** Indicates that the vehicle meets the respective emission standard. */
    "schema:meetsEmissionStandard"?: SchemaValue<QualitativeValue | Text | URL | IdReference, "schema:meetsEmissionStandard">;
    /**
     * The total distance travelled by the particular vehicle since its initial production, as read from its odometer.
     *
     * Typical unit code(s): KMT for kilometers, SMI for statute miles
     */
    "schema:mileageFromOdometer"?: SchemaValue<QuantitativeValue | IdReference, "schema:mileageFromOdometer">;
    /** The release date of a vehicle model (often used to differentiate versions of the same make and model). */
    "schema:modelDate"?: SchemaValue<Date, "schema:modelDate">;
    /** The number or type of airbags in the vehicle. */
    "schema:numberOfAirbags"?: SchemaValue<Number | Text, "schema:numberOfAirbags">;
    /**
     * The number of axles.
     *
     * Typical unit code(s): C62
     */
    "schema:numberOfAxles"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfAxles">;
    /**
     * The number of doors.
     *
     * Typical unit code(s): C62
     */
    "schema:numberOfDoors"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfDoors">;
    /**
     * The total number of forward gears available for the transmission system of the vehicle.
     *
     * Typical unit code(s): C62
     */
    "schema:numberOfForwardGears"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfForwardGears">;
    /**
     * The number of owners of the vehicle, including the current one.
     *
     * Typical unit code(s): C62
     */
    "schema:numberOfPreviousOwners"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:numberOfPreviousOwners">;
    /**
     * The permitted weight of passengers and cargo, EXCLUDING the weight of the empty vehicle.
     *
     * Typical unit code(s): KGM for kilogram, LBR for pound
     * - Note 1: Many databases specify the permitted TOTAL weight instead, which is the sum of {@link https://schema.org/weight weight} and {@link https://schema.org/payload payload}
     * - Note 2: You can indicate additional information in the {@link https://schema.org/name name} of the {@link https://schema.org/QuantitativeValue QuantitativeValue} node.
     * - Note 3: You may also link to a {@link https://schema.org/QualitativeValue QualitativeValue} node that provides additional information using {@link https://schema.org/valueReference valueReference}.
     * - Note 4: Note that you can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:payload"?: SchemaValue<QuantitativeValue | IdReference, "schema:payload">;
    /** The date of production of the item, e.g. vehicle. */
    "schema:productionDate"?: SchemaValue<Date, "schema:productionDate">;
    /** The date the item e.g. vehicle was purchased by the current owner. */
    "schema:purchaseDate"?: SchemaValue<Date, "schema:purchaseDate">;
    /**
     * The number of persons that can be seated (e.g. in a vehicle), both in terms of the physical space available, and in terms of limitations set by law.
     *
     * Typical unit code(s): C62 for persons
     */
    "schema:seatingCapacity"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:seatingCapacity">;
    /**
     * The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by {@link https://schema.org/maxValue maxValue} should be the maximum speed achievable under regular conditions.
     *
     * Typical unit code(s): KMH for km/h, HM for mile per hour (0.447 04 m/s), KNT for knot
     *
     * *Note 1: Use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate the range. Typically, the minimal value is zero.
     * - Note 2: There are many different ways of measuring the speed range. You can link to information about how the given value has been determined using the {@link https://schema.org/valueReference valueReference} property.
     */
    "schema:speed"?: SchemaValue<QuantitativeValue | IdReference, "schema:speed">;
    /** The position of the steering wheel or similar device (mostly for cars). */
    "schema:steeringPosition"?: SchemaValue<SteeringPositionValue | IdReference, "schema:steeringPosition">;
    /**
     * The permitted vertical load (TWR) of a trailer attached to the vehicle. Also referred to as Tongue Load Rating (TLR) or Vertical Load Rating (VLR)
     *
     * Typical unit code(s): KGM for kilogram, LBR for pound
     * - Note 1: You can indicate additional information in the {@link https://schema.org/name name} of the {@link https://schema.org/QuantitativeValue QuantitativeValue} node.
     * - Note 2: You may also link to a {@link https://schema.org/QualitativeValue QualitativeValue} node that provides additional information using {@link https://schema.org/valueReference valueReference}.
     * - Note 3: Note that you can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:tongueWeight"?: SchemaValue<QuantitativeValue | IdReference, "schema:tongueWeight">;
    /**
     * The permitted weight of a trailer attached to the vehicle.
     *
     * Typical unit code(s): KGM for kilogram, LBR for pound
     * - Note 1: You can indicate additional information in the {@link https://schema.org/name name} of the {@link https://schema.org/QuantitativeValue QuantitativeValue} node.
     * - Note 2: You may also link to a {@link https://schema.org/QualitativeValue QualitativeValue} node that provides additional information using {@link https://schema.org/valueReference valueReference}.
     * - Note 3: Note that you can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:trailerWeight"?: SchemaValue<QuantitativeValue | IdReference, "schema:trailerWeight">;
    /** A short text indicating the configuration of the vehicle, e.g. '5dr hatchback ST 2.5 MT 225 hp' or 'limited edition'. */
    "schema:vehicleConfiguration"?: SchemaValue<Text, "schema:vehicleConfiguration">;
    /** Information about the engine or engines of the vehicle. */
    "schema:vehicleEngine"?: SchemaValue<EngineSpecification | IdReference, "schema:vehicleEngine">;
    /** The Vehicle Identification Number (VIN) is a unique serial number used by the automotive industry to identify individual motor vehicles. */
    "schema:vehicleIdentificationNumber"?: SchemaValue<Text, "schema:vehicleIdentificationNumber">;
    /** The color or color combination of the interior of the vehicle. */
    "schema:vehicleInteriorColor"?: SchemaValue<Text, "schema:vehicleInteriorColor">;
    /** The type or material of the interior of the vehicle (e.g. synthetic fabric, leather, wood, etc.). While most interior types are characterized by the material used, an interior type can also be based on vehicle usage or target audience. */
    "schema:vehicleInteriorType"?: SchemaValue<Text, "schema:vehicleInteriorType">;
    /** The release date of a vehicle model (often used to differentiate versions of the same make and model). */
    "schema:vehicleModelDate"?: SchemaValue<Date, "schema:vehicleModelDate">;
    /**
     * The number of passengers that can be seated in the vehicle, both in terms of the physical space available, and in terms of limitations set by law.
     *
     * Typical unit code(s): C62 for persons.
     */
    "schema:vehicleSeatingCapacity"?: SchemaValue<Number | QuantitativeValue | IdReference, "schema:vehicleSeatingCapacity">;
    /** Indicates whether the vehicle has been used for special purposes, like commercial rental, driving school, or as a taxi. The legislation in many countries requires this information to be revealed when offering a car for sale. */
    "schema:vehicleSpecialUsage"?: SchemaValue<CarUsageType | Text | IdReference, "schema:vehicleSpecialUsage">;
    /** The type of component used for transmitting the power from a rotating power source to the wheels or other relevant component(s) ("gearbox" for cars). */
    "schema:vehicleTransmission"?: SchemaValue<QualitativeValue | Text | URL | IdReference, "schema:vehicleTransmission">;
    /**
     * The permitted total weight of the loaded vehicle, including passengers and cargo and the weight of the empty vehicle.
     *
     * Typical unit code(s): KGM for kilogram, LBR for pound
     * - Note 1: You can indicate additional information in the {@link https://schema.org/name name} of the {@link https://schema.org/QuantitativeValue QuantitativeValue} node.
     * - Note 2: You may also link to a {@link https://schema.org/QualitativeValue QualitativeValue} node that provides additional information using {@link https://schema.org/valueReference valueReference}.
     * - Note 3: Note that you can use {@link https://schema.org/minValue minValue} and {@link https://schema.org/maxValue maxValue} to indicate ranges.
     */
    "schema:weightTotal"?: SchemaValue<QuantitativeValue | IdReference, "schema:weightTotal">;
    /**
     * The distance between the centers of the front and rear wheels.
     *
     * Typical unit code(s): CMT for centimeters, MTR for meters, INH for inches, FOT for foot/feet
     */
    "schema:wheelbase"?: SchemaValue<QuantitativeValue | IdReference, "schema:wheelbase">;
}
interface VehicleLeaf extends VehicleBase {
    "@type": "schema:Vehicle";
}
/** A vehicle is a device that is designed or used to transport people or cargo over land, water, air, or through space. */
export type Vehicle = VehicleLeaf | BusOrCoach | Car | Motorcycle | MotorizedBicycle;

interface VeinBase extends AnatomicalStructureBase {
    /** The vasculature that the vein drains into. */
    "schema:drainsTo"?: SchemaValue<Vessel | IdReference, "schema:drainsTo">;
    /** The anatomical or organ system drained by this vessel; generally refers to a specific part of an organ. */
    "schema:regionDrained"?: SchemaValue<AnatomicalStructure | AnatomicalSystem | IdReference, "schema:regionDrained">;
    /** The anatomical or organ system that the vein flows into; a larger structure that the vein connects to. */
    "schema:tributary"?: SchemaValue<AnatomicalStructure | IdReference, "schema:tributary">;
}
interface VeinLeaf extends VeinBase {
    "@type": "schema:Vein";
}
/** A type of blood vessel that specifically carries blood to the heart. */
export type Vein = VeinLeaf;

interface VesselLeaf extends AnatomicalStructureBase {
    "@type": "schema:Vessel";
}
/** A component of the human body circulatory system comprised of an intricate network of hollow tubes that transport blood throughout the entire body. */
export type Vessel = VesselLeaf | Artery | LymphaticVessel | Vein;

interface VeterinaryCareLeaf extends MedicalOrganizationBase {
    "@type": "schema:VeterinaryCare";
}
/** A vet's office. */
export type VeterinaryCare = VeterinaryCareLeaf | string;

interface videoLeaf extends MediaDataTypeBase {
    "@type": "uxi:video";
}
/** An embedded video object. This can be a URL or a VideoObject */
export type video = videoLeaf;

interface VideoGalleryLeaf extends WebPageBase {
    "@type": "schema:VideoGallery";
}
/** Web page type: Video gallery page. */
export type VideoGallery = VideoGalleryLeaf;

interface VideoGameBase extends SoftwareApplicationBase, GameBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /**
     * An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/actor instead.
     */
    "schema:actors"?: SchemaValue<Person | IdReference, "schema:actors">;
    /** Cheat codes to the game. */
    "schema:cheatCode"?: SchemaValue<CreativeWork | IdReference, "schema:cheatCode">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /**
     * A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/director instead.
     */
    "schema:directors"?: SchemaValue<Person | IdReference, "schema:directors">;
    /** The electronic systems used to play {@link http://en.wikipedia.org/wiki/Category:Video_game_platforms video games}. */
    "schema:gamePlatform"?: SchemaValue<Text | Thing | URL | IdReference, "schema:gamePlatform">;
    /** The server on which it is possible to play the game. */
    "schema:gameServer"?: SchemaValue<GameServer | IdReference, "schema:gameServer">;
    /** Links to tips, tactics, etc. */
    "schema:gameTip"?: SchemaValue<CreativeWork | IdReference, "schema:gameTip">;
    /** The composer of the soundtrack. */
    "schema:musicBy"?: SchemaValue<MusicGroup | Person | IdReference, "schema:musicBy">;
    /** Indicates whether this game is multi-player, co-op or single-player. The game can be marked as multi-player, co-op and single-player at the same time. */
    "schema:playMode"?: SchemaValue<GamePlayMode | IdReference, "schema:playMode">;
    /** The trailer of a movie or tv/radio series, season, episode, etc. */
    "schema:trailer"?: SchemaValue<VideoObject | IdReference, "schema:trailer">;
}
interface VideoGameLeaf extends VideoGameBase {
    "@type": "schema:VideoGame";
}
/** A video game is an electronic game that involves human interaction with a user interface to generate visual feedback on a video device. */
export type VideoGame = VideoGameLeaf;

interface VideoGameClipLeaf extends ClipBase {
    "@type": "schema:VideoGameClip";
}
/** A short segment/part of a video game. */
export type VideoGameClip = VideoGameClipLeaf;

interface VideoGameSeriesBase extends CreativeWorkSeriesBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /**
     * An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/actor instead.
     */
    "schema:actors"?: SchemaValue<Person | IdReference, "schema:actors">;
    /** A piece of data that represents a particular aspect of a fictional character (skill, power, character points, advantage, disadvantage). */
    "schema:characterAttribute"?: SchemaValue<Thing | IdReference, "schema:characterAttribute">;
    /** Cheat codes to the game. */
    "schema:cheatCode"?: SchemaValue<CreativeWork | IdReference, "schema:cheatCode">;
    /** A season that is part of the media series. */
    "schema:containsSeason"?: SchemaValue<CreativeWorkSeason | IdReference, "schema:containsSeason">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /**
     * A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/director instead.
     */
    "schema:directors"?: SchemaValue<Person | IdReference, "schema:directors">;
    /** An episode of a tv, radio or game media within a series or season. */
    "schema:episode"?: SchemaValue<Episode | IdReference, "schema:episode">;
    /**
     * An episode of a TV/radio series or season.
     *
     * @deprecated Consider using https://schema.org/episode instead.
     */
    "schema:episodes"?: SchemaValue<Episode | IdReference, "schema:episodes">;
    /** An item is an object within the game world that can be collected by a player or, occasionally, a non-player character. */
    "schema:gameItem"?: SchemaValue<Thing | IdReference, "schema:gameItem">;
    /** Real or fictional location of the game (or part of game). */
    "schema:gameLocation"?: SchemaValue<Place | PostalAddress | URL | IdReference, "schema:gameLocation">;
    /** The electronic systems used to play {@link http://en.wikipedia.org/wiki/Category:Video_game_platforms video games}. */
    "schema:gamePlatform"?: SchemaValue<Text | Thing | URL | IdReference, "schema:gamePlatform">;
    /** The composer of the soundtrack. */
    "schema:musicBy"?: SchemaValue<MusicGroup | Person | IdReference, "schema:musicBy">;
    /** The number of episodes in this season or series. */
    "schema:numberOfEpisodes"?: SchemaValue<Integer, "schema:numberOfEpisodes">;
    /** Indicate how many people can play this game (minimum, maximum, or range). */
    "schema:numberOfPlayers"?: SchemaValue<QuantitativeValue | IdReference, "schema:numberOfPlayers">;
    /** The number of seasons in this series. */
    "schema:numberOfSeasons"?: SchemaValue<Integer, "schema:numberOfSeasons">;
    /** Indicates whether this game is multi-player, co-op or single-player. The game can be marked as multi-player, co-op and single-player at the same time. */
    "schema:playMode"?: SchemaValue<GamePlayMode | IdReference, "schema:playMode">;
    /** The production company or studio responsible for the item e.g. series, video game, episode etc. */
    "schema:productionCompany"?: SchemaValue<Organization | IdReference, "schema:productionCompany">;
    /** The task that a player-controlled character, or group of characters may complete in order to gain a reward. */
    "schema:quest"?: SchemaValue<Thing | IdReference, "schema:quest">;
    /**
     * A season in a media series.
     *
     * @deprecated Consider using https://schema.org/containsSeason instead.
     */
    "schema:season"?: SchemaValue<CreativeWorkSeason | URL | IdReference, "schema:season">;
    /**
     * A season in a media series.
     *
     * @deprecated Consider using https://schema.org/season instead.
     */
    "schema:seasons"?: SchemaValue<CreativeWorkSeason | IdReference, "schema:seasons">;
    /** The trailer of a movie or tv/radio series, season, episode, etc. */
    "schema:trailer"?: SchemaValue<VideoObject | IdReference, "schema:trailer">;
}
interface VideoGameSeriesLeaf extends VideoGameSeriesBase {
    "@type": "schema:VideoGameSeries";
}
/** A video game series. */
export type VideoGameSeries = VideoGameSeriesLeaf;

interface VideoObjectBase extends MediaObjectBase {
    /** An actor, e.g. in tv, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
    "schema:actor"?: SchemaValue<Person | IdReference, "schema:actor">;
    /**
     * An actor, e.g. in tv, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/actor instead.
     */
    "schema:actors"?: SchemaValue<Person | IdReference, "schema:actors">;
    /** The caption for this object. For downloadable machine formats (closed caption, subtitles etc.) use MediaObject and indicate the {@link https://schema.org/encodingFormat encodingFormat}. */
    "schema:caption"?: SchemaValue<MediaObject | Text | IdReference, "schema:caption">;
    /** A director of e.g. tv, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
    "schema:director"?: SchemaValue<Person | IdReference, "schema:director">;
    /**
     * A director of e.g. tv, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip.
     *
     * @deprecated Consider using https://schema.org/director instead.
     */
    "schema:directors"?: SchemaValue<Person | IdReference, "schema:directors">;
    /** Represents textual captioning from a {@link https://schema.org/MediaObject MediaObject}, e.g. text of a 'meme'. */
    "schema:embeddedTextCaption"?: SchemaValue<Text, "schema:embeddedTextCaption">;
    /** The composer of the soundtrack. */
    "schema:musicBy"?: SchemaValue<MusicGroup | Person | IdReference, "schema:musicBy">;
    /** Thumbnail image for an image or video. */
    "schema:thumbnail"?: SchemaValue<ImageObject | IdReference, "schema:thumbnail">;
    /** If this MediaObject is an AudioObject or VideoObject, the transcript of that object. */
    "schema:transcript"?: SchemaValue<Text, "schema:transcript">;
    /** The frame size of the video. */
    "schema:videoFrameSize"?: SchemaValue<Text, "schema:videoFrameSize">;
    /** The quality of the video. */
    "schema:videoQuality"?: SchemaValue<Text, "schema:videoQuality">;
}
interface VideoObjectLeaf extends VideoObjectBase {
    "@type": "schema:VideoObject";
}
/** A video file. */
export type VideoObject = VideoObjectLeaf | VideoObjectSnapshot;

interface VideoObjectSnapshotLeaf extends VideoObjectBase {
    "@type": "schema:VideoObjectSnapshot";
}
/** A specific and exact (byte-for-byte) version of a {@link https://schema.org/VideoObject VideoObject}. Two byte-for-byte identical files, for the purposes of this type, considered identical. If they have different embedded metadata the files will differ. Different external facts about the files, e.g. creator or dateCreated that aren't represented in their actual content, do not affect this notion of identity. */
export type VideoObjectSnapshot = VideoObjectSnapshotLeaf;

interface ViewActionLeaf extends ConsumeActionBase {
    "@type": "schema:ViewAction";
}
/** The act of consuming static visual content. */
export type ViewAction = ViewActionLeaf;

interface VirtualLocationLeaf extends ThingBase {
    "@type": "schema:VirtualLocation";
}
/** An online or virtual location for attending events. For example, one may attend an online seminar or educational event. While a virtual location may be used as the location of an event, virtual locations should not be confused with physical locations in the real world. */
export type VirtualLocation = VirtualLocationLeaf;

interface VisualArtsEventLeaf extends EventBase {
    "@type": "schema:VisualArtsEvent";
}
/** Event type: Visual arts event. */
export type VisualArtsEvent = VisualArtsEventLeaf;

interface VisualArtworkBase extends CreativeWorkBase {
    /** The number of copies when multiple copies of a piece of artwork are produced - e.g. for a limited edition of 20 prints, 'artEdition' refers to the total number of copies (in this example "20"). */
    "schema:artEdition"?: SchemaValue<Integer | Text, "schema:artEdition">;
    /** e.g. Painting, Drawing, Sculpture, Print, Photograph, Assemblage, Collage, etc. */
    "schema:artform"?: SchemaValue<Text | URL, "schema:artform">;
    /** The primary artist for a work in a medium other than pencils or digital line art--for example, if the primary artwork is done in watercolors or digital paints. */
    "schema:artist"?: SchemaValue<Person | IdReference, "schema:artist">;
    /** The material used. (e.g. Oil, Watercolour, Acrylic, Linoprint, Marble, Cyanotype, Digital, Lithograph, DryPoint, Intaglio, Pastel, Woodcut, Pencil, Mixed Media, etc.) */
    "schema:artMedium"?: SchemaValue<Text | URL, "schema:artMedium">;
    /** The supporting materials for the artwork, e.g. Canvas, Paper, Wood, Board, etc. */
    "schema:artworkSurface"?: SchemaValue<Text | URL, "schema:artworkSurface">;
    /** The individual who adds color to inked drawings. */
    "schema:colorist"?: SchemaValue<Person | IdReference, "schema:colorist">;
    /** The depth of the item. */
    "schema:depth"?: SchemaValue<Distance | QuantitativeValue | IdReference, "schema:depth">;
    /** The height of the item. */
    "schema:height"?: SchemaValue<Distance | QuantitativeValue | IdReference, "schema:height">;
    /** The individual who traces over the pencil drawings in ink after pencils are complete. */
    "schema:inker"?: SchemaValue<Person | IdReference, "schema:inker">;
    /** The individual who adds lettering, including speech balloons and sound effects, to artwork. */
    "schema:letterer"?: SchemaValue<Person | IdReference, "schema:letterer">;
    /** The individual who draws the primary narrative artwork. */
    "schema:penciler"?: SchemaValue<Person | IdReference, "schema:penciler">;
    /**
     * A material used as a surface in some artwork, e.g. Canvas, Paper, Wood, Board, etc.
     *
     * @deprecated Consider using https://schema.org/artworkSurface instead.
     */
    "schema:surface"?: SchemaValue<Text | URL, "schema:surface">;
    /** The width of the item. */
    "schema:width"?: SchemaValue<Distance | QuantitativeValue | IdReference, "schema:width">;
}
interface VisualArtworkLeaf extends VisualArtworkBase {
    "@type": "schema:VisualArtwork";
}
/** A work of art that is primarily visual in character. */
export type VisualArtwork = VisualArtworkLeaf | CoverArt;

interface VitalSignLeaf extends MedicalSignBase {
    "@type": "schema:VitalSign";
}
/** Vital signs are measures of various physiological functions in order to assess the most basic body functions. */
export type VitalSign = VitalSignLeaf;

interface VolcanoLeaf extends PlaceBase {
    "@type": "schema:Volcano";
}
/** A volcano, like Fuji san. */
export type Volcano = VolcanoLeaf | string;

interface VoteActionBase extends ChooseActionBase {
    /** A sub property of object. The candidate subject of this action. */
    "schema:candidate"?: SchemaValue<Person | IdReference, "schema:candidate">;
}
interface VoteActionLeaf extends VoteActionBase {
    "@type": "schema:VoteAction";
}
/** The act of expressing a preference from a fixed/finite/structured set of choices/options. */
export type VoteAction = VoteActionLeaf;

interface WantActionLeaf extends ActionBase {
    "@type": "schema:WantAction";
}
/** The act of expressing a desire about the object. An agent wants an object. */
export type WantAction = WantActionLeaf;

interface WarningLeaf extends ElementBase {
    "@type": "uxi:Warning";
}
/** Warnings notify the user that an unexpected or insecure event occured, but the application can continue to function. This gives the user the option to intervene. */
export type Warning = WarningLeaf;

interface WarrantyPromiseBase extends ThingBase {
    /** The duration of the warranty promise. Common unitCode values are ANN for year, MON for months, or DAY for days. */
    "schema:durationOfWarranty"?: SchemaValue<QuantitativeValue | IdReference, "schema:durationOfWarranty">;
    /** The scope of the warranty promise. */
    "schema:warrantyScope"?: SchemaValue<WarrantyScope | IdReference, "schema:warrantyScope">;
}
interface WarrantyPromiseLeaf extends WarrantyPromiseBase {
    "@type": "schema:WarrantyPromise";
}
/** A structured value representing the duration and scope of services that will be provided to a customer free of charge in case of a defect or malfunction of a product. */
export type WarrantyPromise = WarrantyPromiseLeaf;

interface WarrantyScopeLeaf extends EnumerationBase {
    "@type": "schema:WarrantyScope";
}
/**
 * A range of of services that will be provided to a customer free of charge in case of a defect or malfunction of a product.
 *
 * Commonly used values:
 * - http://purl.org/goodrelations/v1#Labor-BringIn
 * - http://purl.org/goodrelations/v1#PartsAndLabor-BringIn
 * - http://purl.org/goodrelations/v1#PartsAndLabor-PickUp
 */
export type WarrantyScope = WarrantyScopeLeaf;

interface WatchActionLeaf extends ConsumeActionBase {
    "@type": "schema:WatchAction";
}
/** The act of consuming dynamic/moving visual content. */
export type WatchAction = WatchActionLeaf;

interface WaterfallLeaf extends PlaceBase {
    "@type": "schema:Waterfall";
}
/** A waterfall, like Niagara. */
export type Waterfall = WaterfallLeaf | string;

interface WearableMeasurementTypeEnumerationLeaf extends EnumerationBase {
    "@type": "schema:WearableMeasurementTypeEnumeration";
}
/** Enumerates common types of measurement for wearables products. */
export type WearableMeasurementTypeEnumeration = "https://schema.org/WearableMeasurementBack" | "schema:WearableMeasurementBack" | "https://schema.org/WearableMeasurementChestOrBust" | "schema:WearableMeasurementChestOrBust" | "https://schema.org/WearableMeasurementCollar" | "schema:WearableMeasurementCollar" | "https://schema.org/WearableMeasurementCup" | "schema:WearableMeasurementCup" | "https://schema.org/WearableMeasurementHeight" | "schema:WearableMeasurementHeight" | "https://schema.org/WearableMeasurementHips" | "schema:WearableMeasurementHips" | "https://schema.org/WearableMeasurementInseam" | "schema:WearableMeasurementInseam" | "https://schema.org/WearableMeasurementLength" | "schema:WearableMeasurementLength" | "https://schema.org/WearableMeasurementOutsideLeg" | "schema:WearableMeasurementOutsideLeg" | "https://schema.org/WearableMeasurementSleeve" | "schema:WearableMeasurementSleeve" | "https://schema.org/WearableMeasurementWaist" | "schema:WearableMeasurementWaist" | "https://schema.org/WearableMeasurementWidth" | "schema:WearableMeasurementWidth" | WearableMeasurementTypeEnumerationLeaf;

interface WearableSizeGroupEnumerationLeaf extends EnumerationBase {
    "@type": "schema:WearableSizeGroupEnumeration";
}
/** Enumerates common size groups (also known as "size types") for wearable products. */
export type WearableSizeGroupEnumeration = "https://schema.org/WearableSizeGroupBig" | "schema:WearableSizeGroupBig" | "https://schema.org/WearableSizeGroupBoys" | "schema:WearableSizeGroupBoys" | "https://schema.org/WearableSizeGroupExtraShort" | "schema:WearableSizeGroupExtraShort" | "https://schema.org/WearableSizeGroupExtraTall" | "schema:WearableSizeGroupExtraTall" | "https://schema.org/WearableSizeGroupGirls" | "schema:WearableSizeGroupGirls" | "https://schema.org/WearableSizeGroupHusky" | "schema:WearableSizeGroupHusky" | "https://schema.org/WearableSizeGroupInfants" | "schema:WearableSizeGroupInfants" | "https://schema.org/WearableSizeGroupJuniors" | "schema:WearableSizeGroupJuniors" | "https://schema.org/WearableSizeGroupMaternity" | "schema:WearableSizeGroupMaternity" | "https://schema.org/WearableSizeGroupMens" | "schema:WearableSizeGroupMens" | "https://schema.org/WearableSizeGroupMisses" | "schema:WearableSizeGroupMisses" | "https://schema.org/WearableSizeGroupPetite" | "schema:WearableSizeGroupPetite" | "https://schema.org/WearableSizeGroupPlus" | "schema:WearableSizeGroupPlus" | "https://schema.org/WearableSizeGroupRegular" | "schema:WearableSizeGroupRegular" | "https://schema.org/WearableSizeGroupShort" | "schema:WearableSizeGroupShort" | "https://schema.org/WearableSizeGroupTall" | "schema:WearableSizeGroupTall" | "https://schema.org/WearableSizeGroupWomens" | "schema:WearableSizeGroupWomens" | WearableSizeGroupEnumerationLeaf;

interface WearableSizeSystemEnumerationLeaf extends EnumerationBase {
    "@type": "schema:WearableSizeSystemEnumeration";
}
/** Enumerates common size systems specific for wearable products */
export type WearableSizeSystemEnumeration = "https://schema.org/WearableSizeSystemAU" | "schema:WearableSizeSystemAU" | "https://schema.org/WearableSizeSystemBR" | "schema:WearableSizeSystemBR" | "https://schema.org/WearableSizeSystemCN" | "schema:WearableSizeSystemCN" | "https://schema.org/WearableSizeSystemContinental" | "schema:WearableSizeSystemContinental" | "https://schema.org/WearableSizeSystemDE" | "schema:WearableSizeSystemDE" | "https://schema.org/WearableSizeSystemEN13402" | "schema:WearableSizeSystemEN13402" | "https://schema.org/WearableSizeSystemEurope" | "schema:WearableSizeSystemEurope" | "https://schema.org/WearableSizeSystemFR" | "schema:WearableSizeSystemFR" | "https://schema.org/WearableSizeSystemGS1" | "schema:WearableSizeSystemGS1" | "https://schema.org/WearableSizeSystemIT" | "schema:WearableSizeSystemIT" | "https://schema.org/WearableSizeSystemJP" | "schema:WearableSizeSystemJP" | "https://schema.org/WearableSizeSystemMX" | "schema:WearableSizeSystemMX" | "https://schema.org/WearableSizeSystemUK" | "schema:WearableSizeSystemUK" | "https://schema.org/WearableSizeSystemUS" | "schema:WearableSizeSystemUS" | WearableSizeSystemEnumerationLeaf;

interface WearActionLeaf extends ConsumeActionBase {
    "@type": "schema:WearAction";
}
/** The act of dressing oneself in clothing. */
export type WearAction = WearActionLeaf;

interface WebAPIBase extends ServiceBase {
    /** Further documentation describing the Web API in more detail. */
    "schema:documentation"?: SchemaValue<CreativeWork | URL | IdReference, "schema:documentation">;
}
interface WebAPILeaf extends WebAPIBase {
    "@type": "schema:WebAPI";
}
/** An application programming interface accessible over Web/Internet technologies. */
export type WebAPI = WebAPILeaf;

interface WebApplicationBase extends SoftwareApplicationBase {
    /** Specifies browser requirements in human-readable text. For example, 'requires HTML5 support'. */
    "schema:browserRequirements"?: SchemaValue<Text, "schema:browserRequirements">;
}
interface WebApplicationLeaf extends WebApplicationBase {
    "@type": "schema:WebApplication";
}
/** Web applications. */
export type WebApplication = WebApplicationLeaf;

interface WebContentLeaf extends CreativeWorkBase {
    "@type": "schema:WebContent";
}
/** WebContent is a type representing all {@link https://schema.org/WebPage WebPage}, {@link https://schema.org/WebSite WebSite} and {@link https://schema.org/WebPageElement WebPageElement} content. It is sometimes the case that detailed distinctions between Web pages, sites and their parts is not always important or obvious. The {@link https://schema.org/WebContent WebContent} type makes it easier to describe Web-addressable content without requiring such distinctions to always be stated. (The intent is that the existing types {@link https://schema.org/WebPage WebPage}, {@link https://schema.org/WebSite WebSite} and {@link https://schema.org/WebPageElement WebPageElement} will eventually be declared as subtypes of {@link https://schema.org/WebContent WebContent}). */
export type WebContent = WebContentLeaf | HealthTopicContent;

interface WebPageBase extends CreativeWorkBase {
    /** A set of links that can help a user understand and navigate a website hierarchy. */
    "schema:breadcrumb"?: SchemaValue<BreadcrumbList | Text | IdReference, "schema:breadcrumb">;
    /** Date on which the content on this web page was last reviewed for accuracy and/or completeness. */
    "schema:lastReviewed"?: SchemaValue<Date, "schema:lastReviewed">;
    /** Indicates if this web page element is the main subject of the page. */
    "schema:mainContentOfPage"?: SchemaValue<WebPageElement | IdReference, "schema:mainContentOfPage">;
    /** Indicates the main image on the page. */
    "schema:primaryImageOfPage"?: SchemaValue<ImageObject | IdReference, "schema:primaryImageOfPage">;
    /** A link related to this web page, for example to other related web pages. */
    "schema:relatedLink"?: SchemaValue<URL, "schema:relatedLink">;
    /** People or organizations that have reviewed the content on this web page for accuracy and/or completeness. */
    "schema:reviewedBy"?: SchemaValue<Organization | Person | IdReference, "schema:reviewedBy">;
    /** One of the more significant URLs on the page. Typically, these are the non-navigation links that are clicked on the most. */
    "schema:significantLink"?: SchemaValue<URL, "schema:significantLink">;
    /**
     * The most significant URLs on the page. Typically, these are the non-navigation links that are clicked on the most.
     *
     * @deprecated Consider using https://schema.org/significantLink instead.
     */
    "schema:significantLinks"?: SchemaValue<URL, "schema:significantLinks">;
    /**
     * Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech.
     *
     * The _speakable_ property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values:
     *
     * 1.) _id-value_ URL references - uses _id-value_ of an element in the page being annotated. The simplest use of _speakable_ has (potentially relative) URL values, referencing identified sections of the document concerned.
     *
     * 2.) CSS Selectors - addresses content in the annotated page, eg. via class attribute. Use the {@link https://schema.org/cssSelector cssSelector} property.
     *
     * 3.) XPaths - addresses content via XPaths (assuming an XML view of the content). Use the {@link https://schema.org/xpath xpath} property.
     *
     * For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, {@link https://schema.org/SpeakableSpecification SpeakableSpecification} which is defined to be a possible value of the _speakable_ property.
     */
    "schema:speakable"?: SchemaValue<SpeakableSpecification | URL | IdReference, "schema:speakable">;
    /** One of the domain specialities to which this web page's content applies. */
    "schema:specialty"?: SchemaValue<Specialty | IdReference, "schema:specialty">;
}
interface WebPageLeaf extends WebPageBase {
    "@type": "schema:WebPage";
}
/** A web page. Every web page is implicitly assumed to be declared to be of type WebPage, so the various properties about that webpage, such as `breadcrumb` may be used. We recommend explicit declaration if these properties are specified, but if they are found outside of an itemscope, they will be assumed to be about the page. */
export type WebPage = WebPageLeaf | AboutPage | CheckoutPage | CollectionPage | ContactPage | FAQPage | ItemPage | MedicalWebPage | ProfilePage | QAPage | RealEstateListing | SearchResultsPage;

interface WebPageElementBase extends CreativeWorkBase {
    /** A CSS selector, e.g. of a {@link https://schema.org/SpeakableSpecification SpeakableSpecification} or {@link https://schema.org/WebPageElement WebPageElement}. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
    "schema:cssSelector"?: SchemaValue<CssSelectorType, "schema:cssSelector">;
    /** An XPath, e.g. of a {@link https://schema.org/SpeakableSpecification SpeakableSpecification} or {@link https://schema.org/WebPageElement WebPageElement}. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
    "schema:xpath"?: SchemaValue<XPathType, "schema:xpath">;
}
interface WebPageElementLeaf extends WebPageElementBase {
    "@type": "schema:WebPageElement";
}
/** A web page element, like a table or an image. */
export type WebPageElement = WebPageElementLeaf | SiteNavigationElement | Table | WPAdBlock | WPFooter | WPHeader | WPSideBar;

interface WebSiteBase extends CreativeWorkBase {
    /** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
    "schema:issn"?: SchemaValue<Text, "schema:issn">;
}
interface WebSiteLeaf extends WebSiteBase {
    "@type": "schema:WebSite";
}
/** A WebSite is a set of related web pages and other items typically served from a single web domain and accessible via URLs. */
export type WebSite = WebSiteLeaf;

interface WholesaleStoreLeaf extends LocalBusinessBase {
    "@type": "schema:WholesaleStore";
}
/** A wholesale store. */
export type WholesaleStore = WholesaleStoreLeaf | string;

interface WinActionBase extends ActionBase {
    /** A sub property of participant. The loser of the action. */
    "schema:loser"?: SchemaValue<Person | IdReference, "schema:loser">;
}
interface WinActionLeaf extends WinActionBase {
    "@type": "schema:WinAction";
}
/** The act of achieving victory in a competitive activity. */
export type WinAction = WinActionLeaf;

interface WineryLeaf extends FoodEstablishmentBase {
    "@type": "schema:Winery";
}
/** A winery. */
export type Winery = WineryLeaf | string;

interface WorkBasedProgramBase extends EducationalOccupationalProgramBase {
    /**
     * A category describing the job, preferably using a term from a taxonomy such as {@link http://www.onetcenter.org/taxonomy.html BLS O*NET-SOC}, {@link https://www.ilo.org/public/english/bureau/stat/isco/isco08/ ISCO-08} or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.
     *
     * Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC.
     */
    "schema:occupationalCategory"?: SchemaValue<CategoryCode | Text | IdReference, "schema:occupationalCategory">;
    /** The estimated salary earned while in the program. */
    "schema:trainingSalary"?: SchemaValue<MonetaryAmountDistribution | IdReference, "schema:trainingSalary">;
}
interface WorkBasedProgramLeaf extends WorkBasedProgramBase {
    "@type": "schema:WorkBasedProgram";
}
/** A program with both an educational and employment component. Typically based at a workplace and structured around work-based learning, with the aim of instilling competencies related to an occupation. WorkBasedProgram is used to distinguish programs such as apprenticeships from school, college or other classroom based educational programs. */
export type WorkBasedProgram = WorkBasedProgramLeaf;

interface WorkersUnionLeaf extends OrganizationBase {
    "@type": "schema:WorkersUnion";
}
/** A Workers Union (also known as a Labor Union, Labour Union, or Trade Union) is an organization that promotes the interests of its worker members by collectively bargaining with management, organizing, and political lobbying. */
export type WorkersUnion = WorkersUnionLeaf | string;

interface WPAdBlockLeaf extends WebPageElementBase {
    "@type": "schema:WPAdBlock";
}
/** An advertising section of the page. */
export type WPAdBlock = WPAdBlockLeaf;

interface WPFooterLeaf extends WebPageElementBase {
    "@type": "schema:WPFooter";
}
/** The footer section of the page. */
export type WPFooter = WPFooterLeaf;

interface WPHeaderLeaf extends WebPageElementBase {
    "@type": "schema:WPHeader";
}
/** The header section of the page. */
export type WPHeader = WPHeaderLeaf;

interface WPSideBarLeaf extends WebPageElementBase {
    "@type": "schema:WPSideBar";
}
/** A sidebar section of the page. */
export type WPSideBar = WPSideBarLeaf;

interface WriteActionBase extends ActionBase {
    /** The language of the content or performance or used in an action. Please use one of the language codes from the {@link http://tools.ietf.org/html/bcp47 IETF BCP 47 standard}. See also {@link https://schema.org/availableLanguage availableLanguage}. */
    "schema:inLanguage"?: SchemaValue<Language | Text | IdReference, "schema:inLanguage">;
    /**
     * A sub property of instrument. The language used on this action.
     *
     * @deprecated Consider using https://schema.org/inLanguage instead.
     */
    "schema:language"?: SchemaValue<Language | IdReference, "schema:language">;
}
interface WriteActionLeaf extends WriteActionBase {
    "@type": "schema:WriteAction";
}
/** The act of authoring written creative content. */
export type WriteAction = WriteActionLeaf;

/** Text representing an XPath (typically but not necessarily version 1.0). */
export type XPathType = string;

interface ZooLeaf extends CivicStructureBase {
    "@type": "schema:Zoo";
}
/** A zoo. */
export type Zoo = ZooLeaf | string;

interface ZoomActionLeaf extends UIActionBase {
    "@type": "uxi:ZoomAction";
}
/** A user action to zoom in, out or to a specified zoom-factor. Used to magnify or minimify content and elements. UX examples range from pinch-to-zoom over 'plus and minus' buttons to pressing CTRL+scrolling */
export type ZoomAction = ZoomActionLeaf;

